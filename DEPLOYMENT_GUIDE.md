
# Hostinger Deployment Guide for KS Design Studio

Follow these steps to ensure your website works correctly on Hostinger:

### 1. Build the Application
On your local computer, open the project folder in your terminal and run:
```bash
npm install
npm run build
```

### 2. Identify the Output
After the command completes, a new folder named `dist` will appear in your project root. This folder contains the "compiled" website (plain HTML, CSS, and JS) that servers understand.

### 3. Upload to Hostinger
1. Log in to your Hostinger hPanel.
2. Go to **File Manager**.
3. Navigate to `public_html`.
4. **Upload the CONTENTS** of the `dist` folder directly into `public_html`.
5. Ensure the `.htaccess` file is also present in `public_html`.

### Troubleshooting "Files Not Loading"
- If your site is in a subfolder (e.g., `ksdesign.in/new-site/`), the `base: './'` in `vite.config.ts` ensures it still works.
- If you see a 404 on refresh, check that the `.htaccess` file was uploaded (sometimes it's hidden).
- Clear your browser cache or Hostinger's "Object Cache" (if enabled) after uploading new files.
