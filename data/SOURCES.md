# Bi-weekly source sweep

This tracker is refreshed with a **source-first review**, not a general web search. A challenge is added or moved to `open` only when its official organizer or hosting page supports that status. Aggregators and social posts can suggest leads, but they are not sufficient evidence on their own.

## Sources checked every two weeks

| Source | What to check | Primary URL |
|---|---|---|
| MICCAI conference | Current conference challenge list, organizer pages, deadlines | https://conferences.miccai.org/2026/en/challenges.asp |
| MICCAI SIG Challenges | The full challenge catalogue, including smaller workshop and satellite challenges such as SynthOCT | https://miccai.org/sig/sig-challenges/ |
| Grand Challenge | New and active challenge phases, registrations, data releases | https://grand-challenge.org/challenges/ |
| Codabench | Medical-imaging competition pages and the active phase on each candidate | https://www.codabench.org/competitions/ |
| AAPM | Current medical-physics grand challenge and new calls | https://www.aapm.org/GrandChallenge/Default.asp |
| CVPR workshops | Medical-vision workshop challenge announcements and linked platforms | https://cvpr.thecvf.com/ |
| RSNA | Current RSNA AI Challenge status and its registration host | https://www.rsna.org/artificial-intelligence/ai-image-challenge |
| Kaggle | Official competition pages linked by organizers such as RSNA | https://www.kaggle.com/competitions |
| ISBI | Current challenge programme and official organizer links | https://biomedicalimaging.org/ |
| Synapse | Official challenge workspaces and leaderboard phases | https://www.synapse.org/ |

## Review procedure

1. Open every primary source above and record newly announced, registration-open, data-released, submission-open, and newly closed challenges. For MICCAI, check both the conference list and the SIG Challenges catalogue; the latter captures workshop and satellite events that may not be prominent on the conference hub.
2. Follow each candidate to its **official organizer or host page**. Capture its exact URL, status, key dates, platform, modality, task, and any access restriction.
3. De-duplicate a cluster of sub-challenges only when it has a shared registration and schedule; otherwise list tracks separately.
4. Keep `live` for continuous leaderboards, `open` for an active registration or submission phase, and `upcoming` for an announced challenge with no active participation phase. Do not call a data release alone “open” unless registration or participation is actually available.
5. Mark a deadline as estimated only when the official page does not state one. Preserve the official page URL in every record and set `lastVerified` for new or materially changed entries.
6. Regenerate `data/challenges.js`, update the visible last-updated count/date, preview the tracker and timeline, then commit the dataset, documentation, and generated copy together.

## Review log

### 2026-07-23

- Checked MICCAI, Grand Challenge, Codabench, AAPM, CVPR-related Codabench pages, RSNA, Kaggle, ISBI and Synapse sources.
- Reclassified **ATM26** as `open`: the official Grand Challenge registration page confirms that teams can join, sign the data-use agreement, and receive dataset access after approval.
- Added **SELMA3D 2026** as `upcoming`: the official page confirms released training data and a postponed preliminary submission phase.
- Added the **AAPM Grace Challenge** as `closed`: AAPM’s official schedule states that its 2026 competition phase ended 1 May.
- Added **SynthOCT 2026** as `open`: the official SASHIMI/MICCAI challenge site reports an active platform and a 14 Aug final-submission deadline.
- Added the MICCAI SIG Challenges catalogue to the mandatory sweep so smaller workshop and satellite challenges are reviewed alongside the main MICCAI list.
- Added three active EndoVis/MICCAI sub-challenges after checking their individual official pages: **RARE26** (open development through 31 Aug), **iMED2026** (public validation; final Docker due 1 Sep), and **TREAT-MMTB** (applications and internal phase through 31 Jul).
- Extended the individual-page sweep with three more active MICCAI challenges: **BIC-MAC** (Codabench registration and submissions through 15 Aug), **ORena SAVE FOCUS** (live pre-evaluation through 1 Sep; final Docker due 8 Sep), and **TopAneu** (Grand Challenge enrolment, sanity check from 1 Aug and test phase through 5 Sep).

The review is intentionally conservative: a platform listing without an active official phase is not counted as a new live challenge.
