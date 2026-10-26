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

## 25 October 2026 refresh

Review date: **2026-10-25, America/New_York**. The catalog contains **63 records**; **26** carry this review's verification date. Older records retain their previous stamps. This is a targeted discovery and current-participation review, not a fresh verification of every historical record.

### Additions

| Challenge | Verified participation evidence |
|---|---|
| **FeTS 2027** | The [MICCAI SIG registry](https://miccai.org/sig/sig-challenges/) lists an early accept. Its [registered organizer design](https://zenodo.org/records/19852083) plans registration/data release on **1 Feb 2027** and code/model plus short paper by **31 Jul**. Upcoming; the future Synapse endpoint is not yet usable. Organizer-run August testing is not a participant submission window. |
| **TriALS-Report 2027** | The [registered design](https://zenodo.org/records/19849408) plans challenge registration **1 Jan**, training/team access **14 Jan**, validation **14 Feb**, team entry close **1 Aug**, Docker **10 Sep**, methodology **17 Sep 2027**. Upcoming; the continuing Synapse workspace does not establish that 2027 registration is open. |
| **BIG-MRI** | [Organizer schedule](https://big-radboudumc.github.io/): preliminary development **2–16 Nov**, validation **16 Nov–6 Dec**, final **6 Dec 2026**, CET. The same page warns that data release is delayed and still has placeholder participation links. Added as upcoming with access unconfirmed, not open. |
| **OWL / WACV 2027** | [Official platform timeline](https://owl.grand-challenge.org/timeline/) gives sanity checks from **16 Oct**, scored testing **30 Oct–30 Nov**. The [workshop page](https://cvpath-vision4neuro.github.io/wacv2027/challenge.html) confirms open registration and optional **6 Nov** short papers, but its test-opening row differs and explicitly defers to the platform. Debugging remains listed through **7 Dec**; that does not extend scored testing. |
| **TopBrain V2** | [Official platform API](https://grand-challenge.org/api/v1/challenges/TopBrain2026/) reports **OPEN_SOON** and an overall end of **31 Dec 2026, 22:59 UTC**. The [organizer](https://topbrain2026.grand-challenge.org/) describes CTA/MRA vessel segmentation and follow-on tasks. The [platform listing](https://grand-challenge.org/challenges/) shows December final testing, but its displayed opening day varies with timezone. Exact test dates remain null; the overall window is not exported as a final-submission deadline. |
| **JRC 2027** | [JSRT official rules](https://www.jsrt.or.jp/gmeeting/soukai83eng/?page_id=63) provide an active entry form, **18 Dec 2026, 17:00 JST** entry and **29 Jan 2027, 17:00 JST** submission deadlines. Every team must include a JSRT/JRS/JSMP member; selected awardees must present in person at their own expense. |
| **Cell Map DREAM** | [Official AnVIL announcement](https://anvilproject.org/events/cm4ai-anvil2026-dream-challenge) states **19 Oct 2026–1 Feb 2027**, protein-channel microscopy generation, **$50,000 cash + $70,000 cloud credits**. The linked [Synapse workspace](https://www.synapse.org/Synapse:syn77349038/wiki/643745) exposes an active registration widget through its public wiki API. |
| **UMUD** | The actual [Kaggle overview](https://www.kaggle.com/competitions/umud-challenge-muscle-architecture-in-ultrasound-data/overview) was inspected without joining. Prediction submissions close **14 Nov 2026, 23:00 UTC**. The organizer payout text specifies **CHF 3,000**, despite the sidebar's dollar display. Top-three solutions require public licensed, reproducible repositories. |
| **MedVidU 2026** | [Organizer schedule](https://medvidu.github.io/) confirms medical-video predictions and mandatory paper closed **27 Jul 2026, 23:59 AoE**; the ECCV workshop took place **9 Sep**. Added as a closed archive record, not an upcoming opportunity. |

### Existing-record corrections

| Records | Current evidence and resolution |
|---|---|
| **HEADLINE26** | The [organizer submission page](https://headline.ccibonn.ai/submission/) explicitly closes registration and submissions; its main site publishes winners. This supersedes stale opening text on Grand Challenge. Exact closing date remains unknown. |
| **SELMA3D** | [Official timeline](https://selma3d2026.grand-challenge.org/timeline/): preliminary **11 Aug–30 Sep**, final **14–30 Sep**, event **1 Oct**. The homepage gives a one-day earlier preliminary opening; timeline dates are used. Now closed and correctly grouped under MICCAI. |
| **ATM26** | [Organizer timeline](https://atm26.grand-challenge.org/timeline/) corrects final testing to **20 Aug–22 Sep**, then explicitly reopens long-term submissions **1 Oct**. The organizer-linked [new site](https://journey1234-liu.github.io/atm26/) confirms continued submissions and registration instructions. Grand Challenge's completed flag describes the competition round, not the new benchmark. |
| **ReXGrounding** | The [official challenge page](https://rexrank.ai/ReXGroundingCT/challenge.html) closes competition submissions **14 Sep** and explicitly reopens evaluation through its separate ReXGroundingCT benchmark on the same 300-case test set. The benchmark is modeled as a rolling phase. |
| **CLEAR-EC** | The [current host listing](https://grand-challenge.org/challenges/) explicitly accepts Phase II until **15 Nov**. The [organizer page](https://clear-ec.grand-challenge.org/) limits advancement to Phase I's top five. Phase II is active but not joinable by new teams; exact opening date remains unknown. |
| **Light My Cells 2** | The [organizer-contributed announcement](https://www.eurobioimaging.eu/news/france-bioimagings-light-my-cells-2-challenge/) confirms open registration. The [timeline image](https://lightmycells2.grand-challenge.org/timeline/) was visually inspected: validation **21 Sep–1 Dec**, evaluation **1–13 Dec**, results **18 Dec**. The [host](https://lightmycells2.grand-challenge.org/) says submitted to ISBI 2027; acceptance is unconfirmed. |
| **COBRA** | The [organizer timetable](https://cobra2026.grand-challenge.org/timetablerules/) retains **1 Dec** validation and **29 Jan–15 Feb 2027** final testing. The platform index gives an earlier final-test opening. Preserve the organizer's timetable and expose the discrepancy; registration/training are confirmed open. |
| **DoseRAD** | [Organizer timeline](https://doserad2026.grand-challenge.org/timeline-and-rules/) moves competition close to **31 Aug** and schedules post-challenge activity **1 Oct–31 Dec**. The current platform says completed. Represent the post-challenge schedule as awaiting confirmation, not active participation. |
| **CHIMERA-Agent** | [Updated timeline](https://chimera-agent.grand-challenge.org/challenge-timeline/) closes Round 1 **14 Sep at 12:00 CEST**. [Awards and rounds](https://chimera-agent.grand-challenge.org/awards/) announce **November Round 2**, with exact dates and evaluation TBA. Added an undated upcoming phase, not invented month-boundary deadlines. |
| **CMRxRecon / PENGWIN / autoPET V / TopAneu / UUSIVC** | Re-read the individual organizer/host pages. Removed obsolete active undated competition phases. [CMRx](https://cmrx.chihucloud.com/2026/) closes testing **20 Aug**, results **1 Oct**; [PENGWIN](https://pengwin2026.grand-challenge.org/) publishes final results **2 Sep** after **19 Aug** submissions; [autoPET](https://autopet-v.grand-challenge.org/timeline/) closes **1 Sep**; [TopAneu](https://topaneu-26.grand-challenge.org/) revises final testing to **11–21 Sep**. [UUSIVC](https://uusivc2026-sudo.github.io/uusivc2026.github.io/) now publishes final results after organizer-run testing. |
| **RSNA Knee** | [Kaggle timeline](https://www.kaggle.com/competitions/rsna-knee-abnormality-detection/overview) and [RSNA announcement](https://www.rsna.org/news/2026/august/ai-challenge-knee-mri) confirm competition close **22 Oct**. The **5 Nov** obligation is for selected winners, not new participants. |
| **BEETLE / DALPHIN** | Re-read their official benchmark pages; both explicitly describe long-term evaluation without deadlines or formal competition prizes. Refreshed their verification stamps. |
| **Learn2Reg** | The [official description](https://learn2reg.grand-challenge.org/Description/) links 2026 tasks, but the accessible timeline is for 2025 and current Codabench phases could not be read. Retained the **31 Jul** verification stamp; disabled advertised new-team entry and marked current participation awaiting organizer confirmation. |

### Conference coverage and deferred leads

- **CVPR:** the [2027 workshop call](https://cvpr.thecvf.com/Conferences/2027/CallForWorkshops) is for organizers (proposal deadline **4 Nov**, decisions **22 Dec**), not participant entry. No named upcoming medical competition was verified. Existing 2026 records remain closed. The [FMV workshop](https://fmv-cvpr26workshop.github.io/) also links Pan-cancer Segmentation, but its Codabench phase dates could not be read; do not invent them.
- **ECCV:** the [2026 workshops](https://eccv.ecva.net/Conferences/2026/Workshops) finished **8–9 Sep**. MedVidU is included as an archive. [MoCha](https://mocha.care-pd.ca/) closed **15 Aug** and is clinically relevant but uses motion meshes rather than conventional medical images; recorded here rather than expanding the catalog with an adjacent closed task. iMED/SurgVU references do not create duplicate entries.
- **ISBI:** the [2027 conference](https://biomedicalimaging.org/2027/) schedules challenge proposal notifications **16 Nov**. This is an organizer milestone; named participant schedules still need individual announcements.
- **AAPM:** the [official hub](https://www.aapm.org/GrandChallenge/Default.asp) still says 2026–27 challenges will be announced. A journal special issue is not a competition reopening.
- **LUNOVO26** remains a watchlist lead: a debug leaderboard alone does not establish an actionable competition schedule. PRISM-AI and ECGI surfaced as additional leads but were not sufficiently verified in this review and were not added.

Passed: schema/provenance consistency, generated-data synchronization, review-date status/deadline assertions, internal-link checks, and desktop/mobile browser verification (see task verification output). Unverified: authenticated joining/submission, gated dataset availability, future schedule execution, the conflicting dates above, and older records not included in this targeted sweep. No authenticated participation or challenge submissions were performed.

## 25 October 2026 gap-fill follow-up

The follow-up adds **10 records**, bringing the catalog to **73**, and enriches **20 of the existing 63 entries**. Its 48 substantive field changes include factual corrections as well as filled gaps; they are not a claim that 48 previously unknown facts were discovered. Of the existing entries, verified dataset sizes increased from five to nine. No file totals were estimated from image dimensions, patient counts, or unrelated editions.

Current status snapshot: **7 live, 14 open, 7 upcoming/awaiting confirmation, 45 closed**. **38 records** have current status verification. Checking a dataset or awards page alone does not refresh an older status-verification stamp.

### Additional events and open benchmarks

| Record | Primary evidence and participation limit |
|---|---|
| **FaceVitals / ICASSP 2027** | [IEEE official call](https://signalprocessingsociety.org/community-involvement/signal-processing-cup): registration **25 Oct 2026**, Phase 1 **30 Nov**, Phase 2 **16 Jan 2027**; finalists compete during ICASSP **16–21 May**. Undergraduate team, faculty supervisor, and SPS membership requirements apply. [Technical rules](https://signalprocessingsociety.org/sites/default/files/2026-10/2027-SP-Cup-Official-Document-FaceVitals.pdf) describe RGB-video heart rate, SpO2 and blood-pressure estimation; organizer data require agreement, and approved public/self-collected alternatives are allowed. Entry cutoff time is not given on the inspected call. |
| **PRISM-AI** | [Current timeline](https://prisma24.grand-challenge.org/timeline/) explicitly moves test opening to **2 Nov** and final submission to **9 Nov 2026**, despite the `prisma24` hostname. Registration closed **30 Jun**. [Cohort page](https://prisma24.grand-challenge.org/data/) describes **72,076 women** in the primary analysis from **79,736** prospective participants. Evaluation uses existing pretrained mammography-risk algorithms; images/outcomes are withheld, not distributed for training. The timeline's “end of the same week” wording is less precise than its explicit 9 Nov heading; the latter is stored with a delay warning. |
| **SIPAIM TEM** | [Conference call](https://www.sipaim.org/challenge), [rendered organizer portal](https://alexandrojim.github.io/tem-challenge/), [loaded overview](https://alexandrojim.github.io/tem-challenge/content/challenge.md) and [dataset specification](https://alexandrojim.github.io/tem-challenge/content/data.md) checked. Entry **9 Nov, 23:59 CET**; **400 micrographs, 266 train / 134 test**. Rendered portal advertises **€500 total**. The loaded overview says **13 Nov** final, but the conference and upload panel say **24 Nov**; no final date is stored/exported. The static HTML also includes hidden closed-registration text; rendering with the review date confirmed an active form. No registration was submitted. |
| **PANTHER** | [Organizer timeline](https://panther.grand-challenge.org/timeline/) explicitly reopens development and post-challenge submissions. [Data description](https://panther.grand-challenge.org/dataset-imging-labels/) gives **92 labelled + 367 unlabelled diagnostic MRI** and **50 MR-Linac training scans**, with **30 hidden test cases per task**. [Zenodo](https://zenodo.org/records/15192302) requires an approved noncommercial research request. [Public API](https://grand-challenge.org/api/v1/challenges/PANTHER/) reports an operational end **13 Apr 2027, 21:59 UTC**, not a new cash-prize deadline. |
| **TrackRAD** | [Organizer](https://trackrad2025.grand-challenge.org/) explicitly opens post-challenge submissions. [Data](https://trackrad2025.grand-challenge.org/data/): **477 unlabelled + 50 labelled training patients**, **8 validation / 50 test**, with over **2.8 million unlabelled frames**. The [API](https://grand-challenge.org/api/v1/challenges/TrackRad2025/) window ends **30 Dec 2026, 23:00 UTC**. [Rules](https://trackrad2025.grand-challenge.org/rules/) retain an obsolete 2023 testing row; it is not used to reconstruct the 2025 competition. |
| **SynthRAD2025** | [Rules](https://synthrad2025.grand-challenge.org/rules/) allow post-challenge submissions **1 Sep 2025–15 Mar 2030**; the API ends a day later, so the earlier organizer date is retained and the discrepancy disclosed. [Actual dataset release](https://zenodo.org/records/14918089) gives **890 MRI–CT pairs + 1,472 CBCT–CT pairs**, superseding rough proposal estimates. Centre D has separate, limited-use access; the original cash round is complete. |
| **ULS23** | [Organizer news](https://uls23.grand-challenge.org/) explicitly reopens testing in March 2025 and adds extended-inference leaderboards **11 Oct 2026**. The [organizer repository](https://github.com/DIAGNijmegen/ULS23) links six imaging releases and labels, including **750 newly annotated DeepLesion lesions** plus other cohorts. This subset is not represented as the entire dataset count. |
| **PI-CAI** | [Registered design](https://zenodo.org/records/6522364) maintains validation/tuning after the 2022 competition; [current API](https://grand-challenge.org/api/v1/challenges/PI-CAI/) reports OPEN. [Data specifications](https://pi-cai.grand-challenge.org/DATA/) and [public release](https://zenodo.org/records/6624726) provide **1,500 exams from 1,476 patients**, **100 hidden tuning / 1,000 hidden test**. Do not imply that the old prize or closed-testing round reopened. |
| **NeurIPS CellSeg** | The [host](https://neurips22-cellseg.grand-challenge.org/) allows ongoing submissions; [dataset record and README](https://zenodo.org/records/10719375) explicitly intend a sustainable benchmark. [Organizer-authored publication](https://cimini-lab.broadinstitute.org/files/ciminilab/files/the_multimodality_cell_segmentation.pdf) gives **1,000 labelled / 1,725 unlabelled training**, **101 tuning / 422 test** images. [API](https://grand-challenge.org/api/v1/challenges/NeurIPS22-CellSeg/) reports OPEN. Original 2022 prize round is completed. |
| **ToothFairy3** | [Host](https://toothfairy3.grand-challenge.org/) exposes post-challenge phases for both tasks and the [API](https://grand-challenge.org/api/v1/challenges/ToothFairy3/) reports OPEN through **31 Dec 2030, 23:00 UTC**. [Dataset rules](https://toothfairy3.grand-challenge.org/dataset/) require sign-up, CC BY-NC-SA and 0.3 mm CBCT; test data remain private. **77 classes** is a target-label count, not a scan count. Original 2025 prizes remain historical. |

### Existing-entry enrichment

| Records | Filled or corrected facts and sources |
|---|---|
| **DoseRAD** | [Dataset page](https://doserad2026.grand-challenge.org/data/): **122 patients** including **75 train / 40 test / 7 external**, reported **864 GB**, **40,500 photon segments / 81,000 proton beamlets** for training. [Awards](https://doserad2026.grand-challenge.org/awards/): **USD 1,000 per task**, four tasks. [Release](https://zenodo.org/records/19347848) links public training data; test data remain withheld. |
| **BEETLE / DALPHIN** | [BEETLE release](https://zenodo.org/records/16812932): **587 development specimens**, **54 external specimens / 170 evaluation ROIs**; compressed image, annotation and metadata files total **149.029 GB**, excluding the baseline-model archive. [DALPHIN release](https://zenodo.org/records/18609450): compressed images plus metadata total **1.175 GB**. Sizes are decimal GB, rounded from public file metadata; no datasets were downloaded. |
| **SynthOCT** | [Official public release](https://zenodo.org/records/18095266): **120 skin B-scans**, **256 × 512**, **0.038 GB** compressed. This is the public reference set, not the hidden evaluation cohort. Added the generation task tag without changing its phantom-generation objective. |
| **HECKTOR / RARE26** | [HECKTOR awards](https://hecktor26.grand-challenge.org/prizes/): **USD 1,000 / 500 / 300**, paper required, external-data entrants ineligible for cash. [RARE26 organizer](https://rare26.grand-challenge.org/): gift cards **€1,000 / 500 / 250 / 150 / 100**, plus publication collaboration. |
| **SurgVU26** | [Data description](https://surgvu26.grand-challenge.org/data-description/): **280 videos / 155 sessions**, tool localisation and VQA. Corrected the scope from generic action classification. [Actual awards](https://surgvu26.grand-challenge.org/prizes/) are tiered 2026-versus-overall cash awards plus methodology-report awards; removed unsupported GPU-prize wording. The source's duration/frame totals are internally inconsistent, so those totals were not copied. |
| **MAMA-Synth / EchoRisk** | [MAMA-Synth](https://mamasynth.grand-challenge.org/data/): **1,506 training / 200 + 100 external test cases**, with mixed 3D training/2D test inputs. [EchoRisk dataset](https://echorisk-miccai.github.io/dataset.html): **422 patients / 2,159 videos / 1,036 fully paired exams**. [Rules](https://echorisk-miccai.github.io/rules.html) explicitly refuse new access requests after registration closes; data access is marked registration-closed. |
| **Light My Cells 2** | [Organizer announcement](https://france-bioimaging.org/fbi-special-events/france-bioimaging-light-my-cells-2-challenge-is-open/): **76 studies / 150,000+ images**, best-focus and stack-to-MIP tasks; validation is explicitly **21 Sep–30 Nov**, correcting the previously stored 1 Dec boundary. [Prizes](https://lightmycells2.grand-challenge.org/prizes/) specify certificates, coauthorship and open-source integration support, not a confirmed cash amount. |
| **CHIMERA-Agent** | [Data specification](https://chimera-agent.grand-challenge.org/data-sources-and-imaging/): **195 train / 75 validation / 250 test**, with **100 external test cases**. Input is structured clinical JSON and frozen MRI/pathology embeddings, not raw DICOM or WSI images at inference. Corrected the input-format description to prevent misleading resource expectations. |
| **ORena / iMED** | Repaired ORena's primary link to the current organizer. [ORena data](https://or-arena.org/save-focus/data/): HeiCo **30 videos / 30,000 VQA pairs**, LapChole **100 labelled + 70 unlabelled videos / 20,000 VQA pairs**; access is gated with usage terms. [iMED data](https://imed-challenge.github.io/data.html): static **61 train / 19 test**, deformable **20 sequences**, approximately **200 input / 200 held-out frames** per case. Added the linked access source. |
| **ISLES / FETUS** | [ISLES data](https://isles-26.grand-challenge.org/dataset/): **1,453 training scans**, correcting the vague total, and raw native-space evaluation. [Current homepage](https://isles-26.grand-challenge.org/) changes Docker close to **19 Aug**, after opening **30 Jul**. [FETUS organizer timeline](https://cola-shao.github.io/timeline/) supplies exact registration, development, validation, test and report windows; test close **22 Feb**, report close **15 Mar**. [Dataset specification](https://cola-shao.github.io/dataset/) gives **13 anatomical targets / 11 biometric parameters**, but no verified image total; secondary-site counts were not copied. |
| **FeTS / TriALS / BIG-MRI / JRC / TopBrain** | Future/pending releases are marked not-yet-released, rather than implying immediate download after registration. [TopBrain data metadata](https://zenodo.org/records/21972006) refines the public archive to **1.964 GB** and distinguishes **40 CTA / 42 MRA labels** from the later **36-class update**. |

### Presentation and remaining gaps

- Every tracker card now displays the stored dataset count. “Dataset & sources” exposes size, dimensionality, anatomy, platform and dated primary links. The table has the same details; comparison includes count, size, input and platform. All displayed source text is escaped and links are restricted to HTTPS.
- Added explicit availability states for organizer-held evaluation, closed registration and future release. Unknown access remains unknown where no current source proves otherwise.
- Numeric file size remains unverified for many datasets. Public metadata sometimes describes a paper/protocol rather than image files (for example, the DoseRAD Zenodo record); those document sizes are never substituted for dataset size. Approved/gated downloads, future data release execution, remaining unannounced prizes and unresolved protocol conflicts are not certified.
- The discovery pass inspected all **264 public Grand Challenge entries** and followed selected organizer pages. Old OPEN registry flags alone were insufficient to reopen competitions. No broad claim is made that all 73 historical records were freshly checked.
- Codabench endpoints for the additional CVPR Pan-cancer and Learn2Reg leads timed out. Some dataset pages were gated or blocked. No access controls were bypassed and no participant registration or submission was performed.

Validation: schema and generated-data checks, **18 unit tests**, internal-link checks and **27 desktop/mobile browser tests** passed; three viewport-specific test instances were intentionally skipped. Coverage includes restricted entry, conflicting deadlines, meaningful metadata, keyboard-operated details and escaping/untrusted-URL handling. No new dependencies or release configuration were introduced.

## 26 October 2026 expanded discovery and deployment check

The user asked whether coverage was comprehensive, which broader keywords fit the site, and whether the updates were deployed. This review broadened discovery beyond conference names, added seven source-backed entries, and compared the public deployment with local files. It does **not** establish complete coverage of all medical-image competitions.

### Newly included ongoing benchmarks

| Entry | Current participation evidence | Metadata and limits |
|---|---|---|
| Cell Tracking / Segmentation / Linking | [Organizer](https://celltrackingchallenge.net/) accepts monthly evaluations; [15 Oct news](https://celltrackingchallenge.net/news/) explicitly opens Cell Linking online; [submission rules](https://celltrackingchallenge.net/submission-of-results/) and [registration](https://celltrackingchallenge.net/registration/) explain entry | [2D](https://celltrackingchallenge.net/2d-datasets/) and [3D](https://celltrackingchallenge.net/3d-datasets/) pages list 10 collections each. Counts are collections, not patients or frames. Downloads are public, but submitting needs an account requested by email and executable methods. [Data conditions](https://celltrackingchallenge.net/datasets/) require permission for public non-challenge scientific use and commercial use, and forbid cloning/redistribution. No fixed final deadline or new cash award is stated. |
| DRAC | [Post-challenge instructions](https://drac22.grand-challenge.org/post-challenge-submission/) explicitly permit new registrations and prediction submissions; [platform API](https://grand-challenge.org/api/v1/challenges/DRAC22/) reports OPEN | [Task data](https://drac22.grand-challenge.org/Data/): lesion segmentation 109 train / 65 test; image quality 665 / 438; DR grading 611 / 386. Do not sum overlapping task sets as unique patients. [Zenodo 10280358](https://zenodo.org/records/10280358) exposes three ZIP files totaling 2,238,759,206 bytes = 2.239 decimal GB rounded. No new prize round or deadline is announced. |
| AMOS22 | [Organizer](https://amos22.grand-challenge.org/) invites test-set submissions following the original competition; [platform API](https://grand-challenge.org/api/v1/challenges/AMOS22/) reports OPEN with CT and CT/MRI regular evaluation | [Instructions](https://amos22.grand-challenge.org/Instructions/) point to the public release and warn its contents differ from original contest packaging. [Zenodo 7262581](https://zenodo.org/records/7262581) has 500 CT + 100 MRI labelled scans, 15 organs, `amos22.zip` plus metadata totaling 24,234,371,725 bytes = 24.234 GB rounded. Supplementary unlabelled datasets are separate. The platform's 2060 operational end is not advertised as a real participant deadline. [New AMOS evaluation page](https://era-ai-biomed.github.io/amos/evaluate.html) contains placeholders; existing Grand Challenge evaluation is the participation source. Historical awards are not current awards. |

These three records use rolling participation phases with no invented closing dates. Cell Tracking's three related benchmarks share registration and monthly evaluation and are grouped in one record.

### Newly announced 2027 ImageCLEF tasks

The [2027 programme](https://www.imageclef.org/2027) and each task's own page confirm the next edition but publish **TBD** for registration, dataset release, participant runs, papers and conference dates:

- [Caption](https://www.imageclef.org/2027/medical/caption): radiology concepts and captions; the page refers to ROCOv2, but exact 2027 subtasks, release counts and metrics remain unannounced.
- [GANs](https://www.imageclef.org/2027/medical/gans): synthetic medical-image provenance/privacy and training-data traces. Subtasks and modalities remain TBA; 2026 CT tasks are not silently carried into 2027.
- [MEDVQA-GI](https://www.imageclef.org/2027/medical/medvqa-gi): GI endoscopy VQA with clinically grounded explanations and safety. Page says two subtasks are TBA and it does not use Ai4Media evaluation. Its interest-email/form links are not treated as confirmed open competition registration.
- [MEDIQA-MAGIC](https://www.imageclef.org/2027/medical/mediqa): dermatology images plus clinical narratives/queries for segmentation and clinical answers. Exact subtasks, datasets and metrics remain TBA.

These are distinct task-level entries with different clinical domains, organizers and evaluation protocols, rather than four subtasks of one scored competition. They are `upcoming`, accept no new-team participation claim, keep all phase dates null, and use `not-yet-released` data access. Sizes, counts and awards remain explicitly unpublished. No prior-year values fill those gaps.

### Broader discovery: checked leads and exclusions

The [source plan](SOURCES.md#discovery-keywords-and-scope) now includes task/domain terms, `shared task`, `evaluation campaign`, `online submissions`, `post-challenge`, and `continuous evaluation`, plus Cell Tracking, ImageCLEF and AI4Life organizer hubs.

| Lead | Evidence checked on 26 Oct | Decision |
|---|---|---|
| ACDC cardiac MRI | [Official organizer](https://www.creatis.insa-lyon.fr/Challenge/acdc/) says submissions ended at the end of 2022 and the challenge is now closed; data remain available | Not added as an available competition |
| LUNA25 | [Organizer timeline](https://luna25.grand-challenge.org/timeline/) ends original submissions 31 Jul 2025; [API](https://grand-challenge.org/api/v1/challenges/LUNA25/) reports CLOSED despite a post-challenge tab | Needs explicit confirmation of reopened participation |
| PUMA | [API](https://grand-challenge.org/api/v1/challenges/PUMA/) reports CLOSED despite a future operational end; homepage could not be fetched through web search | Not promoted as open |
| MIDOG2025 | [API](https://grand-challenge.org/api/v1/challenges/MIDOG2025/) reports COMPLETED, end 1 Sep 2025 | No verified new submission round |
| RETOUCH | [Homepage](https://retouch.grand-challenge.org/) says online submissions are open; [API](https://grand-challenge.org/api/v1/challenges/RETOUCH/) reports CLOSED and `/Submit/` returns 403 | Conflicting/manual workflow not sufficiently verified; deferred |
| AI4Life denoising | [Hub](https://ai4life.eurobioimaging.eu/challenges/) links the 2024/2025 calls; [calcium challenge](https://ai4life-cidc25.grand-challenge.org/) displays an old 2025 deadline | Added recurring source, no newly open 2026/2027 round inferred |
| AMOS-MM | [Dataset](https://era-ai-biomed.github.io/amos/dataset.html) offers report-generation/VQA data, but [evaluation](https://era-ai-biomed.github.io/amos/evaluate.html) has placeholder leaderboards | Data-only lead, no verified live participation phase |
| fastMRI | [Official repository](https://github.com/facebookresearch/fastMRI) warns its domain moved to NYU and the site was not rebuilt | No current submission workflow verified |
| Virtual Cell Challenge 2026 | [Organizer](https://virtualcellchallenge.org/) and [Arc announcement](https://arcinstitute.org/news/virtual-cell-challenge-2026) describe gene-expression predictions after CRISPRi perturbations | Active but non-imaging; excluded from this site's scope |
| Retinal photo contest / general clinical meetings | Searches also returned image-aesthetic contests, medical exams and paper calls | Excluded because they do not benchmark biomedical image-analysis algorithms |
| AAPM next round | [Official hub](https://www.aapm.org/GrandChallenge/Default.asp) still says 2026–27 challenges will be announced soon | The linked JACMP special issue is not an open competition |

Other source areas checked during the 25 Oct passes include MICCAI and its SIG catalogue, ISBI, CVPR/ECCV workshops, WACV, MIDL, RSNA/Kaggle, JSRT/JRC, SIPAIM, IEEE SP Cup, Synapse/DREAM/AnVIL, and the public Grand Challenge registry. That discovery inventory is not the same as individually revalidating every challenge's participation and data. **35 of 80 records retain older status verification**; Codabench timeouts and gated pages remain unresolved. No exhaustiveness or complete source-access claim is made.

### Local update versus public deployment

- Public URL checked: [GitHub Pages data](https://masalakimchi.github.io/Medical-Image-Challenge-Compilations/data/challenges.json). HTTP 200; **54 records**; Last-Modified **Sat, 29 Aug 2026 15:55:43 GMT**.
- Local catalog after this review: **80 records**, with **26 local-only IDs** relative to the public JSON; existing records and UI also contain local corrections.
- The local Git checkout remains on `main`, with latest local commit `384ea68` dated 29 Aug 2026 and uncommitted edits from this and earlier work. The tracked workflows verify the site and external links; they are not evidence that these uncommitted files reached production.
- **No commit, push, production publish or deployment was performed.** A local preview is not the public deployment. Public data were inspected read-only.
- Derived 26 Oct state: **10 live, 13 open, 12 upcoming/awaiting confirmation, 45 closed**; **45 fresh status records**. FaceVitals new-team deadline has passed (25 Oct); its note now uses an absolute date.

### Validation and unverified work

The data, generated browser copy, documentation and cache version references were updated together. Existing shared state logic and UI rendering were reused; no dependencies or release configuration changed. Added a focused regression check that ongoing benchmarks remain joinable without artificial final deadlines, and announced 2027 tasks stay unavailable with null dates.

Passed `npm run verify`: schema and generated-copy checks, **19 unit tests**, internal-link validation and **27 browser checks** (3 viewport-specific instances intentionally skipped). The first browser run exposed horizontal overflow at 320 px after adding longer names; allowing cards to shrink and wrap fixed it, and the full suite then passed. A 26 Oct mobile smoke check also confirms MEDIQA-MAGIC renders as upcoming without horizontal overflow. Existing browser checks cover keyboard use, serious/critical accessibility findings and unsafe source labels/URL schemes. No authentication, private-data access or release configuration was added. Gated data downloads, actual account registration/submission, a full external-link sweep and production deployment remain unverified/unperformed.
