import { createRootRoute, createRoute, createRouter, Outlet, ScrollRestoration } from '@tanstack/react-router';
import { SeoSync } from './components/SeoSync';
import { StaticContent } from './components/StaticContent';

function Root() { return <><SeoSync/><Outlet/><ScrollRestoration/></>; }
const root=createRootRoute({component:Root});
const home=createRoute({getParentRoute:()=>root,path:'/',component:()=> <StaticContent path="/"/>});
const programs=createRoute({getParentRoute:()=>root,path:'/programs',component:()=> <StaticContent path="/programs"/>});
const about=createRoute({getParentRoute:()=>root,path:'/about',component:()=> <StaticContent path="/about"/>});
const faq=createRoute({getParentRoute:()=>root,path:'/faq',component:()=> <StaticContent path="/faq"/>});
const contact=createRoute({getParentRoute:()=>root,path:'/contact',component:()=> <StaticContent path="/contact"/>});
const routeTree=root.addChildren([home,programs,about,faq,contact]);
export const router=createRouter({routeTree,defaultPreload:'intent',scrollRestoration:true});
declare module '@tanstack/react-router' {interface Register{router:typeof router}}
