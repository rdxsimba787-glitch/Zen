import {defineConfig} from 'vite';

// The website itself is plain HTML/CSS/JS in site/. Vite copies everything in
// site/ to dist/ unchanged (publicDir), so the pages and their JSON config work
// exactly as they do when opened directly.
//
// base './' makes every URL relative, so the same build works on:
//   - GitHub Pages project sites (https://user.github.io/repo/)
//   - a custom domain or any other static host at the root
//   - the Android APK (Capacitor serves dist/ from inside the app)
export default defineConfig({
  base: './',
  publicDir: 'site',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/entry.ts',
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
});
