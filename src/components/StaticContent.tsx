import site from '../lib/site.json';
import photos from '../lib/photos.json';
import { renderPage } from '../lib/render-page.mjs';

/** The same trusted renderer serves both crawler-visible HTML and client React. */
export function StaticContent({path}:{path:string}) {
  return <div className="site-content" dangerouslySetInnerHTML={{__html:renderPage(path,site,photos)}}/>;
}
