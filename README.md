# mmac.app

Mike MacDougall’s personal portfolio, built as a static Astro site for public hosting at `mmac.app`.

## Run locally

```sh
npm install
npm run dev
```

## Content

Edit [src/data/site.ts](src/data/site.ts) to update the profile, project descriptions, App Store destinations, open source links, and interests. Project cards are rendered from this data by the reusable `ProjectCard` component.

The first version includes four App Store listings verified through Apple’s catalog on October 7, 2026: PLNK, Recipe Hound, Verdant Ledger, and TapTapCount. Verdant Ledger is described as an unofficial Pokopia companion, matching its listing. Its relationship to Nintendo and The Pokémon Company is not implied to be official.

App icons and preview screenshots in `public/images/apps/` are actual assets from Apple’s App Store catalog for those apps. They are included to represent the published apps, not as generated artwork. The source of each image can be found by looking up the matching app ID through Apple’s iTunes Search API or its App Store listing.

The howsigned card reads its total download count from RubyGems’ public gem metadata API when the page loads. If the request is unavailable, the count displays as unavailable and the RubyGems link remains available.

## Design system

The design system is documented at the top of [src/styles/global.css](src/styles/global.css). It defines:

- Color tokens for blue-tinted night surfaces, soft text, borders, Hamilton College’s Continental Blue (`#002f86`) and secondary blue (`#00a0df`), and PLNK’s game board.
- Typography tokens for the system sans face, editorial serif accents, and reading sizes.
- A 4px based spacing scale for section rhythm and component padding.
- Small, medium, large, and pill radii, plus card and floating-object shadows.
- Reusable page structure, navigation, buttons, project cards, and interest links.

The site always uses its dark theme. Layouts adapt from wide desktop to small screens, include visible keyboard focus, semantic landmarks, descriptive image text, and reduced-motion support.

## Validation

`npm run build` runs Astro’s diagnostics and generates the static site in `dist/`. `npm test` checks the built page for required projects and links, and catches accidental private repository links or an invented email destination. GitHub Actions runs both checks on pushes, pull requests, and manual workflow dispatch.

## Hosting

The Astro build outputs a static site to `dist/`. GitHub Actions publishes that directory to GitHub Pages on pushes to `main`. The public repository contains the site source and its deployed files. The custom domain is `mmac.app`, configured in the repository's Pages settings and `public/CNAME`. Privacy policies are available at `/privacy/`, `/privacy/plnk/`, `/privacy/recipe-hound/`, `/privacy/field-guide/`, and `/privacy/taptapcount/`. The existing GitHub Pages privacy-policy URLs remain live for current app links.
