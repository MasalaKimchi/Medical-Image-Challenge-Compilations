# Medical Image Challenge Compilations

A curated, regularly refreshed compilation of **medical-image analysis challenges and competitions** — segmentation, classification, registration, reconstruction, report generation and beyond — spanning MICCAI, ISBI, CVPR, RSNA, Kaggle, Grand Challenge, AAPM and Codabench.

The project ships two self-contained, interactive HTML views built on the same underlying dataset:

| View | What it does |
|------|--------------|
| **[Challenge Tracker](tracker/index.html)** | A filterable catalog of every tracked challenge, with status, task type, modality, prize/venue tags, and a built-in GPU-requirement estimator. |
| **[Challenge Timeline](timeline/index.html)** | A Gantt-style view placing every challenge on a single date axis (registration/data release → deadline), grouped into swimlanes by venue and coloured by status, with a live `TODAY` marker. |

A lightweight **[landing page](index.html)** links to both.

## Live pages

If GitHub Pages is enabled for this repository (Settings → Pages → deploy from `main`, root), the views are served at:

- `https://masalakimchi.github.io/Medical-Image-Challenge-Compilations/` — landing page
- `.../tracker/` — the tracker
- `.../timeline/` — the timeline

## Repository structure

```
.
├── index.html          # Landing page linking to both views
├── data/
│   ├── challenges.json # Canonical challenge dataset (edit this)
│   └── challenges.js   # Same data as window.CHALLENGES, loaded by both pages
│   └── SOURCES.md      # Bi-weekly source checklist and review log
├── tracker/
│   ├── index.html      # Challenge Tracker (filterable catalog + GPU estimator)
│   └── thumbnail.png   # Preview image
├── timeline/
│   ├── index.html      # Challenge Timeline (date-axis swimlanes)
│   └── thumbnail.png   # Preview image
├── favicon.svg
├── .nojekyll           # Serve files as-is on GitHub Pages
├── LICENSE             # MIT
└── README.md
```

Both views share **one source of truth**: `data/challenges.js` (which sets `window.CHALLENGES`) is loaded before each page's app script, so the tracker and timeline can never drift apart. `data/challenges.json` holds the identical data in plain JSON for editing and future automation. Each `index.html` carries only its own CSS and JavaScript — no build step, no external dependencies. Open any page directly in a browser, or serve the folder with any static host.

## The Tracker

The tracker presents 31 challenges as filterable cards. Highlights include:

- **Status filters** — live benchmarks, open competitions, upcoming calls, and closed events.
- **Task & modality filters** — narrow by task type (segmentation, classification, registration, reconstruction, report generation, …) and imaging modality (MRI, CT, PET/CT, X-ray, histopathology, ultrasound, …).
- **Venue & prize tags** — MICCAI, ISBI, CVPR, RSNA, Grand Challenge; cash-prize vs. recognition.
- **GPU-requirement estimator** — a rough VRAM/tier estimate derived from dataset size and modality, to help gauge the compute needed to compete.
- **Light / dark theme.**

## The Timeline

The timeline renders the same dataset on a **Jul 2025 – Dec 2026 date axis**, grouped into swimlanes by venue family (MICCAI / ISBI / CVPR / RSNA / Standalone) and coloured by status. It adds:

- A live **`TODAY`** marker (the pink line) and a next-deadline countdown strip.
- **Dashed bars** for estimated / TBA dates.
- Rolling-benchmark fades for continuously-open leaderboards.

## Data & accuracy

Dates, deadlines and statuses are compiled from official organizer and platform pages and are refreshed bi-weekly using the documented [source sweep](data/SOURCES.md). A platform listing is not enough to mark a challenge as open: the relevant organizer or host page must confirm an active registration or submission phase. Always confirm details on each challenge's official page before relying on them — registration windows and deadlines shift.

## Updating the data

Every refresh is a **single-file edit** — both views read the same dataset:

1. Edit `data/challenges.json` (add/modify a challenge object).
2. Regenerate the JS copy so the pages pick it up:
   ```bash
   python3 -c "import json,pathlib; d=pathlib.Path('data/challenges.json').read_text(); pathlib.Path('data/challenges.js').write_text('window.CHALLENGES = '+d.rstrip()+';\n')"
   ```
   (Or edit `data/challenges.js` directly — it's just `window.CHALLENGES = [ … ];`.)
3. Follow the [bi-weekly source sweep](data/SOURCES.md), update the visible total/date in `index.html` and `tracker/index.html`, then preview both views.
4. Commit and push; GitHub Pages redeploys automatically.

Each challenge object supports fields such as `name`, `venue`, `platform`, `url`, `status` (`live`/`open`/`upcoming`/`closed`), `taskType`, `modality`, `deadlineISO`, `startISO`/`endISO`, `prizeType`, and `venueFamily`. Copy an existing entry as a template.

To preview locally, run a static server from the repo root and open `http://localhost:8000/`:
```bash
python3 -m http.server 8000
```

## License

Released under the [MIT License](LICENSE). © 2026 JustinNKim.
