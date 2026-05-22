# React app (Vite)

This is a Vite + React version of your portfolio, migrated from the root project into the `react-app` folder.

## Local development

```bash
cd "react-app"
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Build production bundle

```bash
cd "react-app"
npm run build
```

The production files are generated under `react-app/dist`.

## Deploy / copy to root

If you want to replace the existing root website with the built React app, copy the contents of `react-app/dist` into the workspace root:

```bash
cd "react-app"
npm run build
robocopy dist .. /E /NFL /NDL /NJH /NJS /NC /NS /NP
```

> Note: this assumes the image files (`profile pic1.jpg`, `Pic2.JPG`) are available in the project root or in `react-app/public` before building.

## Notes

- The site uses `typed.js` for the animated headline text.
- Boxicons are loaded from the CDN in `react-app/index.html`.
- If you want to keep the old static site, back up the root files before copying the build output.

## Deploying

Recommended: deploy the `dist` folder from the Vite build. Two common options:

- Netlify / Vercel: Connect the repo and use build command `npm run build` and publish directory `dist`.
- GitHub Pages: set `VITE_BASE` to your repo name (e.g. `/my-repo/`) and run:

```bash
cd "react-app"
npm install --save-dev gh-pages
npm run deploy:gh-pages
```

Notes:
- You can set `VITE_BASE` in CI or locally: `VITE_BASE='/my-repo/' npm run build`.
- For Netlify, no base path is required; just use `npm run build`.

If you'd like, I can add a `netlify.toml` or automate GitHub Actions for deploy.
