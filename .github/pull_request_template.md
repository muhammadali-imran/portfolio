## What and why

<!-- Task id from docs/EXECUTION_PLAN.md, e.g. T-05, and a one-line summary. -->

## Checklist

- [ ] `npm run check` passes locally (lint, verify, verify:test, build, verify:dist)
- [ ] Light and dark theme checked; mobile (<1024px) and desktop (>=1280px) checked
- [ ] Reduced motion and touch (no hover) checked if animation or pointer effects changed
- [ ] Keyboard-only pass for anything interactive
- [ ] Content only in `src/data/`; no invented facts, links or metrics
- [ ] `CHANGELOG.md` updated under Unreleased; task ticked in `docs/EXECUTION_PLAN.md`
- [ ] If a known issue was fixed, its entry was removed from `scripts/verify/baseline.json`
- [ ] No new dependency (or reason added to `scripts/verify/allowed-deps.json`)

## Screenshots / notes

