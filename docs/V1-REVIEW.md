What this change does: V1 makes the card catalog the main interface, with the selected Slate minimal colors and clear participation status. It preserves the original pages, shares the existing catalog and shortlist rules, and publishes a verified static artifact through GitHub Pages.

Reviewed for a public static site with 80 challenges and at most four saves in each browser. The review followed the Ponytail review skill and traced input, storage, calendar output, routing, and deployment. All findings below were fixed before the release commit. There are no remaining findings at this load.

## Must fix — resolved

1. **An open tab keeps expired challenges in “Join now”** (`v1/app.js`, `refreshDay`)
   - **What this is:** The original preview calculated today's date and challenge status once at page load.
   - **Problem:** A tab opened on 14 November still showed UMUD as joinable on 15 November, even after changing views. Calendar export also used the old date.
   - **Fix:** Refresh derived records when the civil day changes, when returning to a visible tab, and before details or export. The time-advance regression confirms that expiry updates without losing temporary saves.
   - **If we skip it:** Returning users see expired entry opportunities and can export past dates.

2. **Another tab erases temporary saves after a failed write** (`v1/app.js`, storage event handler)
   - **What this is:** The browser synchronizes its stored shortlist across open tabs.
   - **Problem:** When reading storage succeeds but writing fails, a later storage event replaces the first tab's unsaved in-memory selections with older disk values.
   - **Fix:** Keep temporary selections when persistence has failed. A two-tab regression verifies that two temporary saves survive the other tab changing the stored list.
   - **If we skip it:** Users lose saved choices precisely when browser storage is unreliable.

3. **An older deployment can replace a newer one** (`.github/workflows/verify.yml`, concurrency)
   - **What this is:** Verification and deployment can finish in different orders for nearby pushes.
   - **Problem:** Serializing only the final deploy jobs allows a slow older verification to deploy after a newer successful release.
   - **Fix:** Serialize the entire verification and deployment workflow for the same branch, without canceling an active deployment. The artifact records its exact commit in `version.txt`.
   - **If we skip it:** A successful pipeline can unexpectedly restore an older interface or catalog.

## Should fix — resolved

4. **Filter normalization removes deep-link anchors** (`v1/app.js`, `syncURL`)
   - **What this is:** V1 stores search and view settings in its URL.
   - **Problem:** An explicit default view such as `?view=browse&search=ATM26#results` is normalized on load, and the original code discarded `#results` at the same time.
   - **Fix:** Preserve the fragment while writing URL state. Redirect and browser-history regressions cover both current and old entry routes.
   - **If we skip it:** Shared links lose the intended location within the page.

## Checks

- Passed: `npm run verify` — 19 logic/data tests, internal-link checks, and 45 desktop/mobile browser tests; three existing checks intentionally skip the opposite device project.
- Passed: light/dark automated accessibility checks in the tested states, keyboard dialog close and focus return, responsive cards, and reduced motion.
- Passed: escaped untrusted strings, HTTPS-only v1 source links, bounded and allowlisted query values, restricted-team labels, future exact calendar exports, storage failures, and date transitions.
- Passed: `npm audit` — zero reported dependency vulnerabilities; no dependencies added.
- Passed: independent app and release reviews after the fixes, and `git diff --check`.
- Reviewed: deploy permissions, successful-verification dependency, public-file artifact list, same-branch concurrency, revision marker, and preserved classic routes. The GitHub Pages settings switch and hosted revision check occur after push.

Verdict: Ship.

Not checked: Real-device and screen-reader flows, a live rollback rehearsal, and a fresh verification of every organizer's challenge information.
