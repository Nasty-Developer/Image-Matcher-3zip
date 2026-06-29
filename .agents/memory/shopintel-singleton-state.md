---
name: ShopIntel singleton state pattern
description: How global overlay state (CommandPalette, modals) should be wired in the ShopIntel app.
---

## Rule
Global overlays (CommandPalette, drawer modals) must be mounted **once** in `AppLayout.tsx` with a single `useState`. Pass `onOpen` / `onClose` callbacks down to `Navbar` and `FloatingActions` as props — never re-mount the overlay component inside child components.

**Why:** Mounting the same overlay in both AppLayout and Navbar creates two independent `open` states and two `keydown` listeners. Ctrl+K then toggles both independently, producing nondeterministic UX (one opens while the other closes).

**How to apply:** Any time a new global overlay is added, mount it in AppLayout, lift the `open` state there, and thread a callback prop to whatever triggers it.
