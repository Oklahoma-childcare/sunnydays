import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE_META, renderPage, faqData } from '../src/lib/render-page.mjs';

const cwd=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
const readJSON=p=>JSON.parse(fs.readFileSync(path.join(cwd,p),'utf8'));
const site=readJSON('src/lib/site.json');
const photos=readJSON('src/lib/photos.json');
const env={...process.env};
for (const file of ['.env','.env.local']) {
  const full=path.join(cwd,file);
  if(!fs.existsSync(full))continue;
  for(const line of fs.readFileSync(full,'utf8').split(/\r?\n/)){
    const m=line.match(/^\s*(VITE_[A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if(!m)continue;
    env[m[1]]=m[2].replace(/^['"]|['"]$/g,'');
  }
}
const siteUrl=String(env.VITE_SITE_URL||'').trim().replace(/\/$/,'');
const approved=env.VITE_PUBLICATION_APPROVED==='true';
const domainValid=/^https:\/\/[^/\s]+$/i.test(siteUrl) && !/localhost|example\.com|vercel\.app/i.test(siteUrl);
if(approved&&!domainValid) throw new Error('Set VITE_SITE_URL to the approved custom https:// domain before VITE_PUBLICATION_APPROVED=true.');
const canIndex=approved&&domainValid;
const e=s=>String(s||'').replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const toJsonLd=x=>JSON.stringify(x).replaceAll('<','\\u003c');
const provider={
 '@context':'https://schema.org', '@type':'ChildCare', name:site.name,
 identifier:site.licenseNumber,
 address:{'@type':'PostalAddress',streetAddress:site.streetAddress,addressLocality:site.city,addressRegion:site.state,postalCode:site.postalCode,addressCountry:'US'},
 telephone:site.phoneHref,email:site.email,
 areaServed:{'@type':'City',name:site.city},
 hasMap:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.streetAddress}, ${site.city}, ${site.state} ${site.postalCode}`)}`,
 openingHoursSpecification:[{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday'],opens:site.hours.opens,closes:site.hours.closes}],
 sameAs:[site.providerUrl,...['facebook','instagram','youtube'].map(k=>site[k]).filter(v=>typeof v==='string' && v.startsWith('https://'))]
};
if(canIndex) provider.url=`${siteUrl}/`;
const css=fs.readFileSync(path.join(cwd,'src/index.css'),'utf8').replace(/^@tailwind (base|components|utilities);\s*$/gm,'');
fs.writeFileSync(path.join(cwd,'public/site.css'),css);
const routes=Object.keys(PAGE_META);
for(const route of routes){
  const meta=PAGE_META[route];
  const routePath=route==='/'?'/':`${route}/`;
  const canonical=canIndex?`${siteUrl}${routePath}`:'';
  const faqLd=route==='/faq'?`<script type="application/ld+json">${toJsonLd({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqData(site)})}</script>`:'';
  const hero=route==='/'?photos.hero?.src:'';
  const preload=hero?`<link rel="preload" as="image" href="${e(hero)}" fetchpriority="high">`:'';
  const html=`<!doctype html>\n<html lang="en-US">\n<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#233e6b"><meta name="color-scheme" content="light">
<title>${e(meta.title)}</title><meta name="description" content="${e(meta.description)}">
<meta name="robots" content="${canIndex?'index,follow,max-image-preview:large':'noindex,nofollow'}">
${canonical?`<link rel="canonical" href="${e(canonical)}">`:''}
<meta property="og:site_name" content="${e(site.displayName)}"><meta property="og:type" content="website">
<meta property="og:title" content="${e(meta.title)}"><meta property="og:description" content="${e(meta.description)}">
${canonical?`<meta property="og:url" content="${e(canonical)}">`:''}
<meta property="og:locale" content="en_US">${canonical?`<meta property="og:image" content="${siteUrl}/og-card.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">`:""}<meta name="twitter:card" content="${canonical?"summary_large_image":"summary"}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.pexels.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700;6..12,800;6..12,900;6..12,1000&display=swap" rel="stylesheet">
${preload}<link rel="stylesheet" href="/site.css">
<script type="application/ld+json">${toJsonLd(provider)}</script>${faqLd}
</head><body><div id="root">${renderPage(route,site,photos)}</div><script type="module" src="/src/main.tsx"></script></body></html>`;
  const dir=route==='/'?cwd:path.join(cwd,route.slice(1));
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'index.html'),html);
}
if(canIndex){
  fs.writeFileSync(path.join(cwd,'public/sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${siteUrl}${r==='/'?'/':`${r}/`}</loc></url>`).join('')}</urlset>\n`);
  fs.writeFileSync(path.join(cwd,'public/robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
}else{
  fs.rmSync(path.join(cwd,'public/sitemap.xml'),{force:true});
  fs.writeFileSync(path.join(cwd,'public/robots.txt'),`User-agent: *\nAllow: /\n`);
}
console.log(`Generated ${routes.length} crawlable HTML pages for Sunny Days Academy (${canIndex?'approved indexing':'unpublished / noindex'}).`);
