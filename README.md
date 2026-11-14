# Sunny Days Academy LLC — Website #02

A complete, five-page childcare marketing website in a blue / cream / marigold design, intentionally distinct from Sunflower Early Learning Center.

## Quick start

1. Open this folder in VS Code (the folder containing `package.json`).
2. Use Node 22.12+ and run `npm install`.
3. Run `npm run dev`, open the URL shown by Vite.
4. Run `npm run build` for production; deploy the generated `dist/` directory to Vercel or Cloudflare Pages.

**Vercel**: Framework Preset = Vite; build command = `npm run build`; output directory = `dist`.
**Cloudflare Pages**: Framework = React/Vite; build = `npm run build`; output = `dist`.

## Source of truth: edit these two files

- `src/lib/site.json`: center name, address, phone, email, director, hours, Facebook and other socials.
- `src/lib/photos.json`: image URLs, alt text, crop position and attribution/source reference.

After editing, re-run `npm run generate` or restart `npm run dev`. The route HTML is rebuilt automatically on `npm run dev`/`npm run build`.

## Add your own photos

Drop approved center photos in `public/photos`, e.g. `public/photos/hero.webp`, and set `photos.json` > `hero` > `src` to `/photos/hero.webp`. The source and crop keys are independent for every section. See `PHOTO-GUIDE.md`.

Current bundled configuration uses real **Pexels-licensed illustrative photographs**, not images of this specific center. Never describe them as the actual facility. Actual facility photographs require permission; when children are recognizable, verify parental/guardian consent.

## Social links

The Facebook URL was located in Vinita Area Chamber of Commerce's member directory (not a hidden spreadsheet column). It can be changed in `src/lib/site.json`. Instagram / YouTube are blank and hidden until verified.

## SEO and publishing

- Unique `<title>`, meta description, OG tags and H1 for all five routes
- Full HTML body content in each generated HTML file **before JavaScript loads**
- Semantic navigation and FAQ with native `<details>` (works without JavaScript)
- ChildCare schema in JSON-LD and FAQPage schema on the FAQ page
- `robots.txt` and a production-only `sitemap.xml`
- Proper canonical URLs generated from your approved production domain
- Lazy loading below the fold, eager loading the main hero image
- Direct working phone, email, maps and Facebook links

For safety, builds start with `noindex` until the organization's authorized publication and domain are confirmed. To enable indexing, create `.env.local`:

```
VITE_SITE_URL=https://your-real-domain.example
VITE_PUBLICATION_APPROVED=true
```

Replace the example with the **real approved** HTTPS domain. Then run `npm run build` and verify the domain's published `robots.txt`, canonical, sitemap, Search Console ownership, and Google Business Profile.

## Factual references

- Spreadsheet: visible columns A–J, row for license K830058406, Oklahoma Childcare WIP.
- Oklahoma Human Services licensing record: https://ccl.dhs.ok.gov/providers/K830058406
- Vinita Chamber member directory (Facebook): https://www.vinitachamber.com/member-directory
- Pexels license: https://www.pexels.com/legal-pages/license

Provider listing says: Vinita; address 125 S Scraper; (918) 256-1416; director Dana Brown; capacity 75; year-round; ages infancy through school-age; weekday 6:00 AM–5:30 PM; closed weekends. **No claims about tuition, food, staff qualifications, curriculum, or subsidy acceptance have been invented.**

## No fake forms

The website has clickable `tel:` and `mailto:` contacts, directions and an external social link. It does not pretend to submit an unconnected contact form.

## Repo hygiene

Do not upload `.git`, `node_modules`, `.env.local` or `dist` to GitHub. There is no nested Git repository, no `static-preview` folder, and no extra build output in this ZIP.

## Build verification

Node and the website generator run here, but npm registry network access was unavailable during creation, so dependency installation and the React production build must be checked with `npm install && npm run build` in VS Code/CI.
