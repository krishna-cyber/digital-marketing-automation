# TanStack Table v8 → v9 Migration Roadmap

> **Target:** Migrate all 5 data tables from `@tanstack/react-table` v8 (`^8.21.3`) to v9.
> **Reference:** https://tanstack.com/table/latest/docs/framework/react/guide/migrating
> **Status:** Planning only — no code changes made yet.

---

## Acceptance Criteria

| # | Criterion | How it is verified |
|---|-----------|--------------------|
| 1 | TanStack Table v9 is successfully integrated | `@tanstack/react-table` is `^9.x` in `frontend/package.json`, no `@tanstack/react-table/legacy` imports |
| 2 | Existing table functionality works correctly | Manual QA of every table: sorting, column filtering, faceted filters, pagination, row selection, column visibility, row actions |
| 3 | Tree-shaking is improved with optimized imports | Explicit `tableFeatures({...})` with only the features each table uses (no `stockFeatures`, no `useLegacyTable`) |
| 4 | Bundle/performance impact is validated | Compare `next build` bundle stats / route payloads before vs. after |
| 5 | Memory usage is reduced or remains optimized | No destructured row/cell/column/header methods; methods called on instances (v9 prototype sharing) |
| 6 | Application builds and TypeScript checks pass | `npm run typecheck` (tsc --noEmit) and `npm run build` clean |

---

## 1. Current State Inventory

### Dependency

- `frontend/package.json`: `"@tanstack/react-table": "^8.21.3"`

### Feature usage per table (identical across all 5)

| v8 option (current) | Purpose |
|---------------------|---------|
| `useReactTable` | Hook (renamed `useTable` in v9) |
| `getCoreRowModel: getCoreRowModel()` | Core row model (automatic in v9) |
| `getFilteredRowModel: getFilteredRowModel()` | Column filtering |
| `getSortedRowModel: getSortedRowModel()` | Column sorting |
| `getFacetedRowModel: getFacetedRowModel()` | Facet counts for filters |
| `getFacetedUniqueValues: getFacetedUniqueValues()` | Unique facet values |
| `manualPagination: true` + `pageCount` + `pagination` state | Server-side pagination (nuqs URL state) — **note:** `rowPaginationFeature` is still required in v9 for the `pagination` state slice + `setPageIndex`/`getPageCount`/etc. |
| `enableRowSelection: true` + `rowSelection` state | Row selection (`row.getIsSelected()` used in table body) |
| `columnVisibility` state | Column show/hide (View dropdown) |
| `state: {...}` + `on*Change` handlers | Controlled state — **still supported in v9** (no change needed) |

### Files involved

**Shared infrastructure (migrate first — every table depends on these):**

| File | v8 API used | v9 change |
|------|-------------|-----------|
| `frontend/types/types.ts` | `RowData` import + global `ColumnMeta` module augmentation | Add `TFeatures` generic to `ColumnMeta` |
| `frontend/components/data-table-toolbar.tsx` | `Table<TData>`, `table.getState().columnFilters`, `table.getState().globalFilter`, `table.resetColumnFilters()`, `table.setGlobalFilter()` | `Table<TFeatures, TData>`; `getState()` → `table.state` |
| `frontend/components/data-table-pagination.tsx` | `Table<TData>`, `table.getState().pagination`, `getPageCount`, `setPageIndex`, `nextPage`, `previousPage`, `setPageSize`, `getCanNextPage`, `getCanPreviousPage` | `Table<TFeatures, TData>`; `getState()` → `table.state` |
| `frontend/components/data-table-view-options.tsx` | `Table<TData>`, `getAllColumns()`, `column.getCanHide()`, `column.getIsVisible()`, `column.toggleVisibility()` | `Table<TFeatures, TData>` |
| `frontend/components/data-table-column-header.tsx` | `Column<TData, TValue>`, `getCanSort()`, `getIsSorted()`, `toggleSorting()`, `getCanHide()`, `toggleVisibility()` | `Column<TFeatures, TData, TValue>` |
| `frontend/components/data-table-faceted-filter.tsx` | `Column<TData, TValue>`, `getFacetedUniqueValues()`, `getFilterValue()`, `setFilterValue()` | `Column<TFeatures, TData, TValue>` |

**The 5 data tables:**

| # | Table | Table component | Columns | Row actions | Extra files |
|---|-------|-----------------|---------|-------------|-------------|
| 1 | **Blog Post** | `frontend/app/dashboard/blogs/blogs-articles/components/blogs-table.tsx` | `blogs-columns.tsx` | `blogs-table-row-actions.tsx` | `delete-blog-alert.tsx`, `blogs-provider.tsx` |
| 2 | **LinkedIn Articles** | `frontend/app/dashboard/blogs/linkedin-articles/components/linkedin-article-table.tsx` | `linkedin-articles-columns.tsx` | `linkedin-article-table-row-actions.tsx` | `delete-linkedin-article-alert.tsx` |
| 3 | **Media Assets** | `frontend/app/dashboard/content/components/media/components/media-table.tsx` | `media-columns.tsx` | `media-data-table-row-actions.tsx` | `media-edit-dialog.tsx`, `delete-media-alert.tsx`, `media-provider.tsx` |
| 4 | **Thought Leadership** | `frontend/app/dashboard/content/components/leadership/components/leadership-table.tsx` | `leadership-columns.tsx` | `leadership-row-actions.tsx` | `delete-leadership-alert.tsx`, `leadership-provider.tsx` |
| 5 | **Social Posts** | `frontend/app/dashboard/content/components/socials/components/social-table.tsx` | `social-columns.tsx` | `social-data-table-row-actions.tsx` | `delete-social-alert.tsx`, `socials-provider.tsx` |

> Page-level files (`*/page.tsx`) and edit dialogs/forms do not import `@tanstack/react-table` — no changes expected there.

### v8 → v9 change map relevant to THIS codebase

| v8 | v9 |
|----|----|
| `useReactTable(options)` | `useTable({ features, ...options })` |
| `getFilteredRowModel: getFilteredRowModel()` | `features: tableFeatures({ columnFilteringFeature, filteredRowModel: createFilteredRowModel() })` |
| `getSortedRowModel: getSortedRowModel()` | `features: tableFeatures({ rowSortingFeature, sortedRowModel: createSortedRowModel() })` |
| `getFacetedRowModel: getFacetedRowModel()` | `facetedRowModel: createFacetedRowModel()` (requires `columnFacetingFeature`) |
| `getFacetedUniqueValues: getFacetedUniqueValues()` | `facetedUniqueValues: createFacetedUniqueValues()` |
| `createColumnHelper<TData>()` | `createColumnHelper<typeof features, TData>()` |
| `Table<TData>` / `Column<TData, TValue>` / `Row<TData>` | `Table<TFeatures, TData>` / `Column<TFeatures, TData, TValue>` / `Row<TFeatures, TData>` |
| `table.getState()` | `table.state` (recommended) or `table.store.state` |
| Global `ColumnMeta<TData, TValue>` augmentation | `ColumnMeta<TFeatures, TData, TValue>` |
| `sortingFn` column option | `sortFn` (only if used — currently not used in this repo) |
| `filterFns` / `sortFns` registries | Individual imports (e.g. `filterFn_includesString`) registered as slots — only needed if functions are referenced by string name |
| `flexRender(fn, ctx)` | Still works; optional `<table.FlexRender header={header} />` |
| — | New required `features` option; ESM-only packages; TS target ES2022 |

**Things that DON'T change (already v9-compatible or unused):**
- `state: {...}` + `onSortingChange`/`onPaginationChange`/`onRowSelectionChange`/`onColumnVisibilityChange` controlled pattern — still supported.
- Inline `filterFn: (row, id, value) => value.includes(row.getValue(id))` in `leadership-columns.tsx` / `social-columns.tsx` — passed as a function, needs no registration.
- `flexRender` calls in table bodies.
- Column pinning / resizing / grouping / aggregation — **not used**, so no migration work.
- `getPaginationRowModel` — intentionally not used (server-side pagination), so `createPaginatedRowModel()` is NOT needed.

---

## 2. Migration Strategy

**Recommended approach: full v9 API with explicit features (satisfies the tree-shaking + memory acceptance criteria).**

- ❌ **Reject `useLegacyTable`** (`@tanstack/react-table/legacy`) — deprecated, bundles ALL features (larger than v8), violates criterion #3.
- ❌ **Reject `stockFeatures`** for the same bundle reason; acceptable only as a temporary smoke-test step.
- ✅ **One shared `tableFeatures()` object** for all 5 tables — every table uses the identical feature set, and all column helpers / row actions / shared components need `typeof features`. Create it once and import everywhere.

### Proposed shared module

New file: `frontend/lib/table-features.ts`

```ts
import {
  columnFacetingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createSortedRowModel,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
} from "@tanstack/react-table"

export const appFeatures = tableFeatures({
  columnFilteringFeature,
  columnFacetingFeature,
  columnVisibilityFeature,
  rowSortingFeature,
  rowSelectionFeature,
  rowPaginationFeature, // needed for pagination state/APIs even with manualPagination
  filteredRowModel: createFilteredRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  sortedRowModel: createSortedRowModel(),
})

export type AppFeatures = typeof appFeatures
```

> Type-checked slots: each row model must be registered after its associated feature (filtering before faceting). `createCoreRowModel` is automatic. Do NOT add `createPaginatedRowModel()` — pagination is server-side.

### Migration order (dependency-driven)

1. **Phase 0** — Preflight & dependency upgrade
2. **Phase 1** — Shared infrastructure (features module, shared components, types)
3. **Phases 2–6** — One table per phase (all use the same mechanical steps)
4. **Phase 7** — Validation & acceptance criteria
5. **Phase 8** — Optional perf optimizations

---

## 3. Phase-by-Phase Roadmap

### Phase 0 — Preflight & dependency upgrade

- [ ] Confirm React/Next compatibility: v9 requires modern ESM builds. Project is Next.js 16 + React 19 — compatible.
- [ ] Bump TypeScript target to ES2022: `frontend/tsconfig.json` currently has `"target": "ES2017"` → change to `"ES2022"` (v9 compiled output targets ES2022).
- [ ] Upgrade the package:
  ```bash
  npm install @tanstack/react-table@^9   # run inside frontend/
  ```
- [ ] Verify no other package depends on `@tanstack/react-table` v8 (check `npm ls @tanstack/react-table`).
- [ ] Smoke-test current behavior baseline (sorting, filters, pagination, selection per table) so regressions are detectable later.
- [ ] Optional: run `npm run build` and record current bundle size / route payloads for the acceptance-criteria comparison.

---

### Phase 1 — Shared infrastructure

**1a. Create the shared features module** (`frontend/lib/table-features.ts`, snippet above).
- [ ] Create the module exporting `appFeatures` and `AppFeatures` type.
- [ ] Verify `tsc` accepts the features composition (slot ordering: `columnFilteringFeature` → `createFilteredRowModel()`, `columnFacetingFeature` → faceted models).

**1b. Update `frontend/types/types.ts`** (global augmentation)
- [ ] Change `ColumnMeta` augmentation to take `TFeatures` as first generic:
  ```ts
  declare module "@tanstack/react-table" {
    interface ColumnMeta<TFeatures, TData extends RowData, TValue> {
      className?: string
      thClassName?: string
      tdClassName?: string
    }
  }
  ```
  (Alternative — cleaner — is dropping the global augmentation and declaring `columnMeta` per-table on the features object; optional, see Phase 8.)

**1c. Update the 5 shared data-table components** (in one pass, then run typecheck):
- [ ] `data-table-toolbar.tsx`: `Table<TData>` → `Table<AppFeatures, TData>`; replace `table.getState().columnFilters` / `table.getState().globalFilter` with `table.state.columnFilters` / `table.state.globalFilter`.
- [ ] `data-table-pagination.tsx`: `Table<TData>` → `Table<AppFeatures, TData>`; replace 3× `table.getState().pagination` with `table.state.pagination`.
- [ ] `data-table-view-options.tsx`: `Table<TData>` → `Table<AppFeatures, TData>` (all other API calls already on-instance).
- [ ] `data-table-column-header.tsx`: `Column<TData, TValue>` → `Column<AppFeatures, TData, TValue>`.
- [ ] `data-table-faceted-filter.tsx`: `Column<TData, TValue>` → `Column<AppFeatures, TData, TValue>`.
- [ ] Run `npm run typecheck` — the app will still be on v8 table components, so this phase type-checks only the shared pieces against the new generics. (Optionally hold off until all phases are done; the table components below will fail typecheck until migrated.)

> **Verify:** all shared component method calls are already made on the instance (`table.getColumn(...)?.getFilterValue()`, `column.setFilterValue(...)`). No destructured method audit needed here, but grep for `const { getValue } =` / `const { getIsSelected } =` patterns to be safe.

---

### Phase 2 — Blog Post table

Files:
- `frontend/app/dashboard/blogs/blogs-articles/components/blogs-table.tsx`
- `frontend/app/dashboard/blogs/blogs-articles/components/blogs-columns.tsx`
- `frontend/app/dashboard/blogs/blogs-articles/components/blogs-table-row-actions.tsx`

Steps:
- [ ] **Columns** (`blogs-columns.tsx`): import `AppFeatures`; `createColumnHelper<BlogPost>()` → `createColumnHelper<AppFeatures, BlogPost>()`. Wrap the array in `columnHelper.columns([...])` for better type inference (optional but recommended). Confirm no `sortingFn` string usages (repo currently uses none).
- [ ] **Row actions** (`blogs-table-row-actions.tsx`): `Row<BlogPost>` → `Row<AppFeatures, BlogPost>`.
- [ ] **Table component** (`blogs-table.tsx`):
  - Imports: `useReactTable` → `useTable`; drop `getCoreRowModel`/`getFilteredRowModel`/`getSortedRowModel`/`getFacetedRowModel`/`getFacetedUniqueValues`; add `tableFeatures`-registered `appFeatures` import.
  - `useReactTable({...})` → `useTable({ features: appFeatures, ... })`.
  - Delete the five `get*RowModel` options (core is automatic; the rest live on `appFeatures`).
  - Keep `state`, `on*Change`, `manualPagination`, `pageCount`, `enableRowSelection` exactly as-is (v9-compatible).
- [ ] Typecheck the table.
- [ ] QA: search box (column filter on `title`), sorting on Title/Publish Date/Created, pagination + page-size select, row selection, View dropdown, row actions (Edit/Download/Approve/Delete), empty state.

---

### Phase 3 — LinkedIn Articles table

Files:
- `frontend/app/dashboard/blogs/linkedin-articles/components/linkedin-article-table.tsx`
- `frontend/app/dashboard/blogs/linkedin-articles/components/linkedin-articles-columns.tsx`
- `frontend/app/dashboard/blogs/linkedin-articles/components/linkedin-article-table-row-actions.tsx`

Steps (identical mechanical pattern to Phase 2):
- [ ] **Columns**: `createColumnHelper<LinkedInArticle>()` → `createColumnHelper<AppFeatures, LinkedInArticle>()`; optional `columnHelper.columns([...])` wrapper.
- [ ] **Row actions**: `Row<LinkedInArticle>` → `Row<AppFeatures, LinkedInArticle>`.
- [ ] **Table component**: `useReactTable` → `useTable` + `features: appFeatures`; remove `get*RowModel` options.
- [ ] Typecheck + QA (search, sort, paginate, select, View dropdown, row actions).

---

### Phase 4 — Media Assets table

Files:
- `frontend/app/dashboard/content/components/media/components/media-table.tsx`
- `frontend/app/dashboard/content/components/media/components/media-columns.tsx`
- `frontend/app/dashboard/content/components/media/components/media-data-table-row-actions.tsx`

Steps:
- [ ] **Columns**: `createColumnHelper<MediaFile>()` → `createColumnHelper<AppFeatures, MediaFile>()`; optional `columnHelper.columns([...])` wrapper. Note: `media-columns.tsx` declares the `documentId` accessor **twice** (plain text + copy-button columns). v8 tolerated it; re-verify both columns still render correctly in v9, and consider giving one an explicit `id` (e.g. `id: "copy-document-id"`) as a cleanup while you're in the file.
- [ ] **Row actions**: `Row<MediaFile>` → `Row<AppFeatures, MediaFile>`.
- [ ] **Table component**: `useReactTable` → `useTable` + `features: appFeatures`; remove `get*RowModel` options.
- [ ] Typecheck + QA (search by `name`, sorting, pagination, selection, View dropdown, edit dialog + delete from row actions).

---

### Phase 5 — Thought Leadership table

Files:
- `frontend/app/dashboard/content/components/leadership/components/leadership-table.tsx`
- `frontend/app/dashboard/content/components/leadership/components/leadership-columns.tsx`
- `frontend/app/dashboard/content/components/leadership/components/leadership-row-actions.tsx`

Steps:
- [ ] **Columns**: `createColumnHelper<ThoughtLeadershipPost>()` → `createColumnHelper<AppFeatures, ThoughtLeadershipPost>()`; optional `columnHelper.columns([...])`. The inline `filterFn: (row, id, value) => value.includes(row.getValue(id))` on `post_status` works unchanged (function passed directly; no string registry needed).
- [ ] **Row actions**: `Row<ThoughtLeadershipPost>` → `Row<AppFeatures, ThoughtLeadershipPost>`.
- [ ] **Table component**: `useReactTable` → `useTable` + `features: appFeatures`; remove `get*RowModel` options.
- [ ] Typecheck + QA (faceted "Post Status" filter, search, sorting, pagination, selection, row actions).

---

### Phase 6 — Social Posts table

Files:
- `frontend/app/dashboard/content/components/socials/components/social-table.tsx`
- `frontend/app/dashboard/content/components/socials/components/social-columns.tsx`
- `frontend/app/dashboard/content/components/socials/components/social-data-table-row-actions.tsx`

Steps:
- [ ] **Columns**: `createColumnHelper<SocialPost>()` → `createColumnHelper<AppFeatures, SocialPost>()`; optional `columnHelper.columns([...])`. Inline `filterFn` on `post_status` works unchanged.
- [ ] **Row actions**: `Row<SocialPost>` → `Row<AppFeatures, SocialPost>`.
- [ ] **Table component**: `useReactTable` → `useTable` + `features: appFeatures`; remove `get*RowModel` options.
- [ ] Typecheck + QA (faceted "Media Type" + "Post Status" filters, search, sorting, pagination, selection, row actions).

---

### Phase 7 — Validation & acceptance criteria

- [ ] `npm run typecheck` — clean.
- [ ] `npm run lint` — clean (note: `// eslint-disable-next-line react-hooks/incompatible-library` comments on `useReactTable` calls can be removed once the hook is `useTable`).
- [ ] `npm run build` — succeeds (also validates ESM + ES2022 target).
- [ ] Manual QA matrix — for **all 5 tables**: load page → data renders → search filters → sort columns → paginate (page buttons, prev/next, first/last, page-size select) → select rows → toggle columns in View → open row-action menus (edit/download/copy/delete) → empty states.
- [ ] **Bundle/performance validation:** compare `next build` route payloads / bundle analysis before vs. after; confirm the table-related chunk shrank (tree-shaking) or at least did not grow.
- [ ] **Memory validation:** confirm no destructured `row`/`cell`/`column`/`header` methods anywhere in the 5 tables + shared components (e.g. `const { getValue } = row`). All calls must be on the instance (`row.getValue(...)`), which is already the case here — re-verify after edits.
- [ ] `grep -rn "getState()" frontend/components frontend/app/dashboard` → expect zero remaining `table.getState()` calls.
- [ ] `grep -rn "useReactTable\|getCoreRowModel\|getFilteredRowModel\|getSortedRowModel\|getFacetedRowModel\|getFacetedUniqueValues" frontend/app frontend/components` → expect zero remaining v8 imports (except none).
- [ ] Update `documentation.md` / `documentationv2.md` technology-stack notes if they mention TanStack Table version.
- [ ] If any table regresses, prefer fixing in place; last-resort rollback is reverting the package bump (`npm install @tanstack/react-table@^8.21.3`) — the diff is mechanical.

---

### Phase 8 — Optional post-migration optimizations (nice-to-have, not required)

- [ ] **Per-slice subscriptions:** wrap the pagination footer / toolbar in `table.Subscribe` or `useSelector(table.atoms.pagination)` from `@tanstack/react-store` (new peer dependency) so page changes don't re-render the whole table. Opt-in; default v8-style full-state selector is fine.
- [ ] **`flexRender` → component form:** replace `flexRender(header.column.columnDef.header, header.getContext())` with `<table.FlexRender header={header} />` / `<table.FlexRender cell={cell} />` (cleaner, still tree-shakeable).
- [ ] **Per-table meta instead of global augmentation:** declare `columnMeta` on `appFeatures` via `metaHelper<...>()` and delete the `declare module` block in `frontend/types/types.ts`.
- [ ] **Shared `filterFns`:** register the repeated inline `value.includes(row.getValue(id))` filter as `filterFns: { includesString: filterFn_includesString }` (or a custom named fn) on `appFeatures` and reference by string in column defs.
- [ ] **`tableOptions()` / `createTableHook`:** extract the repeated option shape (`state`, `on*Change`, `manualPagination`, `pageCount`, `enableRowSelection`) into a shared `tableOptions()` partial, or a `createTableHook` with `useAppTable` for all 5 tables. Best done after the functional migration is stable.

---

## 4. Per-Table Checklist Card (printable)

For each table phase, the mechanical edit is:

1. Columns file → `createColumnHelper<AppFeatures, TData>()` (+ optional `.columns([...])` wrapper)
2. Row actions file → `Row<AppFeatures, TData>`
3. Table file → `useTable({ features: appFeatures, ...same options minus get*RowModel })`
4. `npm run typecheck`
5. Manual QA (search / sort / paginate / select / view / row actions / empty state)

| Table | Type `TData` | Columns file | Row actions file | Table file |
|-------|--------------|--------------|------------------|------------|
| Blog Post | `BlogPost` | `blogs-columns.tsx` | `blogs-table-row-actions.tsx` | `blogs-table.tsx` |
| LinkedIn Articles | `LinkedInArticle` | `linkedin-articles-columns.tsx` | `linkedin-article-table-row-actions.tsx` | `linkedin-article-table.tsx` |
| Media Assets | `MediaFile` | `media-columns.tsx` | `media-data-table-row-actions.tsx` | `media-table.tsx` |
| Thought Leadership | `ThoughtLeadershipPost` | `leadership-columns.tsx` | `leadership-row-actions.tsx` | `leadership-table.tsx` |
| Social Posts | `SocialPost` | `social-columns.tsx` | `social-data-table-row-actions.tsx` | `social-table.tsx` |

---

## 5. Known Landmines (read before starting)

1. **`tsconfig` target must become ES2022** — v9 ships ESM-only compiled to ES2022; leaving `target: ES2017` can break `tsc --noEmit` or require excessive `skipLibCheck` reliance.
2. **All 5 tables must use the SAME features object** — column helpers and row actions type against `typeof features`. If one table ever needs a different feature set later, give it its own `tableFeatures({...})` and its own `AppFeatures` type; do not share via `stockFeatures`.
3. **`createColumnHelper` type order changed** — `createColumnHelper<TFeatures, TData>()`, not `createColumnHelper<TData, TFeatures>()`.
4. **Row model factories now live on `features`** — passing `filteredRowModel: getFilteredRowModel()` (v8 style) to `useTable` will fail typecheck; use `createFilteredRowModel()` inside `tableFeatures`.
5. **`getState()` removed** — `table.getState()` no longer exists; use `table.state` (selected slices) or `table.store.state` (full state).
6. **`rowPaginationFeature` is required even for `manualPagination: true`** — pagination APIs (`setPageIndex`, `getPageCount`, `nextPage`, ...) and the `pagination` state slice are feature-gated in v9.
7. **Row selection indeterminate semantics** — `getIsSomeRowsSelected()` now means "at least one" (stays true at full selection). Not used in this repo today, but if any header checkbox is added later, gate on `getIsSomeRowsSelected() && !getIsAllRowsSelected()`.
8. **Duplicate `documentId` accessor in `media-columns.tsx`** — pre-existing; both columns share id `documentId`. Verify both still work and consider adding an explicit `id` to the copy column while migrating.
9. **Inline `filterFn` closures are fine in v9** — only string references (`filterFn: 'fuzzy'`) need registry registration.
