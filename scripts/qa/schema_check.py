#!/usr/bin/env python3
"""
Validates every JSON-LD block on every sitemap page against the official schema.org vocabulary:
unknown types, unknown properties, and properties used on a type that doesn't allow them.

Usage: python3 scripts/qa/schema_check.py [--start] [--base URL] [--port 3311]
The vocabulary is downloaded once from GitHub (schemaorg/schemaorg) into .cache/.
Exit code 1 on any issue.
"""
import argparse, collections, json, os, re, signal, subprocess, sys, time, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
VOCAB_URL = 'https://raw.githubusercontent.com/schemaorg/schemaorg/main/data/releases/29.3/schemaorg-current-https.jsonld'


def load_vocab():
    path = os.path.join(ROOT, '.cache', 'schemaorg.jsonld')
    if not os.path.exists(path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        urllib.request.urlretrieve(VOCAB_URL, path)
    classes, props = {}, {}
    ids = lambda v: [x['@id'].split(':')[-1] for x in (v if isinstance(v, list) else [v])] if v else []
    for n in json.load(open(path))['@graph']:
        t = n['@type'] if isinstance(n['@type'], list) else [n['@type']]
        name = n['@id'].split(':')[-1]
        if 'rdfs:Class' in t: classes[name] = ids(n.get('rdfs:subClassOf'))
        if 'rdf:Property' in t: props[name] = ids(n.get('schema:domainIncludes'))
    return classes, props


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--base'); ap.add_argument('--start', action='store_true'); ap.add_argument('--port', type=int, default=3311)
    a = ap.parse_args()
    proc = None
    if a.start:
        proc = subprocess.Popen(['npx', 'next', 'start', '-p', str(a.port)], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
        for _ in range(60):
            try: urllib.request.urlopen(f'http://localhost:{a.port}/robots.txt', timeout=2); break
            except Exception: time.sleep(1)
    base = (a.base or f'http://localhost:{a.port}').rstrip('/')
    try:
        classes, props = load_vocab()

        def ancestors(c, seen=None):
            seen = seen or set()
            if c not in seen:
                seen.add(c)
                for p in classes.get(c, []): ancestors(p, seen)
            return seen

        issues = collections.Counter()

        def check(o, where):
            if isinstance(o, list):
                for x in o: check(x, where)
                return
            if not isinstance(o, dict): return
            ts = o.get('@type'); ts = ts if isinstance(ts, list) else ([ts] if ts else [])
            for t in ts:
                if t not in classes: issues[f'unknown type {t} ({where})'] += 1
            anc = set().union(*[ancestors(t) for t in ts]) if ts else None
            for k, v in o.items():
                if not k.startswith('@'):
                    if k not in props: issues[f'unknown property {k} ({where})'] += 1
                    elif anc is not None and props[k] and not (set(props[k]) & anc):
                        issues[f'property {k} not allowed on {"/".join(ts)} ({where})'] += 1
                check(v, where)

        sm = urllib.request.urlopen(base + '/sitemap.xml').read().decode()
        paths = [re.sub(r'^https?://[^/]+', '', u) or '/' for u in re.findall(r'<loc>(.*?)</loc>', sm)]
        blocks = 0
        for p in paths:
            h = urllib.request.urlopen(base + p).read().decode('utf-8', 'ignore')
            for b in re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', h, re.S):
                blocks += 1
                try: check(json.loads(b), p)
                except json.JSONDecodeError: issues[f'JSON-LD does not parse ({p})'] += 1
        print(f'Checked {blocks} JSON-LD blocks on {len(paths)} pages against schema.org')
        for k, v in issues.most_common(): print(f'  ERROR {k} x{v}')
        print('PASS' if not issues else f'FAIL: {len(issues)} issues')
        sys.exit(1 if issues else 0)
    finally:
        if proc: os.killpg(proc.pid, signal.SIGTERM)


if __name__ == '__main__':
    main()
