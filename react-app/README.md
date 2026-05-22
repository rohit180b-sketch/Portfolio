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

Recommended: deploy the `dist` folder from the Vite build. Choose your platform:

### Vercel (Recommended)

1. Push your code to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **Add New** → **Project**.
4. Select your repository and import it.
5. Vercel will auto-detect the build command and output directory from `vercel.json`.
6. Click **Deploy**.

**That's it!** No additional configuration needed. The `vercel.json` file handles build settings.

### Netlify

1. Connect your GitHub repo to [netlify.com](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy.

The `netlify.toml` file also configures this for you.

### GitHub Pages

Set the base path and deploy:

```bash
cd "react-app"
VITE_BASE='/my-repo/' npm run build
npm install --save-dev gh-pages
npm run deploy:gh-pages
```

Replace `my-repo` with your actual repository name.

### Manual Deploy

Build locally and upload the `dist` folder to any static host:

```bash
npm run build
# Upload dist/ folder to your host
```
