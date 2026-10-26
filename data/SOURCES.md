# Bi-weekly source sweep

This tracker combines broad discovery searches with a **source-first review**. A challenge is added or moved to `open` only when its official organizer or hosting page supports that status. Aggregators and social posts can suggest leads, but they are not sufficient evidence on their own. Coverage is not exhaustive: older records retain their real verification dates, and inaccessible or contradictory sources remain explicit gaps.

## Sources checked every two weeks

| Source | What to check | Primary URL |
|---|---|---|
| MICCAI conference | Current conference challenge list, organizer pages, deadlines | https://conferences.miccai.org/2026/en/challenges.asp |
| MICCAI SIG Challenges | The full challenge catalogue, including smaller workshop and satellite challenges such as SynthOCT | https://miccai.org/sig/sig-challenges/ |
| Grand Challenge | New and active challenge phases, registrations, data releases | https://grand-challenge.org/challenges/ |
| Codabench | Medical-imaging competition pages and the active phase on each candidate | https://www.codabench.org/competitions/ |
| AAPM | Current medical-physics grand challenge and new calls | https://www.aapm.org/GrandChallenge/Default.asp |
| CVPR workshops | Medical-vision workshop challenge announcements and linked platforms | https://cvpr.thecvf.com/ |
| ECCV workshops | Medical-video, biomedical and clinically relevant vision competitions; distinguish finished workshops from open challenges | https://eccv.ecva.net/Conferences/2026/Workshops |
| WACV biomedical workshops | Medical-image challenges such as OWL; verify phase dates on the linked host | https://cvpath-vision4neuro.github.io/wacv2027/ |
| IEEE SP Cup / ICASSP | Camera-based health-imaging competitions, undergraduate eligibility and exact entry dates | https://signalprocessingsociety.org/community-involvement/signal-processing-cup |
| SIPAIM | Biomedical-image challenge calls and linked organizer protocols | https://www.sipaim.org/challenge |
| RSNA | Current RSNA AI Challenge status and its registration host | https://www.rsna.org/artificial-intelligence/ai-image-challenge |
| Kaggle | Official competition pages linked by organizers such as RSNA | https://www.kaggle.com/competitions |
| ISBI | Current challenge programme, next-year announcements and official organizer links | https://biomedicalimaging.org/2027/ |
| MIDL | Current and upcoming challenge announcements and linked organizer pages | https://2027.midl.io/ |
| Synapse | Official challenge workspaces and leaderboard phases | https://www.synapse.org/ |
| AnVIL / DREAM | Biomedical microscopy and multimodal image-generation challenges | https://anvilproject.org/events/cm4ai-anvil2026-dream-challenge |
| JSRT / JRC | Radiological imaging challenges, eligibility requirements and entry dates | https://www.jsrt.or.jp/gmeeting/soukai83eng/?page_id=63 |
| Cell Tracking Challenge | Continuous cell segmentation/tracking/linking, monthly evaluation and new calls | https://celltrackingchallenge.net/ |
| ImageCLEFmedical / CLEF | Captioning, medical VQA, dermatology and synthetic-image privacy; check each year's task page | https://www.imageclef.org/2027 |
| AI4Life | Microscopy denoising challenges and any verified new submission round | https://ai4life.eurobioimaging.eu/challenges/ |

## Discovery keywords and scope

Conference names alone miss independent benchmarks and shared tasks. Combine each domain below with `challenge`, `competition`, `benchmark`, `shared task`, `evaluation campaign`, `leaderboard`, `online submissions`, `post-challenge`, `continuous evaluation`, or `call for participation`. Search both the current and following year, plus undated ongoing benchmarks. Use `site:` searches for the platforms above, then follow the result to primary evidence.

| Search area | Useful domain keywords | What it finds / limits |
|---|---|---|
| Radiology and clinical vision | medical image analysis, biomedical imaging, CT, MRI, ultrasound, X-ray, PET, OCT, OCT-A | Core scope; a dataset release alone does not establish an active competition |
| Microscopy and bioimage analysis | cell tracking, cell linking, nuclei segmentation, fluorescence prediction, label-free imaging, calcium denoising | Cell Tracking, CellSeg, Light My Cells, AI4Life and Cell Map; imaging must be central |
| Computational pathology | whole-slide image, WSI, digital pathology, mitosis detection, panoptic segmentation, survival prediction | Include image-based endpoints; do not assume a completed MICCAI round remains open |
| Medical vision and language | medical VQA, radiology captioning, report generation, multimodal reasoning, ImageCLEFmedical, MEDIQA, MEDVQA | Found four announced 2027 ImageCLEF tasks; dates and datasets are still TBA |
| Reconstruction and treatment | inverse problems, sparse-view CT, low-dose CT, synthetic CT, MRI reconstruction, dose prediction, radiotherapy | AAPM, COBRA, SynthRAD and related organizer calls; paper special issues are separate |
| Surgical and interventional vision | EndoVis, surgical workflow, instrument tracking, tissue reconstruction, endoscopy, robotic surgery | Check task-level pages and distinguish workshop dates from participant deadlines |
| Robustness and generative evaluation | domain generalization, foundation models, few-shot segmentation, image quality, synthetic-image privacy, membership inference | Useful methods-oriented searches when the clinical domain is absent from the title |

Exclude generic health innovation prizes, medical exams, photography/image-aesthetic contests, non-imaging omics challenges, paper-only calls and general computer-vision contests without a biomedical imaging task. For example, Virtual Cell Challenge 2026 is active but predicts gene-expression perturbation responses; it is outside this image-analysis catalog. Likewise, AMOS-MM data availability and placeholder leaderboards do not prove a current submission phase.

The 26 October review checked these broader areas through organizer pages and public platform records. It did not reverify all older records, every platform entry, gated downloads or actual submission workflows. RETOUCH's organizer invitation conflicts with its CLOSED registry state and inaccessible submission page; LUNA25 and PUMA have CLOSED registry states. Keep them as leads pending explicit confirmation rather than advertise current entry.

## Review procedure

1. Open every primary source above and record newly announced, registration-open, data-released, submission-open, and newly closed challenges. For MICCAI, check both the conference list and the SIG Challenges catalogue; the latter captures workshop and satellite events that may not be prominent on the conference hub.
2. Follow each candidate to its **official organizer or host page**. Capture its exact URL, status, key dates, platform, modality, task, and any access restriction.
3. De-duplicate a cluster of sub-challenges only when it has a shared registration and schedule; otherwise list tracks separately.
4. Keep `live` for continuous leaderboards, `open` for an active registration or submission phase, and `upcoming` for an announced challenge with no active participation phase. Do not call a data release alone “open” unless registration or participation is actually available.
5. Mark a phase date as estimated only when the official page does not state an exact date. Preserve each official page in `sources`, reference it from every status-driving phase through `sourceIds`, and set `lastVerifiedISO` only after the record has actually been checked.
6. Model registration, development, validation, testing, final submission, papers, results, and events as separate `phases`; conference dates must not stand in for unknown participation deadlines.
7. Regenerate `data/challenges.js`, validate `data/challenges.json` against `data/challenges.schema.json`, update the visible last-updated count/date, preview the tracker and timeline, then commit the dataset, documentation, and generated copy together.

## Review log

### 2026-10-26 — broader keywords and deployment audit

- Added **7 records**, bringing the local catalog to **80**: **Cell Tracking/Linking**, **DRAC**, **AMOS22**, and four announced 2027 ImageCLEF tasks (**Caption**, **GANs**, **MEDVQA-GI**, **MEDIQA-MAGIC**). The first three support ongoing submissions; the latter four remain upcoming with null dates and no claim of current dataset access.
- Recorded DRAC's per-task image counts and **2.239 GB** archive, AMOS22's **600 scans / 15 organs / 24.234 GB**, and Cell Tracking's **20 dataset collections**, account process, executable requirements and data-use restrictions.
- Added Cell Tracking, ImageCLEF and AI4Life to the source plan, plus the keyword matrix above. ACDC explicitly closed submissions at the end of 2022. LUNA25, PUMA, MIDOG2025, RETOUCH and AI4Life leads were not promoted as newly open without consistent current evidence.
- Removed the relative “today” wording from FaceVitals; **25 Oct** entry has passed. Derived local status on **26 Oct**: **10 live, 13 open, 12 upcoming/awaiting confirmation, 45 closed**. **45** records are fresh; **35** still have older status checks.
- Fetched the public GitHub Pages JSON: **54 records**, last modified **29 Aug 2026**. The local file has **80** and differs from production. No commit, push or deployment was performed during this review.
- Full sources and remaining gaps: [expanded-discovery evidence](EVIDENCE.md#26-october-2026-expanded-discovery-and-deployment-check).

### 2026-10-25 — gap-fill follow-up

- Added **10 more records**: **FaceVitals 2027**, **PRISM-AI**, **SIPAIM TEM**, **PANTHER**, **TrackRAD**, **SynthRAD2025**, **ULS23**, **PI-CAI**, **NeurIPS CellSeg**, and **ToothFairy3**. Current catalog: **73**; current derived status: **7 live, 14 open, 7 upcoming/awaiting confirmation, 45 closed**.
- Enriched **20 existing records** with 48 substantive field changes, including cohort counts, four previously unknown dataset sizes, verified cash awards, access restrictions, repaired organizer links and exact FETUS/ISLES schedules. Each new fact has its organizer, dataset or publication source attached.
- Separated **evaluation-only**, **registration-closed**, and **not-yet-released** data access from unknown access. A future data release is not currently downloadable, and a hidden evaluation cohort is not a public training set.
- Inspected the rendered SIPAIM organizer portal: entry is open through **9 Nov**, but its loaded protocol says **13 Nov** final while the conference/upload panel says **24 Nov**. Kept final date null instead of exporting an unreliable cutoff. PRISM-AI is open only to previously registered teams. FaceVitals team entry closes **25 Oct** and has undergraduate/SPS membership requirements.
- Distinguish original prize competitions from ongoing evaluation: post-challenge PANTHER, TrackRAD, SynthRAD, PI-CAI, CellSeg, ULS23 and ToothFairy3 do not advertise new cash rounds. Operational platform windows are labelled as such.
- Exposed dataset counts and expandable size/input/platform/source details in the tracker, table and comparison; source labels are escaped and only HTTPS source links are rendered. No new dependencies.
- Checked all 264 public Grand Challenge registry entries for discovery; registry status alone was not used to reopen completed competitions. Codabench phase requests still time out, and several gated dataset pages remain inaccessible. Unverified sizes and counts stay explicit rather than estimated.
- Full sources, remaining gaps, and checks are recorded in the [follow-up evidence](EVIDENCE.md#25-october-2026-gap-fill-follow-up).

### 2026-10-25

- Added **9 records**: **FeTS 2027**, **TriALS-Report 2027**, **BIG-MRI**, **OWL**, **TopBrain V2**, **JRC 2027**, **Cell Map DREAM**, **UMUD**, and the completed **MedVidU 2026** competition for ECCV coverage. Total: **63**.
- Verified **26 records** against current organizer/platform evidence, preserving the remaining records' older verification stamps. Current status distribution: **4 live, 7 open, 7 upcoming or awaiting confirmation, 45 closed**.
- Confirmed winter participation in UMUD, OWL, Light My Cells 2, JRC, Cell Map DREAM and COBRA; CLEAR-EC Phase II is restricted to advancing teams. Captured JRC's society-membership requirement, UMUD's CHF prize currency, and OWL's publication/data constraints.
- Added CHIMERA-Agent's announced November Round 2 without inventing exact dates. FeTS/TriALS dates come from accepted registered designs and remain planned; BIG-MRI still warns of delayed access. TopBrain's overall window is not used as a confirmed submission deadline.
- Closed stale undated phases for CMRxRecon, PENGWIN, autoPET V, HEADLINE, TopAneu and UUSIVC; replaced SELMA3D's postponed schedule with its completed Aug–Sep phases. Corrected DoseRAD's competition deadline to 31 Aug; its planned Oct–Dec post-challenge phase awaits confirmation. ATM26 and ReXGrounding have confirmed post-challenge benchmarks.
- Learn2Reg's current Codabench phases could not be verified; retained its previous verification date and changed the participation state to awaiting confirmation instead of advertising new-team entry.
- CVPR 2027 currently publishes a **workshop organizer** call, not a verified medical participant competition. ISBI 2027 challenge notifications are scheduled for **16 Nov**; Light My Cells 2 says submitted, not accepted. Inspected ECCV 2026 medical workshops have finished. AAPM still says 2026–27 announcements are forthcoming; RSNA Knee submissions closed **22 Oct**.
- Kept source conflicts and incomplete leads in the [evidence log](EVIDENCE.md#25-october-2026-refresh). Schedule notes now appear in tracker cards, table, comparison and schedule agenda.

### 2026-08-15

- Re-swept the official MICCAI, MICCAI SIG, Grand Challenge, Codabench, AAPM, CVPR, RSNA, Kaggle, ISBI and Synapse sources, and added MIDL to the recurring sweep after finding an announced 2027 challenge.
- Added **10 official-source records**: **FoundUS**, **UUSIVC**, **AMPLIFAI**, **CATHACTION**, **CHIMERA-Agent**, **MultiSAT**, **SurgVU26**, **COBRA2026**, **DALPHIN**, and **Light My Cells 2**. Eight are open as of this review, DALPHIN is a rolling benchmark, and Light My Cells 2 is announced for a 21 Sep launch.
- Confirmed that the **RSNA Knee Abnormality Detection AI Challenge** is now live on Kaggle, with entry/team formation through 15 Oct and final submissions due 22 Oct; updated its scope to more than 5,000 MRI exams from 19 sites and its $77,000 prize pool.
- Expanded **FOMO26** with separate validation (21 Aug) and final-test submission (30 Aug) deadlines, and corrected **ODIN** to its official 17 Aug testing deadline and published per-track prizes.
- Rolled passed phases forward for **SynthOCT**, **TREAT-MMTB**, and **TopAneu**. Derived catalogue status is now **2 live, 30 open, 2 upcoming, and 20 closed**.
- Rechecked but deferred **LUNOVO26**, **TopBrain2026**, **BIG-MRI**, and schedule-less MICCAI/EndoVis announcements. Their official pages still do not publish a sufficiently actionable participation schedule, so they remain watchlist candidates rather than catalogue entries.

### 2026-07-31

- Re-swept MICCAI, MICCAI SIG, Grand Challenge, Codabench, AAPM, RSNA, Kaggle, ISBI and Synapse sources. **36 of 44** records were re-confirmed against their official pages; **8 retained their 23 July stamp** because their pages could not be re-read this cycle (BraTS on Synapse, five Codabench single-page apps, and the **CXR-LT** and **EndoUC** GitHub sites, which now return 404).
- Cleared both previously-blocked **RSNA** records: RSNA's official pages confirm the **Intracranial Aneurysm** challenge closed 14 Oct 2025 (dataset now gated via RSNA MIRA under a non-commercial licence) and that the **Knee MRI** challenge has still not launched with no active registration, so it stays `upcoming`.
- Corrected **DoseRAD**: the official timeline shows training/validation and final testing ending **15 Aug** (not 24 Aug), final testing opened 16 Jul, and posts a delay on the preliminary validation phase.
- Corrected **TREAT-MMTB**: the internal-phase submission closed **24 Jul**; only the application window runs to 31 Jul, with the external Docker phase 1–20 Aug.
- Marked passed phases complete for **BraTS** (final Docker closed 30 Jul), **HECKTOR** (testing closed 25 Jul) and **AIMS-TBI26** (submissions and paper closed 23 Jul); **ATM26**'s final test phase opened 30 Jul.
- Added a **CMRxRecon** workshop-paper deadline (30 Jul) surfaced on the official page.
- Added **CLEAR-EC** (corneal-endothelium regression, standalone Grand Challenge) as `open`: registration is open and Phase I submissions are due 14 Sep 2026.
- Identified **Lung Nodule Volumetry 2026 (LUNOVO26)** as a Grand Challenge candidate with an open debug leaderboard, but held it back because no participation schedule is published yet.

### 2026-07-23

- Checked MICCAI, Grand Challenge, Codabench, AAPM, CVPR-related Codabench pages, RSNA, Kaggle, ISBI and Synapse sources.
- Reclassified **ATM26** as `open`: the official Grand Challenge registration page confirms that teams can join, sign the data-use agreement, and receive dataset access after approval.
- Added **SELMA3D 2026** as `upcoming`: the official page confirms released training data and a postponed preliminary submission phase.
- Added the **AAPM Grace Challenge** as `closed`: AAPM’s official schedule states that its 2026 competition phase ended 1 May.
- Added **SynthOCT 2026** as `open`: the official SASHIMI/MICCAI challenge site reports an active platform and a 14 Aug final-submission deadline.
- Added the MICCAI SIG Challenges catalogue to the mandatory sweep so smaller workshop and satellite challenges are reviewed alongside the main MICCAI list.
- Added three active EndoVis/MICCAI sub-challenges after checking their individual official pages: **RARE26** (open development through 31 Aug), **iMED2026** (public validation; final Docker due 1 Sep), and **TREAT-MMTB** (applications and internal phase through 31 Jul).
- Extended the individual-page sweep with three more active MICCAI challenges: **BIC-MAC** (Codabench registration and submissions through 15 Aug), **ORena SAVE FOCUS** (live pre-evaluation through 1 Sep; final Docker due 8 Sep), and **TopAneu** (Grand Challenge enrolment, sanity check from 1 Aug and test phase through 5 Sep).
- Added six official-source records found during a gap comparison against the MICCAI and ISBI programmes: **MRIxFields** (registration and Docker submissions through 10 Sep), **EchoRisk** (final Docker due 20 Aug), **DoseRAD** (training and testing through 24 Aug), **ReXGrounding** (open registration and submissions with no published close date), **MAMA-Synth** (completed final test phase), and **FETUS 2026** (completed ISBI challenge).
- Compared the catalogue with the official MICCAI 2026 programme and identified additional accepted challenges whose organizer schedules still need individual verification before inclusion.

The review is intentionally conservative: a platform listing without an active official phase is not counted as a new live challenge.
