# Photo and social media editing guide

## Photos

Edit **`src/lib/photos.json`**. Every image slot is named separately:

| Key | Position |
| --- | --- |
| hero | Homepage feature image |
| heroDetail | Homepage overlapping circular photo / FAQ photo |
| about | Homepage local story and About page |
| infants | Infants card and program section |
| toddlers | Toddlers card and program section |
| preschool | Preschool card and program section |
| schoolAge | School-age card and program section |
| community | Contact page portrait |

Each entry has `src`, `alt`, `position`, `source`. To replace the homepage photo, upload a photo to `public/photos/hero.webp` and change `hero.src` to `/photos/hero.webp`. Change `hero.alt` to a description of the actual photo and `source` to your internal license reference. No TSX or CSS edits needed.

Optimize uploaded photos to WebP or AVIF with reasonable sizes: ~1400px wide hero, ~800px cards, keep most under 250KB if possible. Do not reuse another organization's photographs. When photographing children, obtain appropriate consent. Cropping, filters or slight edits do not erase copyright.

Current external Pexels photos are illustrative; their original licensed sources are listed in `photos.json`. Photos can be used for commercial purposes under the Pexels license (review restrictions on portraying people or implying endorsement): https://www.pexels.com/legal-pages/license

## Social profiles

Edit `src/lib/site.json` under the `facebook`, `instagram`, `youtube` keys. Paste a complete `https://...` link. Empty values are automatically hidden. Current Facebook URL is listed by Vinita Chamber of Commerce but should be confirmed by the center before launch.

## Search engine readiness

Review facts in `site.json`, set the live approved HTTPS domain in `.env.local`, then set `VITE_PUBLICATION_APPROVED=true`. Run `npm run build` and deploy `dist`. There are no unfinished-looking preview banners on the website.
