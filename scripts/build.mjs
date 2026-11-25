import {mkdir,rm,cp,writeFile} from 'node:fs/promises';
import {events,association as a,status,labels,dateLabel} from '../src/events.mjs';
import {layout,home,directory,detail,about,help} from '../src/templates.mjs';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
const pages=[['index.html','首頁',home(),'home'],['events.html','活動與課程',directory(),'events'],['about.html','關於學會',about(),'about'],['help.html','參加指南',help(),'help'],...events.map(e=>[`events/${e.slug}.html`,e.title,detail(e),'events'])];
for(const [path,title,content,nav] of pages){
  if(path.includes('/')) await mkdir('dist/events',{recursive:true});
  await writeFile(`dist/${path}`,layout({title,content,nav,depth:path.includes('/')?1:0,path}));
}
await writeFile('dist/404.html',layout({title:'找不到這個頁面',nav:'',depth:0,path:'404.html',content:'<section class="section container"><p class="eyebrow">404</p><h1>這個頁面暫時找不到。</h1><p>您可以回到首頁，或從活動總覽重新尋找課程。</p><a class="button" href="index.html">回到首頁</a></section>'}));
await writeFile('dist/assets/events.json',JSON.stringify(events.map(({slug,title,date,deadline,registration})=>({slug,title,date,deadline,registration}))));
const site = process.env.SITE_URL?.replace(/\/$/,'');
if(site){
  if(!/^https:\/\/[a-z0-9.-]+(?::\d+)?(?:\/[a-z0-9._/-]*)?$/i.test(site)) throw new Error('SITE_URL must be an https origin or base path without query');
  await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(([p])=>`<url><loc>${site}/${p}</loc></url>`).join('')}</urlset>`);
  await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
} else await writeFile('dist/robots.txt','User-agent: *\nAllow: /\n');
console.log(`Built ${pages.length+1} pages. Content verified ${a.verified}.`);
