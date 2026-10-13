// Shared Playwright launcher for QA scripts: uses the project's playwright-core if installed, else the global
// playwright, and the pre-installed Chromium at /opt/pw-browsers/chromium when present.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

export async function launch() {
  const require = createRequire(import.meta.url);
  let pw;
  for (const name of ['playwright-core', 'playwright']) {
    try { pw = require(name); break; } catch { /* try next */ }
  }
  if (!pw) {
    const g = execSync('npm root -g').toString().trim();
    pw = require(`${g}/playwright`);
  }
  const executablePath = process.env.CHROMIUM_PATH || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
  return { pw, browser: await pw.chromium.launch(executablePath ? { executablePath } : {}) };
}

// Starts `next start` and returns a stop() function. QA scripts must always stop their own server.
export async function serve(port = 3311) {
  const { spawn } = await import('node:child_process');
  const p = spawn('npx', ['next', 'start', '-p', String(port)], { detached: true, stdio: 'ignore' });
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(`http://localhost:${port}/robots.txt`); if (r.ok) break; } catch { /* wait */ }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return async () => {
    try { process.kill(-p.pid); } catch { /* already gone */ }
    for (let i = 0; i < 20; i++) { // wait until the port is free so no stale server serves old code next run
      try { await fetch(`http://localhost:${port}/robots.txt`); await new Promise((r) => setTimeout(r, 250)); } catch { return; }
    }
  };
}
