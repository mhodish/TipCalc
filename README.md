# Tip & Split
A small iPhone-first web app. Photos and calculations stay on the device.

- Scan a receipt with bundled Tesseract.js OCR, confirm subtotal and tax, or type amounts.
- Split equally between 1–99 parties.
- Tip 15%, 20% (default), or 25% on the pre-tax subtotal.
- Add tax, then round each party's final payment to the nearest whole dollar. Exactly 50 cents rounds upward.
- Display the tip after rounding and its actual percentage.
- Included gratuity can be entered separately; it counts toward the chosen tip. Service charges require your judgment about whether they count as gratuity.
- No receipt images or amounts are uploaded, saved, or sent to AI. No analytics or API keys.
- All code and English OCR assets are bundled. Service worker prepares offline use after the first online visit. Look for “Ready for offline use on this device.” Browser storage can be evicted; reconnect to prepare it again.

## iPhone
Open the deployed HTTPS page in Safari → Share → Add to Home Screen → Open as Web App, if offered → Add.

## GitHub Pages
Create a repository with these files, retaining `.github/workflows/pages.yml`. In Settings → Pages → Build and deployment, select GitHub Actions. Push to `main`; the workflow publishes `dist/`. All asset URLs are relative, supporting repository subpaths.

## Checks
Run `node tests/check.cjs`. Browser/iPhone camera and OCR performance require device testing. The development preview infrastructure was unavailable when this version was prepared, so interactive browser QA has not been completed.

## Source layout
`dist/` is the complete buildless app. `tests/` checks arithmetic and receipt parsing. `.openai/` (when present) configures the separate ChatGPT Sites preview and is not needed for GitHub Pages.

## Third-party software
Tesseract.js 6.0.1 and tesseract.js-core 6.0.0: Apache-2.0, https://github.com/naptha/tesseract.js and https://github.com/naptha/tesseract.js-core. English language model: https://github.com/naptha/tessdata (Tesseract language data, Apache-2.0). Bundled licenses are in `dist/vendor/`.
