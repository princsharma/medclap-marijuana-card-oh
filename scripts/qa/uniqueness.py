#!/usr/bin/env python3
"""
Uniqueness check: compares this site's visible page text with one or more other sites (the reference site this
codebase was copied from, and every sibling site in the network). Google treats near-duplicate location sites as
doorways, so every site must read as its own.

Method: 8-word shingles of each page's main text. For each page on this site, the share of its shingles found
anywhere on the other site(s). Navigation, footer and legal boilerplate are excluded by reading <main> only.

Comparisons can be against a live site URL or a fingerprint file. Every site saves its own fingerprint at
qa/fingerprint.json.gz (--export), so a new site can be compared with all siblings from their repos, offline.

Usage:
  python3 scripts/qa/uniqueness.py --start --export qa/fingerprint.json.gz          # save this site's fingerprint
  python3 scripts/qa/uniqueness.py --start --against ../reference/qa/fingerprint.json.gz --against https://other.com
  options: --base URL · --max-page 0.15 (fail if any page shares more) · --max-site 0.05 (fail if site average is higher)
"""
import argparse, gzip, hashlib, html, json, os, re, signal, subprocess, sys, time, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
N = 8


def fetch(u):
    try:
        return urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': 'uniqueness-check/1.0'}), timeout=30).read().decode('utf-8', 'ignore')
    except Exception:
        return ''


def main_text(h):
    m = re.search(r'<main\b.*?</main>', h, re.S | re.I)
    h = m.group(0) if m else h
    h = re.sub(r'<(script|style|nav|footer)[^>]*>.*?</\1>', ' ', h, flags=re.S | re.I)
    return html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', h))).lower()


def shingles(t):
    w = re.findall(r"[a-z0-9']+", t)
    # 8-byte hashes keep fingerprints small and don't store the text itself.
    return {hashlib.blake2b(' '.join(w[i:i + N]).encode(), digest_size=8).hexdigest() for i in range(max(0, len(w) - N + 1))}


def site_pages(base):
    sm = fetch(base.rstrip('/') + '/sitemap.xml')
    return [re.sub(r'^https?://[^/]+', '', u) or '/' for u in re.findall(r'<loc>(.*?)</loc>', sm)]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base'); ap.add_argument('--start', action='store_true'); ap.add_argument('--port', type=int, default=3311)
    ap.add_argument('--against', action='append', default=[]); ap.add_argument('--export')
    ap.add_argument('--max-page', type=float, default=0.15); ap.add_argument('--max-site', type=float, default=0.05)
    a = ap.parse_args()
    proc = None
    if a.start:
        proc = subprocess.Popen(['npx', 'next', 'start', '-p', str(a.port)], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
        for _ in range(60):
            if fetch(f'http://localhost:{a.port}/robots.txt'): break
            time.sleep(1)
    base = (a.base or f'http://localhost:{a.port}').rstrip('/')
    try:
        if a.export:
            fp = {p: sorted(shingles(main_text(fetch(base + p)))) for p in site_pages(base)}
            os.makedirs(os.path.dirname(a.export) or '.', exist_ok=True)
            with gzip.open(a.export, 'wt') as f: json.dump(fp, f)
            print(f'Saved fingerprint of {len(fp)} pages to {a.export}')
            if not a.against: return
        other = set()
        for o in a.against:
            if os.path.exists(o):
                with gzip.open(o, 'rt') as f:
                    for s in json.load(f).values(): other |= set(s)
            else:
                for p in site_pages(o):
                    other |= shingles(main_text(fetch(o.rstrip('/') + p)))
        print(f'Reference shingles: {len(other)} from {", ".join(a.against)}')
        rows, total, shared = [], 0, 0
        for p in site_pages(base):
            s = shingles(main_text(fetch(base + p)))
            if not s: continue
            hit = len(s & other); total += len(s); shared += hit
            rows.append((hit / len(s), p, len(s)))
        rows.sort(reverse=True)
        fails = [r for r in rows if r[0] > a.max_page]
        avg = shared / total if total else 0
        for r in rows[:10]: print(f'  {r[0]:6.1%}  {r[1]}  ({r[2]} shingles)')
        print(f'Site-wide shared text: {avg:.1%} (limit {a.max_site:.0%}); pages over {a.max_page:.0%}: {len(fails)}')
        ok = not fails and avg <= a.max_site
        print('PASS' if ok else 'FAIL: rewrite the pages listed above until they read as this site\'s own')
        sys.exit(0 if ok else 1)
    finally:
        if proc: os.killpg(proc.pid, signal.SIGTERM)


if __name__ == '__main__':
    main()
