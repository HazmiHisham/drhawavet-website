# DRHAWAVET Clinic — Website Prototype

Premium veterinary clinic frontend prototype built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and Lucide icons.

## Getting Started

```bash
cd drhawavet-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Routes

- `/` — Landing page with all sections
- `/booking` — Standalone booking page
- `/shop` — Shop (coming soon)
- `/admin/login` — Admin login (demo)
- `/admin` — Admin dashboard

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- Lucide React

## Features

- Sticky transparent navbar with scroll effect
- Dark mode toggle
- Scroll reveal animations
- Booking form with success modal + toast (no backend)
- Testimonials carousel
- FAQ accordion
- Floating WhatsApp button
- Back to top button
- Fully responsive, mobile-first design

## Mock Data

All branch, service, and FAQ data lives in `src/lib/constants.ts`.

## Note

This is a **frontend-only prototype**. No backend or database is connected.

## Cloudflare Deploy

This project uses [OpenNext for Cloudflare](https://opennext.js.org/cloudflare). Config is committed in `wrangler.jsonc` and `open-next.config.ts`.

**Cloudflare dashboard settings:**

| Setting | Value |
|---------|-------|
| Build command | `npm run deploy` |
| Root directory | `drhawavet-web` (if repo root is parent folder) |

Or split build/deploy:

| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |

The worker name must be **`drhawavet-website`** — it must match the `WORKER_SELF_REFERENCE` service in `wrangler.jsonc`. A mismatch (e.g. `drhawavet-web` from `package.json`) causes deploy error `10143`.

Local preview: `npm run preview`

