# profile-dropdown

2026-08-04, transformation engine (consumer hand-migration against `consumer-props.md`).

`dropdown-menu.tsx` is already Base UI (`@base-ui/react/menu`); this file is app consumer code, so no golden pair was available — consumer-props rewiring only. Verdict: migrated.

## Changed

- `components/profile-dropdown.tsx`
  - `DropdownMenuContent ... forceMount` (line 38) → dropped. The Base UI wrapper renders `Portal > Positioner > Popup` and does not expose `keepMounted` on `DropdownMenuContent`; Base UI holds the popup mounted through exit animations natively, so `forceMount` was unnecessary.
  - Three `DropdownMenuItem asChild` + `<Link>` call sites (Profile/Billing/Settings, lines 49/52/55) → `render={<Link href="..."/>}` per the universal `asChild` → `render` mapping. Children (`<User/> Profile`, etc.) stay as item content.
  - `DropdownMenuItem` "New Team" and destructive "Sign out" items had no `asChild`/`render`; unchanged.
  - `DropdownMenu modal={false}` kept — `Menu.Root.modal` exists in Base UI.

Leftover scan clean: `grep -n "radix-ui\|@radix-ui\|asChild\|forceMount"` on this file → empty.

## Left alone

- `components/ui/dropdown-menu.tsx` — already migrated to Base UI; not part of this file's change.
- `DropdownMenuPortal`, `DropdownMenuSub*`, checkbox/radio items — not used here.

## Behavior changes

- `forceMount` (kept menu mounted in DOM always) removed → the menu now mounts on open/unmounts on close. This is idiomatic Base UI and matches how the wrapper handles exit animations. If always-DOM (SEO) presence was relied upon, that is a regression to note; no consumer behavior otherwise changed.

## Verify by hand

- Click the avatar → menu opens aligned to the right edge (`align="end"`).
- Profile / Billing / Settings items navigate to the right routes.
- "Sign out" calls auth `signOut` then redirects to `/sign-in`.
- Esc / outside-click closes the menu; `modal={false}` lets outside elements stay interactive.