## 2026-09-23 - Icon-Only Button and Form Placeholders Accessibility
**Learning:** In Spanish e-commerce apps like GrwStore, providing accessibility text using `aria-label` for icon-only interactive elements and forms that rely purely on placeholders greatly enhances screen reader friendliness without cluttering the visual UI.
**Action:** Next time working on a static site or similar setup, proactively search for `<button>` or `<a>` tags with only `<i>` icons (like cart, search, trash icons), and inputs without labels, and add descriptive `aria-label`s.
