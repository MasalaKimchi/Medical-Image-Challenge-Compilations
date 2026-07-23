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

Last updated **23 July 2026**.

| Venue family | Challenges tracked |
|---|---:|
| MICCAI | 26 |
| ISBI | 8 |
| Standalone | 4 |
| CVPR | 3 |
| RSNA | 2 |
| **Total** | **43** |

As of 23 July 2026, **41 of 43** records have current official-source evidence. The two blocked RSNA records remain visibly unverified. Derived status at that review date: **1 live, 24 open, 2 upcoming, and 16 closed**.

## The Tracker

The tracker presents 43 challenges as filterable cards. Highlights include:

- **Derived status filters** — live benchmarks, active phases, upcoming calls, and closed events, calculated from structured phase dates.
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
