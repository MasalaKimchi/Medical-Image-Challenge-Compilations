# Medical Image Challenge Compilations

A curated, regularly refreshed compilation of **medical-image analysis challenges and competitions** — segmentation, classification, registration, reconstruction, report generation and beyond — spanning MICCAI, ISBI, CVPR, RSNA, Kaggle and Grand Challenge.

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
├── tracker/
│   ├── index.html      # Challenge Tracker (filterable catalog + GPU estimator)
│   └── thumbnail.png   # Preview image
├── timeline/
│   ├── index.html      # Challenge Timeline (date-axis swimlanes)
│   └── thumbnail.png   # Preview image
├── LICENSE             # MIT
└── README.md
```

Each `index.html` is a **single self-contained file** — all CSS, JavaScript and challenge data are inlined, with no build step and no external dependencies. Open any file directly in a browser, or serve the folder with any static host.

## The Tracker

The tracker presents ~28 challenges as filterable cards. Highlights include:

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

Dates, deadlines and statuses are **best-effort estimates** compiled from public challenge announcements and are refreshed periodically. Always confirm details on each challenge's official page before relying on them — registration windows and deadlines shift.

## Contributing

Because the data lives inline in each `index.html`, updates are made by editing the challenge entries directly in the relevant file. When adding or changing a challenge, update both the tracker and the timeline so the two views stay in sync.

## License

Released under the [MIT License](LICENSE). © 2026 JustinNKim.
