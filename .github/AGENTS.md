# AGENTS.md - .github (CI/CD)

## Purpose

`workflows/ci.yml` gates every push and PR (lint, verify, verifier tests, build, dist checks, commit messages). `workflows/github-stats.yml` refreshes `src/data/github-stats.json` daily. `pull_request_template.md` is the review checklist.

## Rules

- Pin actions to a version tag or SHA; declare top-level `permissions:` with least privilege and a `timeout-minutes` on every job.
- Node version in CI is 22 for `ci.yml`; the stats workflow runs Node 20. Keep scripts compatible with both.
- Secrets come from `secrets.*` only and are never echoed. `GH_STATS_TOKEN` is optional; fall back to `GITHUB_TOKEN`.
- The stats workflow commits only `src/data/github-stats.json` with `chore: update GitHub stats` and only when changed.
- Deployment is Vercel's Git integration; CI does not deploy.

## Do not

- Grant `contents: write` outside the stats job.
- Add scheduled workflows without telling the user (they consume Actions minutes).
- Make CI depend on a secret that PRs from forks will not have.

## Verify

`npm run verify` (rule `workflows`). Workflow behaviour itself can only be confirmed on GitHub; say so in your report.
