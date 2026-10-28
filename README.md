# Alfonso Ardoiz Portfolio

English-language portfolio built with Astro and plain CSS, featuring selected AI engineering case studies. Tailwind provides the CSS reset. The editorial layout uses a dark violet palette, compact project previews and publication covers. Static output is compatible with GitHub Pages.

## Development

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` checks types and generates the homepage, four case studies and sitemap.

## Content

Edit `src/content/portfolio.ts` for case studies, publication references and contact details. The homepage's introduction and selected experience are in its Astro components. Project pages are generated at `/work/[slug]/`.

Project preview images and publication covers are mapped in `src/content/media.ts`. Projects without an interface screenshot show a placeholder. Voice AI Interview Coach includes its existing screenshot and recorded voice demo. Project display names are independent of their URLs; retain the existing slugs when editing titles. Each case study has a dedicated `seoDescription` for search and social previews.

NBA demo and repository links are intentionally marked `pending`. Set each link's availability to `available` only after checking the public destination. The demo is an exploration of saved analyses, not a live agent.

## Private material

`data/` is ignored and is not needed to build the site. Do not copy CVs, interview notes or other private source documents into `public/`, and do not import them into the site. There is no public CV download.

## Deployment

The existing GitHub Pages workflow publishes on pushes to `main` or manual invocation. Building locally does not deploy the site.
