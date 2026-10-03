## 2026-10-03 - Missing ARIA Labels on Icon-only Elements
**Learning:** Discovered a pervasive pattern across the app where icon-only buttons (search, cart, user, close) and social links lack accessible names, making them unreadable to screen readers.
**Action:** Always verify that every interactive element, especially icon-only buttons, has a descriptive `aria-label` (and consider `title` for sighted users) to ensure full accessibility.
