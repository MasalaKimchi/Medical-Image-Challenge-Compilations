# Medical Image Challenge Compilations

A curated, regularly refreshed compilation of **medical-image analysis challenges and competitions** — segmentation, classification, registration, reconstruction, report generation and beyond — spanning MICCAI, ISBI, CVPR, RSNA, Kaggle, Grand Challenge, AAPM and Codabench.

The project ships two self-contained, interactive HTML views built on the same underlying dataset:

| View | What it does |
|------|--------------|
| **[Challenge Tracker](https://masalakimchi.github.io/Medical-Image-Challenge-Compilations/tracker/)** | A filterable catalog with derived live status, next actions, source freshness, a four-item shortlist, comparison, and calendar export. |
| **[Challenge Schedule](https://masalakimchi.github.io/Medical-Image-Challenge-Compilations/timeline/)** | A reader-friendly agenda and phase timeline covering registration, development, validation, testing, submissions, results, and events. |

A lightweight [**landing page**](https://masalakimchi.github.io/Medical-Image-Challenge-Compilations/) links to both.

Know a challenge we should track? [Suggest it](https://github.com/MasalaKimchi/Medical-Image-Challenge-Compilations/issues/new?template=suggest-challenge.yml).

## Coverage snapshot

Catalog and status snapshot updated **26 October 2026**. This release expands coverage from **54 to 80 records**, adds dataset/source details and corrects stale participation dates.

| Venue family | Challenges tracked |
|---|---:|
| MICCAI | 45 |
| Standalone | 10 |
| ISBI | 9 |
| CVPR | 3 |
| RSNA | 2 |
| MIDL | 1 |
| ECCV | 1 |
| WACV | 1 |
| JRC | 1 |
| ICASSP | 1 |
| SIPAIM | 1 |
| NeurIPS | 1 |
| ImageCLEF | 4 |
| **Total** | **80** |

The 25 October discovery and gap-fill passes added **19 records** and enriched **20 existing entries** with verified cohort counts, storage, awards, access rules and corrected dates. The 26 October expansion added **7 more**: Cell Tracking/Linking, DRAC, AMOS22, and the announced 2027 ImageCLEF Caption, GANs, MEDVQA-GI and MEDIQA-MAGIC challenges. **45 of 80** records have fresh status verification; **35 retain older status checks**. This is broad coverage, not an exhaustive census. The [source and keyword plan](data/SOURCES.md#discovery-keywords-and-scope) records search areas and exclusions.

Derived status: **10 live, 13 open, 12 upcoming or awaiting confirmation, and 45 closed**. Ongoing benchmark submissions do not reopen their original cash-prize competitions. PRISM-AI and CLEAR-EC are restricted to previously registered or advancing teams. Learn2Reg and DoseRAD availability remains unconfirmed. All four ImageCLEF 2027 task schedules are TBA. See the [latest evidence](data/EVIDENCE.md#26-october-2026-expanded-discovery-and-deployment-check) for sources, rejected leads and deployment status.

Near-term actions include PRISM-AI testing (**9 Nov**, registered teams), SIPAIM TEM entry (**9 Nov**, conflicting final dates), UMUD (**14 Nov**), OWL (**30 Nov**), Light My Cells 2 (**13 Dec** final evaluation), and JRC entry (**18 Dec**). FaceVitals entry closed **25 Oct**; its future rounds are for registered teams. Cell Map DREAM closes **1 Feb 2027** and COBRA **15 Feb**. BIG-MRI still warns of delayed access; the MICCAI 2027 FeTS/TriALS schedules remain planned. No upcoming CVPR or ECCV participant competition was verified.

## The Tracker

The tracker presents 80 challenges as filterable cards. Highlights include:

- **Derived status filters** — live benchmarks, active phases, upcoming calls, and closed events, calculated from structured phase dates.
- **Dataset details and evidence** — case counts appear on cards; expand “Dataset & sources” for verified size, input format, platform, and direct source links. Access distinguishes public data, approval requirements, closed registration, future release, and organizer-held evaluation.
- **Task & modality filters** — narrow by task type (segmentation, classification, registration, reconstruction, report generation, …) and imaging modality (MRI, CT, PET/CT, X-ray, histopathology, ultrasound, …).
- **Venue & prize tags** — MICCAI, ISBI, CVPR, RSNA, Grand Challenge; cash-prize vs. recognition.
- **Shortlist and compare** — save up to four challenges locally, compare their practical details, and export exact deadlines to a calendar.
- **Source freshness** — see when status-driving information was last reviewed and follow the official source directly.
- **Rough compute planner** — an optional, confidence-labelled heuristic kept below the discovery experience.
- **Light / dark theme.**

## The Timeline

The schedule renders the same structured phase data as either a compact agenda or a zoomable timeline grouped by venue family. It adds:

- A live **today** marker, next-action strip, and 3/6/12-month or all-date ranges.
- Separate phase bars for registration, development, validation, testing, submission, results, and events.
- An agenda-first mobile view, plus explicit rolling and TBA sections.

## Data & accuracy

Dates, phases and evidence are compiled from official organizer and platform pages and refreshed bi-weekly using the documented [source sweep](data/SOURCES.md). Status is derived locally from inclusive phase dates, while freshness labels make unverified or overdue records explicit. A platform listing is not enough to mark a challenge as open: the relevant organizer or host page must confirm an active participation phase. Always confirm details on each official page before relying on them—registration windows and deadlines shift.

## License

Released under the [MIT License](LICENSE). © 2026 JustinNKim.
