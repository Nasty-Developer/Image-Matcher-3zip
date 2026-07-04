---
name: Fixed-width grid tables on mobile
description: Pattern for preventing page-level horizontal scroll when a component uses a fixed-width CSS grid (e.g. a price-comparison table) inside a responsive layout.
---

Components built with inline `style={{}}` grids using fixed pixel column widths (common in this codebase — raw inline styles, no CSS framework grid) will force page-level horizontal scroll on mobile viewports unless wrapped.

**Why:** The app has no global overflow guard, and many cards/tables were authored with fixed total widths (e.g. ~720px) that exceed mobile viewport width. Letting the overflow bubble up breaks the "no horizontal scroll" requirement for the whole page.

**How to apply:** Wrap the fixed-width grid/table content in its own `div` with `overflowX: "auto"` and `minWidth` set to the fixed px width only when not on desktop breakpoint (e.g. `minWidth: isDesktop ? "auto" : 720`). This keeps the scroll contained to that one component instead of the whole page. Check other fixed-width grids (analytics cards, recommendation cards, price history cards) for the same issue when doing mobile responsiveness passes.
