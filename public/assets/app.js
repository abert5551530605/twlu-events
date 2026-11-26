import {getStatus} from './status.js';

/* ---------- Mobile menu (progressive enhancement) ---------- */
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const mobile = matchMedia('(max-width: 860px)');
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  nav.hidden = mobile.matches && !open;
}
function resetMenu() {
  menu.hidden = !mobile.matches;
  setMenu(false);
}
if (menu && nav) {
  resetMenu();
  mobile.addEventListener('change', resetMenu);
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobile.matches && !nav.hidden) { setMenu(false); menu.focus(); }
  });
}

/* ---------- Directory filters ---------- */
const filters = document.querySelector('.filters');
const search = document.querySelector('#search');
const category = document.querySelector('#category');
const state = document.querySelector('#state');
const cards = [...document.querySelectorAll('.directory [data-event], .list [data-event]')];
function filter() {
  if (!filters) return;
  const q = search.value.trim().toLocaleLowerCase('zh-TW');
  let count = 0;
  cards.forEach(c => {
    const show = (!q || c.dataset.search.toLocaleLowerCase('zh-TW').includes(q))
      && (category.value === 'all' || category.value === c.dataset.category)
      && (state.value === 'all' || state.value === c.dataset.state);
    c.hidden = !show;
    if (show) count++;
  });
  document.querySelector('#result-count').textContent = `共 ${count} 場活動`;
  document.querySelector('#empty').hidden = count !== 0;
  const url = new URL(location.href);
  for (const [k, v] of [['q', search.value], ['category', category.value], ['state', state.value]]) {
    if (v && v !== 'all') url.searchParams.set(k, v); else url.searchParams.delete(k);
  }
  history.replaceState(null, '', url);
}
if (filters) {
  filters.hidden = false;
  const query = new URLSearchParams(location.search);
  search.value = query.get('q') || '';
  for (const [key, el] of [['category', category], ['state', state]]) {
    if ([...el.options].some(o => o.value === query.get(key))) el.value = query.get(key);
  }
  search.addEventListener('input', filter);
  category.addEventListener('change', filter);
  state.addEventListener('change', filter);
  document.querySelector('#reset').addEventListener('click', () => {
    search.value = ''; category.value = 'all'; state.value = 'all'; filter(); search.focus();
  });
  filter();
}

/* ---------- Registration status (re-checked in the browser, Taipei time) ----------
   A static build can go stale after the deadline, so on load and on resume we
   replace any still-open registration call-to-action once the deadline passes. */
const labels = {open: '開放報名', closed: '報名已截止', past: '活動已結束'};
let data = [];
function refreshStatus() {
  for (const event of data) {
    const value = getStatus(event);
    document.querySelectorAll(`[data-status="${event.slug}"]`).forEach(el => {
      el.textContent = labels[value];
      el.className = `tag status-${value}`;
    });
    document.querySelectorAll(`[data-event="${event.slug}"]`).forEach(el => { el.dataset.state = value; });
    document.querySelectorAll(`[data-registration="${event.slug}"]`).forEach(box => {
      if (value === 'open' || !box.querySelector('[data-register]')) return;
      const tpl = box.querySelector('template');
      if (!tpl) return;
      const frag = tpl.content.cloneNode(true);
      frag.querySelectorAll('.closed-message').forEach(m => { m.textContent = labels[value]; });
      const root = document.body.dataset.root || '';
      frag.querySelectorAll('a[href]').forEach(a => {
        const h = a.getAttribute('href');
        if (!/^(https?:|#)/.test(h)) a.setAttribute('href', root + h.replace(/^(\.\.\/)+/, ''));
      });
      box.replaceChildren(frag);
    });
  }
  if (filters) filter();
}
fetch(new URL('./events.json', import.meta.url))
  .then(r => { if (!r.ok) throw new Error('events unavailable'); return r.json(); })
  .then(events => { data = events; refreshStatus(); })
  .catch(() => { /* The pre-rendered content remains readable when offline. */ });
document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshStatus(); });
setInterval(refreshStatus, 60000);

/* ---------- Motion: header depth, scroll reveal, list refresh ----------
   All of this is decoration. Reveal classes are only added when motion is allowed,
   so content is never hidden for reduced-motion users or if this script fails. */
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 8);
  onScroll();
  addEventListener('scroll', onScroll, {passive: true});
}
if (!calm && 'IntersectionObserver' in window) {
  const targets = document.querySelectorAll([
    'main .section-heading', '.trust-grid > div', '.cards > .event-card', '.mission-lead', '.mission-intro',
    '.mission-row', '.help-banner', '.manifesto', '.prose', '.topic-card', '.step', '.visit-card', '.faq details',
    '.course-content section', '.course-content .notice', '.outline-item', '.enrollment', '.results-line', '.filters'
  ].join(','));
  const seen = new Map();
  const io = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target;
      el.classList.add('in-view');
      io.unobserve(el);
      // Hand control back to the component's own hover/transition rules once revealed.
      const done = () => { el.classList.remove('reveal', 'in-view'); el.style.removeProperty('--i'); };
      el.addEventListener('transitionend', e => { if (e.propertyName === 'opacity') done(); }, {once: true});
      setTimeout(done, 1800);
    }
  }, {rootMargin: '0px 0px -8% 0px', threshold: 0.08});
  targets.forEach(el => {
    const group = el.parentElement;
    const index = seen.get(group) || 0;
    seen.set(group, index + 1);
    el.style.setProperty('--i', Math.min(index, 5));
    el.classList.add('reveal');
    io.observe(el);
  });
}
if (filters && !calm) {
  for (const el of [search, category, state]) {
    el.addEventListener(el === search ? 'input' : 'change', () => {
      cards.forEach(c => { c.classList.remove('refresh'); void c.offsetWidth; if (!c.hidden) c.classList.add('refresh'); });
    });
  }
}
