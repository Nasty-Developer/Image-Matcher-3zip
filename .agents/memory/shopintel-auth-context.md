---
name: ShopIntel/Prisma Firebase auth context shape
description: How AuthContext exposes both new and legacy APIs after the Firebase integration
---

AuthContext exposes two parallel APIs on the same context value: the canonical Firebase-facing one (`currentUser`, `loading`, `login`, `signup`, `googleLogin`, `logout`, `forgotPassword`) and legacy aliases (`user: {name,email,avatar,photoURL}`, `isGuest`, `signIn`, `signUp`, `signOut`) derived from `currentUser`.

**Why:** existing consumers (Navbar, FloatingActions, Settings) were written against the old mock-auth shape before Firebase was introduced; keeping both avoids touching every consumer while giving new code a clean Firebase-native API.

**How to apply:** new auth-aware code should prefer `currentUser`/`isGuest` (boolean derived as `currentUser === null`) rather than adding more legacy fields. Auth-gating for routes goes through `ProtectedRoute` (redirects guests to `/signin`), not ad-hoc checks in page components.
