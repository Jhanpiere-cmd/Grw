## 2026-09-24 - Adding Accessible Names to Icon Buttons
**Learning:** Found that vanilla HTML/JS projects often lack aria-labels on dynamically injected DOM elements (like cart items). Tooltips (`title`) combined with `aria-label` are a great micro-interaction pattern for icon-only buttons.
**Action:** Always check both static HTML and JS template strings for icon-only interactive elements to ensure comprehensive a11y coverage.
