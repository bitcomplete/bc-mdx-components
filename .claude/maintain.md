# Maintain facts — bc-mdx-components

Read by the `maintain` skill so each sweep skips rediscovery.

- **Repo:** `bitcomplete/bc-mdx-components` (public) · maintainer `@terraboops`
- **What it is:** `@bitcomplete/mdx-components` — published npm package (React + MDX + Tailwind component library)
- **Package manager:** pnpm (`pnpm-lock.yaml`)

## Commands

| Purpose | Command |
|---|---|
| Typecheck | `pnpm run typecheck` (`tsc --noEmit`) |
| Test | `pnpm test` (`vitest run`) |
| Build | `pnpm run build` (manifest → css → js; tsup IIFE + DTS) |

This is a **published package** — always run `pnpm run build` before proposing a dep change, and compare `dist/bundle.iife.global.js` and `dist/index.d.ts` sizes against main. Same sizes = published artifact unchanged.

## Merge convention

Squash merge. Delete the branch.

## Dependency cautions

- **`vite` must be an explicit devDependency.** It's only a peer of `vitest`, and pnpm will happily resolve a stale major that violates vitest's peer range — `vitest@4` with vite 5 fails at startup with `ERR_PACKAGE_PATH_NOT_EXPORTED: './module-runner'`. If a vitest bump breaks, check the resolved vite major first (`pnpm why vite`).
- `pnpm update` raises the range floors (`^19.2.0` → `^19.2.8`). That's intended — it documents the tested minimum.
- Every advisory this repo has carried came through `vitest → vite → esbuild` and was **dev-only** (test UI / dev server), never shipped in `dist/`. Don't treat those as urgent; do clear them when cheap.
- Held majors (deliberate, need discussion): `typescript` 7 · `@types/node` 26.

## Related

Issue #5 tracks moving to npm OIDC trusted publishing (dropping GH-release-based publish).
