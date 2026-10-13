#!/usr/bin/env python3
"""
Site audit: crawls every URL in the sitemap (plus funnel/system URLs) and fails on anything not launch-ready.

Checks per page: HTTP status, <title> 10-65 chars, meta description 50-160, absolute canonical, exactly one <h1>,
images without alt, JSON-LD parses, placeholder text (to be confirmed, TBC, lorem, Launch gate, Staging:),
em dashes in visible text, and FORBIDDEN TERMS (leftovers from the brand this site was copied from).
Then checks every internal link once.

Usage:
  python3 scripts/qa/audit.py --start            # starts `next start` on :3311, audits, stops it
  python3 scripts/qa/audit.py --base https://staging.example.com
  options: --forbid "Ohio,marijuanacardoh"  (also reads factory/forbidden-terms.txt) · --json report.json · --port 3311
Exit code 1 when any error is found. Warnings never fail the run.
"""
import argparse, html, json, os, re, signal, subprocess, sys, time, urllib.error, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PLACEHOLDERS = re.compile(r'to be confirmed|\bTBC\b|lorem ipsum|Launch gate|\bStaging:|\[[a-z ]+: to be confirmed\]', re.I)
EXTRA = ['/get-started', '/robots.txt', '/llms.txt', '/sitemap.xml']


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'site-audit/1.0'})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, r.read().decode('utf-8', 'ignore'), dict(r.headers)
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8', 'ignore'), dict(e.headers)


def visible_text(h):
    h = re.sub(r'<(script|style|noscript)[^>]*>.*?</\1>', ' ', h, flags=re.S | re.I)
    return html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', h)))


def start_server(port):
    p = subprocess.Popen(['npx', 'next', 'start', '-p', str(port)], cwd=ROOT, stdout=subprocess.DEVNULL,
                         stderr=subprocess.DEVNULL, start_new_session=True)
    for _ in range(60):
        try:
            urllib.request.urlopen(f'http://localhost:{port}/robots.txt', timeout=2); return p
        except Exception: time.sleep(1)
    os.killpg(p.pid, signal.SIGTERM); sys.exit('server did not start (run `npm run build` first)')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base'); ap.add_argument('--start', action='store_true'); ap.add_argument('--port', type=int, default=3311)
    ap.add_argument('--forbid', default=''); ap.add_argument('--json')
    a = ap.parse_args()
    proc = start_server(a.port) if a.start else None
    base = (a.base or f'http://localhost:{a.port}').rstrip('/')
    forbid = [t.strip() for t in a.forbid.split(',') if t.strip()]
    ff = os.path.join(ROOT, 'factory', 'forbidden-terms.txt')
    if os.path.exists(ff):
        forbid += [l.strip() for l in open(ff) if l.strip() and not l.startswith('#')]
    errors, warnings, links = [], [], set()
    try:
        st, sm, _ = get(base + '/sitemap.xml')
        if st != 200: sys.exit(f'sitemap.xml returned {st}')
        locs = re.findall(r'<loc>(.*?)</loc>', sm)
        site = re.match(r'https?://[^/]+', locs[0]).group(0) if locs else ''
        paths = [re.sub(r'^https?://[^/]+', '', u) or '/' for u in locs] + EXTRA
        for path in paths:
            st, h, hd = get(base + path)
            E = lambda m: errors.append(f'{path}: {m}')
            W = lambda m: warnings.append(f'{path}: {m}')
            if st != 200: E(f'status {st}'); continue
            if not path.endswith(('.txt', '.xml')):
                head = h[:h.find('</head>')] if '</head>' in h else h
                t = re.search(r'<title>(.*?)</title>', head, re.S)
                tl = len(html.unescape(t.group(1))) if t else 0
                if not t: E('no <title>')
                elif not 10 <= tl <= 65: W(f'title {tl} chars')
                d = re.search(r'<meta name="description" content="([^"]*)"', head)
                if not d: E('no meta description') if path != '/get-started' else None
                elif not 50 <= len(html.unescape(d.group(1))) <= 160: W(f'description {len(html.unescape(d.group(1)))} chars')
                c = re.search(r'<link rel="canonical" href="([^"]+)"', head)
                if path != '/get-started' and (not c or not c.group(1).startswith('https://')): E('missing/relative canonical')
                h1 = len(re.findall(r'<h1[\s>]', h))
                if h1 != 1: E(f'{h1} <h1> tags')
                for img in re.findall(r'<img\b[^>]*>', h):
                    if ' alt=' not in img: E('img without alt')
                for b in re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', h, re.S):
                    try: json.loads(b)
                    except Exception: E('JSON-LD does not parse')
                text = visible_text(h)
                for m in set(PLACEHOLDERS.findall(text)): E(f'placeholder text "{m}"')
                if '—' in text: W('em dash in visible text')
                for term in forbid:
                    if re.search(r'\b' + re.escape(term) + r'\b', text, re.I): E(f'forbidden term "{term}" (leftover from source brand?)')
                for l in re.findall(r'href="(/[^"#?]*)', h):
                    if not l.startswith('/_next'): links.add(l)
        broken = []
        for l in sorted(links):
            st, _, _ = get(base + l)
            if st >= 400: broken.append(f'{l} ({st})')
        errors += [f'broken internal link {b}' for b in broken]
        st, _, _ = get(base + '/this-page-does-not-exist-qa')
        if st != 404: errors.append(f'404 page returned {st}')
        report = {'base': base, 'site': site, 'pages': len(paths), 'links': len(links), 'errors': errors, 'warnings': warnings}
        if a.json: json.dump(report, open(a.json, 'w'), indent=1)
        print(f'Audited {len(paths)} URLs and {len(links)} internal links on {base}')
        for w in warnings: print('  WARN ', w)
        for e in errors: print('  ERROR', e)
        print('PASS' if not errors else f'FAIL: {len(errors)} errors')
        sys.exit(1 if errors else 0)
    finally:
        if proc: os.killpg(proc.pid, signal.SIGTERM)


if __name__ == '__main__':
    main()
