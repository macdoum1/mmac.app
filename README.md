# mmac.app

Mike MacDougall’s personal portfolio, built as a static Astro site. The repository is private and this setup does not publish the site.

## Run locally

```sh
npm install
npm run dev
```

## Content

Edit [src/data/site.ts](src/data/site.ts) to update the profile, project descriptions, App Store destinations, open source links, interests, and future work prompt. Project cards are rendered from this data by the reusable `ProjectCard` component.

The first version includes four App Store listings verified through Apple’s catalog on October 7, 2026: PLNK, Recipe Hound, Verdant Ledger, and TapTapCount. Verdant Ledger is described as an unofficial Pokopia companion, matching its listing. Its relationship to Nintendo and The Pokémon Company is not implied to be official.

App icons and preview screenshots in `public/images/apps/` are actual assets from Apple’s App Store catalog for those apps. They are included to represent the published apps, not as generated artwork. The source of each image can be found by looking up the matching app ID through Apple’s iTunes Search API or its App Store listing.

## Design system

The design system is documented at the top of [src/styles/global.css](src/styles/global.css). It defines:

- Color tokens for blue-tinted night surfaces, soft text, borders, Hamilton College’s Continental Blue (`#002f86`) and secondary blue (`#00a0df`), and PLNK’s game board.
- Typography tokens for the system sans face, editorial serif accents, and reading sizes.
- A 4px based spacing scale for section rhythm and component padding.
- Small, medium, large, and pill radii, plus card and floating-object shadows.
- Reusable page structure, navigation, buttons, project cards, and interest links.

The site always uses its dark theme. Layouts adapt from wide desktop to small screens, include visible keyboard focus, semantic landmarks, descriptive image text, and reduced-motion support.

## Validation

`npm run build` runs Astro’s diagnostics and generates the static site in `dist/`. `npm test` checks the built page for required projects and links, and catches accidental private repository links or an invented email destination. GitHub Actions runs both checks on pushes, pull requests, and manual workflow dispatch. The workflow has read-only repository permission and contains no deployment step.

## Hosting later

No GitHub Pages source or deployment workflow is configured. The existing privacy-policies Pages URLs are untouched. To host this portfolio later, first approve the site content and decide to make it public. Then enable GitHub Pages for this repository and add an explicit deploy workflow that builds `dist/` and publishes it. Configure `mmac.app` as the custom domain and point its DNS records to the selected Pages configuration.

GitHub Pages publishes a publicly accessible website, even when the source repository is private. Anyone with the site URL can view it. Publishing should happen only after Mike approves the content and accepts that public access.
