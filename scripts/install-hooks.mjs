// Points git at .githooks. Runs from `npm install` (prepare). Silent no-op outside a git checkout or in CI.
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

if (process.env.CI || process.env.VERCEL || !existsSync('.git')) process.exit(0);
try {
  execSync('git config core.hooksPath .githooks', { stdio: 'ignore' });
  console.log('git hooks installed (.githooks)');
} catch {
  /* git missing: skip */
}
