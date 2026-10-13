#!/usr/bin/env python3
"""
Starts a new site from this repo (the "source"). Copies the engine, leaves out the source brand's assets,
and writes the rewrite checklist the factory skill works through.

Usage:
  python3 factory/new_site.py --to /path/to/new-repo --domain newdomain.com --keep "Kargman,Miller"
    --keep: source terms the new site legitimately shares (e.g. a doctor licensed in both states)

Produces in the new repo:
  factory/forbidden-terms.txt  source terms the audit must never find on the new site
  factory/REWRITE.md           every file + line with source-brand text, as a checklist
  qa/siblings/<source>.json.gz the source site's text fingerprint for the uniqueness check
Then: fill factory/intake.yaml, run the site-factory skill.
"""
import argparse, os, re, shutil, subprocess

SRC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {'.git', 'node_modules', '.next', 'qa-shots', '.cache'}
# Source-brand assets that must never be carried over (regenerated per site).
DROP = ['public/doctors', 'public/infographics', 'public/guides', 'public/media', 'public/data', 'brand/logo',
        'brand/keyword-map.csv', 'content/posts', 'content/dispensaries.json', 'content/infographic-sizes.json', 'qa/fingerprint.json.gz']
TEXT_EXT = ('.ts', '.tsx', '.md', '.json', '.mjs', '.css', '.csv', '.txt', '.py')


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--to', required=True); ap.add_argument('--domain', required=True); ap.add_argument('--keep', default='')
    a = ap.parse_args()
    dst = os.path.abspath(a.to)
    if os.path.exists(dst) and [x for x in os.listdir(dst) if x != '.git']:
        raise SystemExit(f'{dst} is not empty (only .git allowed)')
    os.makedirs(dst, exist_ok=True)
    for root, dirs, files in os.walk(SRC):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        rel = os.path.relpath(root, SRC)
        for f in files:
            r = os.path.normpath(os.path.join(rel, f))
            if any(r == d or r.startswith(d + os.sep) for d in DROP) or re.fullmatch(r'public/[0-9a-f]{32}\.txt', r):
                continue
            os.makedirs(os.path.join(dst, rel), exist_ok=True)
            shutil.copy2(os.path.join(SRC, r), os.path.join(dst, r))
    for d in ['public/doctors', 'public/infographics', 'public/guides', 'public/media', 'public/data', 'brand/logo', 'qa/siblings', 'content/posts']:
        os.makedirs(os.path.join(dst, d), exist_ok=True)

    keep = {k.strip().lower() for k in a.keep.split(',') if k.strip()}
    terms = [l.strip() for l in open(os.path.join(SRC, 'factory', 'site-terms.txt')) if l.strip() and not l.startswith('#')]
    forbidden = [t for t in terms if t.lower() not in keep]
    src_domain = next((l.split("'")[1] for l in open(os.path.join(SRC, 'brand', 'site.ts')) if 'domain:' in l), 'source')
    with open(os.path.join(dst, 'factory', 'forbidden-terms.txt'), 'w') as f:
        f.write(f'# Terms from {src_domain} that must not appear on {a.domain}. Checked by scripts/qa/audit.py.\n' + '\n'.join(forbidden) + '\n')
    open(os.path.join(dst, 'factory', 'site-terms.txt'), 'w').write(f'# Terms unique to {a.domain}. Fill in during the build (cities, people, programs, brand).\n')

    fp = os.path.join(SRC, 'qa', 'fingerprint.json.gz')
    if os.path.exists(fp): shutil.copy2(fp, os.path.join(dst, 'qa', 'siblings', f'{src_domain}.json.gz'))
    sib = os.path.join(SRC, 'qa', 'siblings')
    if os.path.isdir(sib):
        for f in os.listdir(sib): shutil.copy2(os.path.join(sib, f), os.path.join(dst, 'qa', 'siblings', f))

    pat = re.compile('|'.join(re.escape(t) for t in forbidden), re.I)
    lines = [f'# Rewrite checklist: {a.domain} (from {src_domain})', '',
             'Every line below still carries source-site text. Rewrite each from this site\'s own research (never translate the source wording).',
             'Engine logic stays; copy, facts, names, laws and URLs change. The audit fails while any forbidden term renders.', '']
    for root, dirs, files in os.walk(dst):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and d != 'factory']
        for f in sorted(files):
            if not f.endswith(TEXT_EXT): continue
            p = os.path.join(root, f); r = os.path.relpath(p, dst)
            hits = [(i + 1, l.strip()[:140]) for i, l in enumerate(open(p, errors='ignore')) if pat.search(l)]
            if hits:
                lines.append(f'- [ ] `{r}` ({len(hits)} lines)')
                lines += [f'    - L{n}: {t}' for n, t in hits[:6]] + ([f'    - …{len(hits) - 6} more'] if len(hits) > 6 else [])
    open(os.path.join(dst, 'factory', 'REWRITE.md'), 'w').write('\n'.join(lines) + '\n')
    n = sum(1 for l in lines if l.startswith('- [ ]'))
    print(f'Copied engine to {dst}\nForbidden terms: {len(forbidden)}\nFiles to rewrite: {n} (factory/REWRITE.md)')


if __name__ == '__main__':
    main()
