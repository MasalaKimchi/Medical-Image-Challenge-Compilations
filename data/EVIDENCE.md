# Official-source verification matrix

This matrix records the fresh review performed on 23 July 2026 for the 27 records that previously had no verification date. A record is stamped only when its exact official source page (or the public API behind that official platform page) supports the phase that determines whether the challenge is open, upcoming, rolling, or closed.

| Challenge | Result | Official evidence supporting current status |
|---|---|---|
| BraTS | Verified; corrected | [Synapse](https://www.synapse.org/Synapse:syn74274097/wiki/) reports an active 2026 challenge and an extension of the standard-track final Docker deadline to 30 Jul 2026. |
| FLARE AutoMSC | Verified | [Codabench](https://www.codabench.org/competitions/15553/) lists registration through 20 Aug, validation through 20 Aug, and testing through 31 Aug 2026. |
| FOMO26 | Verified | [Official site](https://fomo26.github.io/) says signup and model submission are open and gives a 21 Aug 2026 submission deadline. |
| CMRxRecon | Verified | [Official site](https://cmrx.chihucloud.com/2026/) lists registration from 1 Feb, testing from 1 Jul, and a 20 Aug 2026 Docker deadline. |
| HECKTOR | Verified | [Grand Challenge](https://hecktor26.grand-challenge.org/) lists the testing window as 15–25 Jul 2026. |
| PENGWIN | Verified; corrected | [Grand Challenge](https://pengwin2026.grand-challenge.org/) lists preliminary submissions from 22 May and final testing from 17 Jul through 19 Aug 2026. |
| Learn2Reg | Verified | [Grand Challenge](https://learn2reg.grand-challenge.org/) exposes current 2026 tasks, a Join action, and the 26 May 2026 kickoff. No unsupported final deadline was added. |
| ODIN | Verified | [Grand Challenge](https://odin2026.grand-challenge.org/) exposes current debugging/test leaderboards and a Join action for ODIN 2026. No unsupported deadline was added. |
| autoPET V | Verified | [Grand Challenge](https://autopet-v.grand-challenge.org/) lists preliminary submissions from 4 May, final testing from 15 Jul, and closure on 1 Sep 2026. |
| ISLES'26 | Verified | [Grand Challenge](https://isles-26.grand-challenge.org/) lists Docker submissions from 15 Jul through 15 Aug 2026. |
| AIMS-TBI26 | Verified; corrected | [Grand Challenge](https://aims-tbi26.grand-challenge.org/) says new registrations are closed while registered teams can submit final models through 23 Jul 2026. |
| ATM26 | Verified; expanded | [Grand Challenge](https://atm26.grand-challenge.org/) lists registration from 15 Jun, validation from 15 Jul, and final testing from 30 Jul through 10 Sep 2026. |
| HEADLINE26 | Verified | [Grand Challenge](https://headline26.grand-challenge.org/) says validation and sanity-check phases are open and the final test phase is planned. |
| BEETLE | Verified | [Grand Challenge](https://beetle.grand-challenge.org/) explicitly describes a long-term benchmark with no submission deadline. |
| REG² | Verified | [Grand Challenge](https://reg2026.grand-challenge.org/) lists the final test phase ending 20 Jul 2026. |
| FMC-UIA | Verified; corrected | [Codabench](https://www.codabench.org/competitions/11539/) reports no current active phase and a 15 Jan 2026 final Docker deadline; it is not a rolling live challenge. |
| CXR-LT | Verified; corrected | [Official site](https://cxr-lt.github.io/CXR-LT-2026/) says the competition closed 3 Feb 2026 and publishes final leaderboards. |
| LCR-MPI | Verified; corrected | [Official site](https://www.mpilab.net/LCR-MPI-Challenge/) announces that the competition and paper deadline was extended to 1 Mar 2026. |
| RIVA | Verified | [Official site](https://lia-ditella.github.io/rivachallenge/) says final evaluation ended 20 Feb 2026. |
| WBCBench | Verified | [Official site](https://xudong-ma.github.io/WBCBench2026-Robust-White-Blood-Cell-Classification/) publishes the completed challenge and winners announced at ISBI on 11 Apr 2026. |
| EndoUC | Verified | [Official site](https://endouc-cv.github.io/) publishes the past challenge schedule and ISBI 2026 result event. |
| PANORAMA | Verified | [Grand Challenge](https://panorama.grand-challenge.org/) states that final testing results were published on 28 Feb 2025. |
| BiomedSegFM (Interactive) | Verified; corrected | [Codabench](https://www.codabench.org/competitions/5263/) marks the 2026 validation phase previous and reports submission confirmations on 15 May 2026; it is not rolling. |
| BiomedSegFM (Text) | Verified; corrected | [Codabench](https://www.codabench.org/competitions/5651/) marks the 2026 validation phase previous and reports submission confirmations on 15 May 2026; it is not rolling. |
| CVPR26 CT-Dx | Verified; corrected | [Codabench](https://www.codabench.org/competitions/12650/) says the challenge opened 1 Feb and final testing ran 10–15 May 2026. |
| RSNA Aneurysm | **Blocked; left unverified** | The exact [Kaggle page](https://www.kaggle.com/competitions/rsna-intracranial-aneurysm-detection) loaded only its application shell during this audit, and no accessible official response exposed the recorded start/end dates. |
| RSNA Knee MRI | **Blocked; left unverified** | The [RSNA page](https://www.rsna.org/artificial-intelligence/ai-image-challenge/knee-mri-ai-challenge) only says the challenge *will* launch in spring and conclude in October; it does not confirm that entry is currently open or link an active competition, so the estimated window remains upcoming and not joinable. |

The two blocked records intentionally retain `lastVerifiedISO: null` and `sources[].lastCheckedISO: null`. Their existing estimated phases remain visible as unverified rather than being presented as freshly confirmed facts.

## Gap-sweep additions

The following records were added from official sources during the same 23 July UTC review window.

| Challenge | Result | Official evidence supporting current status |
|---|---|---|
| MRIxFields 2026 | Verified; added | The [official site](https://mrixfields.chihucloud.com/2026/) lists registration from 1 Apr, testing from 1 Jul, and a 10 Sep registration and Docker deadline. |
| EchoRisk 2026 | Verified; added | The [official submission guide](https://echorisk-miccai.github.io/submission-guide.html) confirms team registration through Synapse and an extended 20 Aug final Docker deadline. |
| DoseRAD 2026 | Verified; added | The [Grand Challenge timeline](https://doserad2026.grand-challenge.org/timeline-and-rules/) lists development from 10 Apr through 24 Aug and final testing from 23 Jul through 24 Aug. |
| ReXGrounding 2026 | Verified; added | The [official challenge site](https://rexrank.ai/ReXGroundingCT/challenge.html) explicitly reports open registration, submissions, and a live public leaderboard without publishing a closing date. |
| MAMA-Synth 2026 | Verified; added closed | The [official organizer timeline](https://www.ub.edu/mama-synth/mama-synth.html) gives a 25 Jun–10 Jul final test phase, 1 Aug results release, and 27 Sep winners announcement. |
| FETUS 2026 | Verified; added closed | The [official ISBI programme](https://biomedicalimaging.org/2026/challenges/) lists FETUS and the completed 11 Apr ISBI challenge session. |

## 2026-07-31 refresh

The bi-weekly sweep on 31 July 2026 re-verified time-sensitive and active records against their official pages. **36 of 44** records were re-confirmed and re-stamped `2026-07-31`; **8 retained their `2026-07-23` stamp** because their official pages could not be re-read this cycle (BraTS on Synapse; the FLARE AutoMSC, BiomedSegFM Interactive/Text, CVPR CT-Dx and FMC-UIA Codabench single-page apps; and the CXR-LT and EndoUC GitHub sites, which now return 404).

| Challenge | Result | Official evidence / change |
|---|---|---|
| RSNA Aneurysm | Cleared; verified | [RSNA](https://www.rsna.org/artificial-intelligence/ai-image-challenge/intracranial-aneurysm-detection-ai-challenge) confirms the Kaggle competition closed 14 Oct 2025; dataset gated via RSNA MIRA (non-commercial). No longer unverified; `dataAvailable` set to on-registration. |
| RSNA Knee MRI | Cleared; verified | [RSNA](https://www.rsna.org/artificial-intelligence/ai-image-challenge/knee-mri-ai-challenge) still lists a spring-2026 launch and October 2026 conclusion with no active registration; remains `upcoming`, now stamped rather than blocked. |
| DoseRAD 2026 | Verified; corrected | The [Grand Challenge timeline](https://doserad2026.grand-challenge.org/timeline-and-rules/) now shows training/validation and final testing ending 15 Aug (final test opened 16 Jul) and posts a delay on the preliminary validation phase. |
| TREAT-MMTB | Verified; corrected | The [official site](https://treat-mmtb.mi2rl.co/) shows the internal-phase submission closed 24 Jul; only the application window runs to 31 Jul, with the external Docker phase 1–20 Aug. |
| ATM26 | Verified | [Grand Challenge](https://atm26.grand-challenge.org/timeline/) confirms the final test phase opened 30 Jul and runs to 10 Sep. |
| BraTS | Not re-read; state refreshed | The Synapse timeline was not machine-readable on 31 Jul; the record keeps its 23 Jul verification, and passed phases (final Docker 30 Jul) were marked complete from the already-verified dates. |
| HECKTOR / AIMS-TBI26 | Verified | Testing (25 Jul) and final submission/paper (23 Jul) confirmed closed on the official Grand Challenge pages. |
| CMRxRecon | Verified; expanded | The [official site](https://cmrx.chihucloud.com/2026/) lists a workshop-paper deadline of 30 Jul, added as a completed phase. |
| CLEAR-EC | Verified; added | The [official page](https://clear-ec.grand-challenge.org/) reports open registration with Phase I submissions due 14 Sep 2026 and Phase I evaluation 30 Sep; added as a standalone Grand Challenge. |
| LUNOVO26 | Identified; deferred | [Lung Nodule Volumetry 2026](https://lunovo26.grand-challenge.org/) shows an open debug leaderboard but publishes no participation schedule; held back pending an official timeline. |

The two GitHub sites that now 404 (**CXR-LT**, **EndoUC**) remain in the catalogue as completed challenges; their primary URLs should be reviewed at the next sweep since the official pages are no longer reachable.

## 2026-08-15 refresh

This sweep added ten records only after confirming an organizer page or the public API behind the official hosting platform. It also re-verified six existing records whose dates or phase states changed. The catalogue contains **54 verified records**: 16 stamped `2026-08-15`, 30 stamped `2026-07-31`, and 8 stamped `2026-07-23`.

| Challenge | Result | Official evidence / change |
|---|---|---|
| FoundUS | Verified; added | The [official Codabench competition](https://www.codabench.org/competitions/15590/) and its [final-test phase](https://www.codabench.org/competitions/17560/) show validation through 10 Aug and hidden-test submissions through 15 Aug 2026. |
| UUSIVC | Verified; added | The [organizer site](https://uusivc2026-sudo.github.io/uusivc2026.github.io/) lists registration and validation from 29 Jun, a 25 Aug Docker/short-paper deadline, and testing from 26 Aug. |
| AMPLIFAI | Verified; added | The [organizer timeline](https://um-ihc-ca2i.github.io/amplifai-challenge/) lists registration through 1 Sep and testing through 15 Sep; the [official Codabench page](https://www.codabench.org/competitions/14290/) confirms the hosted phases. |
| CATHACTION | Verified; added | The [official challenge site](https://endomiccai.github.io/cathation/) lists a 10–15 Aug submission window, 20 Aug report deadline, and 1 Oct EndoVis event. |
| CHIMERA-Agent | Verified; added | The [official Grand Challenge site](https://chimera-agent.grand-challenge.org/) and [timeline](https://chimera-agent.grand-challenge.org/challenge-timeline/) confirm open participation and a 10 Sep final deadline. |
| MultiSAT | Verified; added | The [official organizer page](https://camma-public.github.io/mbt40_challenge/) lists a closed 2 Jul registration deadline and a 3 Sep final Docker, presentation, and report deadline for registered teams. |
| SurgVU26 | Verified; added | The [official Grand Challenge timeline](https://surgvu26.grand-challenge.org/important-dates/) lists registration through 15 Aug, preliminary submissions through 2 Sep, and final testing through 6 Sep. |
| COBRA2026 | Verified; added | The [official timetable](https://cobra2026.grand-challenge.org/timetablerules/) announces the MIDL 2027 benchmark, with registration and development from 13 Jul 2026 through 15 Feb 2027. |
| DALPHIN | Verified; added rolling | The [official Grand Challenge page](https://dalphin.grand-challenge.org/) describes a long-term visual-question-answering benchmark with no submission deadline. |
| Light My Cells 2 | Verified; added upcoming | The [official Grand Challenge page](https://lightmycells2.grand-challenge.org/) publishes a 31 Jul data release, 21 Sep challenge launch, 1 Dec test opening, and 13 Dec final deadline. |
| RSNA Knee | Verified; opened | [RSNA](https://www.rsna.org/artificial-intelligence/ai-image-challenge/knee-mri-ai-challenge) now links the live Kaggle competition and reports more than 5,000 examinations, 19 sites, 12 report languages, and $77,000 in prizes. |
| FOMO26 / ODIN | Verified; corrected | [FOMO26](https://fomo26.github.io/) now distinguishes its 21 Aug validation and 30 Aug test deadlines. [ODIN's official dates](https://odin-workshops.org/2026/dates/) give a 17 Aug test close and 15 Sep results date. |
| SynthOCT / TREAT-MMTB / TopAneu | State refreshed | Their already-published phase dates place SynthOCT's submission, TREAT-MMTB's application, and TopAneu's sanity-check opening on the appropriate side of the 15 Aug review date. |

Watchlist-only candidates were intentionally not added: **LUNOVO26** still lacks a participation schedule; **TopBrain2026** is under construction; **BIG-MRI** reports a delayed dataset without an operational participation phase; and several accepted MICCAI/EndoVis pages still promise details later.
