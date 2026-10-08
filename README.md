# mmac.app

Mike MacDougall’s personal portfolio, built as a static Astro site for public hosting at `mmac.app`.

## Run locally

Use Node.js 22, matching GitHub Actions. Install the dependencies recorded in the lockfile:

```sh
npm ci
npm run dev
```

Open the URL printed by Astro. The port can differ when another local server is running.

To review the production build without the development toolbar:

```sh
npm run build
npm run preview
```

The preview serves `dist/`, so rebuild after editing source files. Astro may report that a preview server is already running; use the URL it prints.

## Where to make changes

| Change | File or directory |
| --- | --- |
| Profile, app order, descriptions, destinations, image paths, interests, RubyGems fallback | [src/data/site.ts](src/data/site.ts) |
| Header and section navigation | [src/components/SiteNav.astro](src/components/SiteNav.astro) |
| Shared app cards and optional Apple Watch preview | [src/components/ProjectCard.astro](src/components/ProjectCard.astro) |
| Hero, section structure, footer, RubyGems browser request and cache | [src/pages/index.astro](src/pages/index.astro) |
| Page metadata and shared stylesheet import | [src/layouts/SiteLayout.astro](src/layouts/SiteLayout.astro) |
| Colors, typography, spacing, device frames, responsive layouts | [src/styles/global.css](src/styles/global.css) |
| Published app screenshots and icons | `public/images/apps/` |
| Photography and 3D print previews | `public/images/photography/` and `public/images/prints/` |
| Privacy policy pages | `public/privacy/` |
| Content and link checks | [tests/site.test.mjs](tests/site.test.mjs) |
| CI validation and deployment | `.github/workflows/` |

## Content

Edit [src/data/site.ts](src/data/site.ts) to update the profile, project descriptions, App Store destinations, open source links, and interests. Project cards are rendered from this data by the reusable `ProjectCard` component.

The app array determines display order. PLNK leads, followed by Recipe Hound, Verdant Ledger, and TapTapCount. Keep Verdant Ledger’s description clear that it is an unofficial Pokopia companion.

App icons and screenshots in `public/images/apps/` are actual published App Store assets. Use each app’s current App Store listing to find replacement assets, and confirm that they represent the intended release. Save assets locally and update their paths and alt text in `site.ts` when needed.

### Screenshot framing

The iPhone screenshots currently have a width-to-height ratio of about `0.46`: `552 × 1200` for PLNK, Recipe Hound, and Verdant Ledger, and `1279 × 2778` for TapTapCount.

The shared frame uses a `0.49` aspect ratio for its inner screen, with `box-sizing: content-box` so the bezel does not squeeze the image horizontally. The image is scaled proportionally to `106.5%` height and moved upward by `6.5%` of the screen height. This trims the status area from the top while preserving the bottom UI. The frame’s height calculation includes the 10px total bezel thickness.

When replacing a screenshot, check its dimensions before changing the frame or crop. Preserve the full image width, PLNK’s score gates, and each app’s bottom controls. Crop the actual screenshot to remove status bars and Dynamic Islands; avoid adding simulated status bars or colored patches. Check both mobile and desktop, including hover behavior.

TapTapCount also supplies optional `watchImage` and `watchImageAlt` fields. Its `416 × 496` Apple Watch screenshot is shown in a separate frame without cropping. Keep the Watch and iPhone controls visible when adjusting their placement.

### RubyGems downloads

The howsigned card requests the total from `https://rubygems.org/api/v1/gems/howsigned.json` each time the page loads. A successful request updates the displayed count and saves it to browser `localStorage` under `mmac.app:howsigned:downloads`.

Before the request completes, or if it fails, the page uses the last valid count stored in that browser. If there is no cached value or storage is unavailable, it uses `openSource.fallbackDownloads` from `site.ts`. The label reads “last known downloads on RubyGems” until the live request succeeds. Updating the baked-in fallback requires a source change and deployment; live and browser-cached counts update automatically.

## Design system

The design system is documented at the top of [src/styles/global.css](src/styles/global.css). It defines:

- Color tokens for blue-tinted night surfaces, soft text, borders, Hamilton College’s Continental Blue (`#002f86`) and secondary blue (`#00a0df`), and PLNK’s game board.
- Typography tokens for the system sans face, editorial serif accents, and reading sizes.
- A 4px based spacing scale for section rhythm and component padding.
- Small, medium, large, and pill radii, plus card and floating-object shadows.
- Reusable page structure, navigation, buttons, project cards, and interest links.

The site always uses its dark theme. Layouts adapt from wide desktop to small screens, include visible keyboard focus, semantic landmarks, descriptive image text, and reduced-motion support.

## Validation

Run these in order:

```sh
npm run build
npm test
git diff --check
```

`npm run build` runs Astro’s diagnostics and generates the static site in `dist/`. `npm test` reads that built output, so running it without rebuilding can test an older version. The tests check required content and destinations, and catch accidental private app repository links or an invented email address. Update expectations intentionally when approved copy or navigation changes. `npm run check` is available for diagnostics without generating a build.

Visual review is still needed. Check narrow phones (320px and 393px), tablet layouts (768px), and desktop (1440px), especially near the 650px project-grid and 720px navigation breakpoints. Verify that links do not overlap, screenshots keep important UI visible, the Watch fits its card, keyboard focus is visible, and the page has no horizontal overflow. Confirm section anchors, image loading, privacy links, and the RubyGems fallback behavior after relevant changes.

GitHub Actions runs the build and tests on pushes, pull requests, and manual workflow dispatch.

## Maintenance preferences

- Keep the site always dark, with Hamilton blue accents and the `mmac.app` text wordmark.
- Lead with PLNK once in the app grid. Keep project copy accurate about solo work and avoid numbered project labels or a duplicate hero app preview.
- Preserve the navigation labels “Apps & Games,” “Open Source,” and “Elsewhere,” with LinkedIn and GitHub as secondary profile links.
- Keep copy concise, avoid em dashes, and mention location only where it adds useful context.
- Show meaningful UI and asset changes locally for review before pushing. Push to `main` when publishing is explicitly requested.
- Keep privacy policy paths stable because released apps can still link to them.

## Hosting

GitHub Pages hosts the site. A push to `main` triggers `.github/workflows/deploy-pages.yml`, which builds and publishes `dist/`. Validation runs separately in `.github/workflows/validate.yml`; check both workflows after publishing and confirm the result at [mmac.app](https://mmac.app).

The repository is public. `package.json` has `"private": true` to prevent publishing an npm package; this setting does not control GitHub repository visibility. Generated `dist/` files are ignored by Git and uploaded by the deployment workflow.

The custom domain is configured in GitHub’s Pages settings, `public/CNAME`, and the `site` setting in `astro.config.mjs`. DNS is managed through Cloudflare.

Privacy policies are static HTML copied from `public/privacy/` into the build. Keep these paths working:

- `/privacy/`
- `/privacy/plnk/`
- `/privacy/recipe-hound/`
- `/privacy/field-guide/` (Verdant Ledger)
- `/privacy/taptapcount/`

Older app releases can also reference legacy GitHub Pages policy URLs. Preserve their existing hosting or redirects when moving policies; updating a link here does not update URLs embedded in already released apps.
