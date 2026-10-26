# Project requirements

- `/v1/` is the primary interface. Keep the original homepage at `/classic/` and preserve `/tracker/` and `/timeline/`. Root and `/v0.1/` redirects must preserve search, view and fragment state.
- Both experiences use `data/challenges.js` and the status, eligibility, freshness, calendar and shortlist rules in `assets/challenge-core.js`. An active phase does not necessarily accept new teams.
- Treat search parameters, stored shortlist values and dataset strings as untrusted input. Validate filter values, escape rendered text and attributes, and permit only HTTPS external links in v1.
- This is a public, static directory. Do not add credentials, private records, analytics, accounts or new remote services for UI changes.
- Failed browser storage must preserve session saves and explain their temporary nature. Do not report a save as persistent before storage acknowledges it.
- Keep keyboard access, visible focus, reduced motion, narrow layouts and both color themes usable. Retain date uncertainty and participation restrictions when simplifying cards.
- Run `npm run verify` for delivery. V1 regressions belong in `tests/browser/v1.spec.mjs`, included by CI. Pages deploys only the verified static artifact from `main`. Report failed or unverified checks and confirm the deployed revision before claiming release success.
