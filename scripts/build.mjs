import {mkdir,rm,cp,writeFile} from 'node:fs/promises';
import {events,association as a} from '../src/events.mjs';
import {layout,home,directory,detail,about,help,notFound} from '../src/templates.mjs';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
const pages=[['index.html','首頁',home(),'home'],['events.html','活動與課程',directory(),'events'],['about.html','關於學會',about(),'about'],['help.html','參加指南',help(),'help'],...events.map(e=>[`events/${e.slug}.html`,e.title,detail(e),'events'])];
for(const [path,title,content,nav] of pages){
  if(path.includes('/')) await mkdir('dist/events',{recursive:true});
  await writeFile(`dist/${path}`,layout({title,content,nav,depth:path.includes('/')?1:0,path}));
}
await writeFile('dist/404.html',layout({title:'找不到這個頁面',nav:'',depth:0,path:'404.html',content:notFound()}));
const site = process.env.SITE_URL?.replace(/\/$/,'');
if(site){
  if(!/^https:\/\/[a-z0-9.-]+(?::\d+)?(?:\/[a-z0-9._/-]*)?$/i.test(site)) throw new Error('SITE_URL must be an https origin or base path without query');
  await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(([p])=>`<url><loc>${site}/${p}</loc></url>`).join('')}</urlset>`);
  await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
} else await writeFile('dist/robots.txt','User-agent: *\nAllow: /\n');
console.log(`Built ${pages.length+1} pages. Content verified ${a.verified}.`);
