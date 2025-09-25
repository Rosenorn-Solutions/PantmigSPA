# PantMig – Next.js app

PantMig is a Danish marketplace that connects people who have lots of recyclable cans and bottles (pant) with local collectors who will return them. Built with the Next.js App Router, Tailwind CSS, and TypeScript.

## Features

- Danish localization across pages and components (html lang="da")
- “Sådan virker det” page with step-by-step flow
  - Primary route: `/how-it-works`
  - Danish alias: `/saadan-virker-det`
- Theming and branding
  - Brand color set to green (`#22c55e`)
  - Light/dark logos in `public/images/logo/`
  - Theme switcher powered by `next-themes`
- Sections: Hero, Features, Video (with modal), Brands, About, Testimonials, Pricing, Blog, Contact
- Open Graph/Twitter social image
  - Dynamic OG image at `/og` (generated via `next/og`)
  - Global metadata wired with `metadataBase: https://pantmig.dk`
- App Router structure (Next.js 15), React 19, Tailwind CSS v4, TypeScript

## Tech stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
- next-themes

## Getting started

Prerequisites:

- Node.js 18.17+ (recommended) or newer
- npm

Install dependencies:

```powershell
npm install
```

Run the development server:

```powershell
npm run dev
```

Then open http://localhost:3000 in your browser.

Create a production build:

```powershell
npm run build
```

Start the production server (after build):

```powershell
npm run start
```

## Project structure

- `src/app/` – App Router pages, layouts, and routes
  - `page.tsx` – Home page
  - `how-it-works/page.tsx` – “Sådan virker det” (How it works)
  - `saadan-virker-det/page.tsx` – Danish alias re-export
  - `og/route.tsx` – Dynamic Open Graph image generator (1200×630)
  - `layout.tsx` – Root layout and global metadata
  - `providers.tsx` – Theme provider (next-themes)
- `src/components/` – UI components (Hero, Features, Video, Testimonials, etc.)
- `public/images/` – Static assets (logos, images, icons)
- `src/styles/index.css` – Tailwind CSS (v4) and custom variables

## Customization

### Brand color

Change the primary brand color in `src/styles/index.css` by updating the CSS variable:

```css
:root {
  --color-primary: #22c55e; /* green */
}
```

### Logo and favicon

- Replace `public/images/logo/logo.svg` (dark theme) and `public/images/logo/logo-2.svg` (light theme) with your assets.
- App icon: `src/app/icon.svg` is referenced in metadata. You can replace or extend with additional sizes if needed.

### Theme toggler

- The theme provider lives in `src/app/providers.tsx`.
- Default theme is set to `dark`. To default to light or follow the OS theme:

```tsx
// providers.tsx
<ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
  {children}
</ThemeProvider>
```

### Open Graph/Twitter

- Global metadata in `src/app/layout.tsx` includes `metadataBase: https://pantmig.dk` and uses `/og` as the default image.
- Override per-page OG/Twitter values by exporting `metadata` from the page file, for example:

```tsx
// src/app/about/page.tsx
export const metadata = {
  title: "Om PantMig – Dansk pant-markedsplads",
  description: "Kort beskrivelse…",
  openGraph: {
    title: "Om PantMig – Dansk pant-markedsplads",
    description: "Kort beskrivelse…",
  },
  twitter: {
    title: "Om PantMig – Dansk pant-markedsplads",
    description: "Kort beskrivelse…",
  },
};
```

## Deployment

PantMig works great on Vercel or any Node hosting that supports Next.js 15.

- Build command: `next build`
- Start command: `next start` (or use Vercel’s serverless/edge defaults)
- Ensure the domain is set to `https://pantmig.dk` so OG images resolve correctly (already set via `metadataBase`).

## Troubleshooting

- Dev server exits immediately (port in use)
  - Another process may be listening on port 3000. Either stop it or run `npm run dev -- -p 3001`.
- Node version mismatch
  - Use Node 18.17+ for Next.js 15. Check with `node -v`.
- Stale cache
  - If something looks off after refactors, clear the build cache:

```powershell
Remove-Item -Recurse -Force .next
```

- OG image route is dynamic by design
  - `/og` uses the Edge runtime and is server-rendered on demand. All other pages are pre-rendered static unless changed.

## License

This project includes a `LICENSE` file at the repository root.
