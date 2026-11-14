declare module '*.mjs' {
  export const PAGE_META: Record<string,{title:string;description:string}>;
  export function renderPage(path:string,site:unknown,photos:unknown):string;
  export function faqData(site:unknown):unknown;
}
