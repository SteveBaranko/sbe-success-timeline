# Built Here — South Bend–Elkhart Success Stories

A timeline of founder-built companies from the South Bend–Elkhart region
that later sold, merged, or exited — built with React, TypeScript, and Vite.

## What's here

- **Founder spotlight** (top of page) — auto-rotating carousel of founders
  with a short blurb, pauses on hover, click dots/arrows to navigate.
- **Timeline** — a horizontal ruler from 1940 to today. Each dot is a
  company positioned by founding year, color-coded by industry. Hover for
  a quick peek, click to pin the detail card open (founder, exit history,
  deal terms where disclosed). Companies with unconfirmed founding years
  are listed separately below the ruler rather than guessed at.
- **About section** — placeholder for the region/resources copy you
  mentioned wanting to develop later.

All company data lives in `src/data/companies.ts`, generated from your
`Success_Stories_With_Founder_Research.xlsx` merged with industry vertical
data pulled from `SearchExport (4).xlsx` (D&B Hoovers export), matched by
company name. A few companies (US Rod, LOOK Trailers, CRCL Solutions)
weren't in the D&B export and have no industry match from that source —
they're still on the timeline with the industry categorized by hand from
context.

## Local development

```bash
npm install
npm run dev
```

## Editing the data

Open `src/data/companies.ts`. Each company has:

- `foundedYear` — `null` if not yet confirmed (never fabricated; shows as
  "???" / lives in the "not yet confirmed" row instead of the main ruler)
- `founderNames` / `founderBlurb` — powers both the spotlight carousel and
  the timeline detail card. Leave `founderNames` as `null` to exclude a
  company from the spotlight rotation (it'll still appear on the timeline)
- `exits` — array, since a couple of companies (Press Ganey, Tire Rack)
  had two separate exit events

Industry colors are in `src/data/industryColors.ts` — add an entry there
if you add a new industry category.

## Deploying to GitHub Pages

1. Create a new GitHub repo. If you don't name it `sbe-success-timeline`,
   update the `base` in `vite.config.ts` and the `homepage` in
   `package.json` to match your repo name.
2. Push this project to that repo (`main` branch).
3. In the repo's Settings → Pages, set Source to **GitHub Actions**. The
   included workflow (`.github/workflows/deploy.yml`) will build and
   deploy automatically on every push to `main`.

Alternatively, deploy manually without the Actions workflow:

```bash
npm run deploy
```

This uses the `gh-pages` package to push the built `dist/` folder to a
`gh-pages` branch — make sure Pages is set to serve from that branch
instead if you go this route.

## Next steps (not built yet)

- Body copy about the region, startup resources, and support
  organizations for the About section
- Possibly a map view alongside the timeline (lat/lng is already in the
  data for each company)
