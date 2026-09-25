## 2024-05-25 - Dynamic ARIA Labels in Cart
**Learning:** When dynamically generating list items like cart entries, adding specific item names to the `aria-label` (e.g., "Eliminar ${item.name} del carrito" instead of just "Eliminar") significantly improves context for screen reader users compared to generic labels.
**Action:** Always include item-specific dynamic text in ARIA labels for repeated interactive elements generated via JavaScript templates.
