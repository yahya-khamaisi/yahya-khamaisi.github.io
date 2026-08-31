# Yahya Khamayseh — Portfolio

Personal site: selected projects, skills, experience, and research.

**Live:** https://dr-yahya.github.io

## Stack

- Vite + React + TypeScript
- React Router (with a GitHub Pages SPA fallback)
- Plain CSS (no UI kit)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content

Update copy in `src/data/content.ts` (profile, projects, skills, experience,
publications) and `src/data/systems.ts` (the capability graph). Per-route
`<title>` / meta lives in `pageMeta` in `content.ts`.

The CV PDF at `public/Yahya-Khamayseh-CV.pdf` is generated from the same content
— regenerate it if you change roles or dates.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages. In the repo: **Settings → Pages → Source: GitHub
Actions** (one-time).

`public/404.html` + a snippet in `index.html` handle deep-link refreshes on
Pages ([spa-github-pages](https://github.com/rafgraph/spa-github-pages)).
