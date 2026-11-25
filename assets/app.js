import {getStatus} from './status.js';
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
const mobile=matchMedia('(max-width: 780px)');
function resetMenu(){menu.hidden=!mobile.matches;nav.hidden=mobile.matches;menu.setAttribute('aria-expanded','false');}
resetMenu();mobile.addEventListener('change',resetMenu);
menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));nav.hidden=expanded;});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobile.matches&&!nav.hidden){nav.hidden=true;menu.setAttribute('aria-expanded','false');menu.focus();}});
const filters=document.querySelector('.filters');
const search=document.querySelector('#search'),category=document.querySelector('#category'),state=document.querySelector('#state');
const cards=[...document.querySelectorAll('[data-event]')];
function filter(){
  if(!filters)return;
  const q=search.value.trim().toLocaleLowerCase('zh-TW');let count=0;
  cards.forEach(c=>{const show=(!q||c.dataset.search.toLocaleLowerCase('zh-TW').includes(q))&&(category.value==='all'||category.value===c.dataset.category)&&(state.value==='all'||state.value===c.dataset.state);c.hidden=!show;if(show)count++;});
  document.querySelector('#result-count').textContent=`共 ${count} 場活動`;
  document.querySelector('#empty').hidden=count!==0;
  const url=new URL(location.href);for(const [k,v] of [['q',search.value],['category',category.value],['state',state.value]]){if(v&&v!=='all')url.searchParams.set(k,v);else url.searchParams.delete(k);}history.replaceState(null,'',url);
}
if(filters){
  filters.hidden=false;const query=new URLSearchParams(location.search);search.value=query.get('q')||'';
  for(const [key,el] of [['category',category],['state',state]])if([...el.options].some(o=>o.value===query.get(key)))el.value=query.get(key);
  search.addEventListener('input',filter);category.addEventListener('change',filter);state.addEventListener('change',filter);
  document.querySelector('#reset').addEventListener('click',()=>{search.value='';category.value='all';state.value='all';filter();search.focus();});filter();
}
// Recheck on page load/resume so a static build cannot leave an expired CTA active.
const labels={open:'開放報名',closed:'報名已截止',past:'活動已結束'};
let data=[];
function refreshStatus(){
  for(const event of data){
    const value=getStatus(event);
    document.querySelectorAll(`[data-status="${event.slug}"]`).forEach(el=>{el.textContent=labels[value];el.className=`tag status-${value}`;});
    document.querySelectorAll(`[data-event="${event.slug}"]`).forEach(el=>el.dataset.state=value);
    const box=document.querySelector(`[data-registration="${event.slug}"]`);
    if(box&&value!=='open'&&box.querySelector('a[href^="https://www.beclass.com/"]')){
      box.replaceChildren();const message=document.createElement('div');message.className='closed-message';message.textContent=labels[value];
      const p=document.createElement('p');p.textContent='歡迎至活動總覽查看其他課程。';const a=document.createElement('a');a.href='../events.html';a.className='button secondary';a.textContent='查看所有活動';box.append(message,p,a);
    }
  }
  if(filters)filter();
}
fetch(new URL('./events.json',import.meta.url)).then(r=>{if(!r.ok)throw new Error('events unavailable');return r.json();}).then(events=>{data=events;refreshStatus();}).catch(()=>{/* The pre-rendered content remains readable when offline. */});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshStatus();});
setInterval(refreshStatus,60000);
