# Minecraft Server Website + Android APK

A static website (home page + store) with a live background bubble animation,
built with Vite, deployable to GitHub Pages or any static host, and packaged
as an Android APK with Capacitor.

## Project layout

```
site/                 The website (index.html, store.html, 404.html, JSON config)
  config.json         Server name, IP, Discord link
  site.json           Navbar, pages on/off, homepage extras
  store.json          Store items, prices, page text and colours
src/entry.ts          Empty Vite entry (the site itself is plain HTML in site/)
vite.config.ts        Build config (base './' for any hosting)
capacitor.config.ts   Android app config (appId, appName)
resources/            App icon and splash source images (replace with your art)
.github/workflows/    deploy-pages.yml (website) and build-apk.yml (APK)
vercel.json           Store URL rewrites for Vercel
reference/            Your reference screen recording (not used by the site)
```

Edit the site by changing the files in `site/`. Prices, perks and store text are
in `site/store.json`; server name and IP in `site/config.json`.

## Run locally

Requirements: Node.js 20+ (22 recommended).

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build the website

```bash
npm run build      # output goes to dist/
npm run preview    # check the built site at http://localhost:4173
```

## Deploy to GitHub Pages (automatic)

1. Push this project to a GitHub repository, branch `main`.
2. In the repository go to **Settings → Pages → Build and deployment → Source**
   and choose **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy-pages.yml`. Your site will
   be at `https://YOUR_USERNAME.github.io/YOUR_REPO/`.

Because `base` is `./`, the site works from a repo sub-path with no changes.
Links like `/store/ranks` are handled by `site/404.html`, which redirects to
`store.html?page=ranks`, so refreshing a store page does not show a 404.

## Deploy to another host

Netlify, Cloudflare Pages, Vercel, or any static host:

- Build command: `npm run build`
- Publish / output directory: `dist`

On Vercel, `vercel.json` in the repo root adds the `/store/...` rewrites.

## Build the Android APK

The APK is built by GitHub Actions (a Linux machine with the Android SDK), so
you do not need Android Studio.

1. Make sure the repository is on GitHub (step above).
2. Replace `YOUR_USERNAME/YOUR_REPO` in the **Build Android APK** link at the
   bottom of `site/index.html` with your repository path.
3. Go to the repository's **Actions** tab, choose **Build Android APK**, click
   **Run workflow**, type the file name (for example `MyApp`) and press **Run**.
4. When the run finishes (about 5–10 minutes), open the run and download the
   artifact named after your file. Unzip it and you get `MyApp.apk`.
5. Copy the APK to an Android phone and install it. You may need to allow
   "Install unknown apps" for the app you installed the file from.

The APK opens the full website inside the app, with no address bar.

Before publishing:

- Set your own `appId` in `capacitor.config.ts` (for example `com.yourname.yourapp`)
  and the `appName` you want under the icon.
- Replace `resources/icon.png` (1024×1024) and `resources/splash.png`
  (2732×2732) with your own art. The current files are placeholders. The build
  generates all Android icon sizes from them.
- The APK built here is a **debug** build, which installs directly but is not
  meant for the Play Store. A signed release build (AAB for Play Store) needs
  a keystore; add it when you are ready to publish.

## Local APK build (optional, needs Android Studio)

```bash
npm install
npm run android:init     # first time: builds the site and creates android/
npm run android:open     # opens the project in Android Studio; press Run
```

## Important notes

- Some images referenced by the site (`logo.jpg`, `assets/world-map.webp`,
  `assets/coin.png`) and `secret.json` (live chat) were not in the uploaded
  zip. Copy them into `site/` (keeping the same paths) so they load.
  Missing images show as broken until then.
- The live chat card reads `secret.json`; if the file is missing, the card just
  stays empty and the rest of the site works.
