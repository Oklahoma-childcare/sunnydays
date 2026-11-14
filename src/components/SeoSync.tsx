import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { PAGE_META } from '../lib/render-page.mjs';

/** Keep page title/description correct after client-side route transitions. */
export function SeoSync() {
  const path=useRouterState({select:s=>s.location.pathname});
  useEffect(()=>{
    const route=(path.replace(/\/$/,'')||'/') as keyof typeof PAGE_META;
    const meta=PAGE_META[route] || PAGE_META['/'];
    document.title=meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content',meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content',meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content',meta.description);
    const origin=import.meta.env.VITE_SITE_URL?.replace(/\/$/,'');
    const ready=import.meta.env.VITE_PUBLICATION_APPROVED==='true' && origin;
    const canonical=document.querySelector('link[rel="canonical"]');
    if(ready && canonical) canonical.setAttribute('href',`${origin}${route==='/'?'/':`${route}/`}`);
  },[path]);
  return null;
}
