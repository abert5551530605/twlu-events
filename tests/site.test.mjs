import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,access} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {events,status} from '../src/events.mjs';
import {getStatus} from '../public/assets/status.js';
test('registration dates agree in server and client, using Taipei cutoff',()=>{
 const e=events[0];for(const [instant,expected] of [['2026-11-30T15:59:59Z','open'],['2026-11-30T16:00:00Z','closed'],['2026-12-05T08:45:01Z','past']]){assert.equal(status(e,new Date(instant)),expected);assert.equal(getStatus(e,new Date(instant)),expected);}
 assert.equal(status(events[1],new Date('2026-11-26T00:00:00Z')),'past');
});
async function files(dir){return(await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?files(`${dir}/${e.name}`):`${dir}/${e.name}`))).flat();}
test('all rendered local links/assets exist and fragments resolve',async()=>{
 const pages=(await files('dist')).filter(f=>f.endsWith('.html'));
 for(const file of pages){const html=await readFile(file,'utf8');assert.equal((html.match(/<h1[ >]/g)||[]).length,1,file);assert.match(html,/<html lang="zh-Hant">/);
 for(const [,url] of html.matchAll(/(?:href|src)="([^\"]+)"/g)){if(/^(https?:|mailto:|tel:)/.test(url))continue;const [path,hash]=url.split('#');const target=path?resolve(dirname(file),path.split('?')[0]):resolve(file);await access(target);if(hash){assert.match(await readFile(target,'utf8'),new RegExp(`id="${hash}"`));}}
 }
});
test('archived October keeps price record and never offers registration form',async()=>{const html=await readFile('dist/events/2026-october.html','utf8');assert.match(html,/活動已結束/);assert.match(html,/1,200/);assert.match(html,/上午或下午/);assert.doesNotMatch(html,/<form|前往官方報名頁/);});
test('only verified future course has external registration URL',()=>{assert.equal(events.filter(e=>e.registration).length,1);assert.equal(events[0].registration,'https://www.beclass.com/rid=31528ee6ae84276cc736');});
