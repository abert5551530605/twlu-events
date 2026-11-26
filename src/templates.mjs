import {events, association as a, status, labels, dateLabel, weekday} from './events.mjs';

export const esc = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));

/* ---------- Icons: one outline set (Lucide-style), shared as an inline sprite ---------- */
const ICONS = {
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  'map-pin': '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7"/>',
  'arrow-up-right': '<path d="M7 17 17 7M7 7h10v10"/>',
  'arrow-up': '<path d="M12 19V5M5 12l7-7 7 7"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  scale: '<path d="M12 3v18M5 21h14M5 7h14"/><path d="m5 7-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
  map: '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
  bookmark: '<path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  coffee: '<path d="M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M6 2v3M10 2v3M14 2v3"/>',
  'calendar-check': '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4"/>',
};
const icon = (name, cls = '') => `<svg class="icon${cls ? ' ' + cls : ''}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${Object.entries(ICONS).map(([n, d]) => `<symbol id="i-${n}" viewBox="0 0 24 24">${d}</symbol>`).join('')}</defs></svg>`;
const topicIcon = {'權利與登記': 'scale', '土地利用': 'map', '產業與開發': 'layers'};

const brandMark = '<svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><rect width="64" height="64" rx="14" fill="currentColor"/><g fill="none" stroke-linecap="round" stroke-width="4"><path d="M10 44c9-2 11-14 22-14s13 12 22 10" stroke="#F5B14C"/><path d="M10 32c9-2 11-14 22-14s13 12 22 10" stroke="#fff" stroke-opacity=".75"/><path d="M10 20c9-2 11-8 22-8s13 6 22 4" stroke="#fff" stroke-opacity=".4"/></g></svg>';

/* ---------- Small shared components ---------- */
const tag = e => `<span class="tag status-${status(e)}" data-status="${e.slug}">${labels[status(e)]}</span>`;
const href = e => `events/${e.slug}.html`;
const parts = date => ({y: date.slice(0, 4), m: String(+date.slice(5, 7)), mm: date.slice(5, 7), d: date.slice(8), w: weekday(date)});
const link = (url, text, cls = 'text-link', attrs = '') => `<a class="${cls}" href="${esc(url)}"${attrs}>${text}${icon('arrow-up-right')}</a>`;
const go = (url, text, cls = 'button') => `<a class="${cls}" href="${esc(url)}">${text}${icon('arrow-right')}</a>`;
const eyebrow = t => `<p class="eyebrow">${t}</p>`;

function pageHero({eyebrow: eb, title, lead, crumbs}) {
  return `<section class="page-hero on-dark"><div class="container">${crumbs || ''}${eyebrow(eb)}<h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div></section>`;
}

/* ---------- Layout ---------- */
export function layout({title, content, nav, depth, path}) {
  const prefix = depth ? '../' : '';
  // Templates use project-relative paths; rewrite only local URL attributes.
  content = content.replace(/(href|src)="(?!https?:|#|mailto:|tel:)([^"]+)"/g, (_, attr, url) => `${attr}="${prefix}${url}"`);
  const navs = [['home', 'index.html', '首頁'], ['events', 'events.html', '活動與課程'], ['about', 'about.html', '關於學會'], ['help', 'help.html', '參加指南']];
  const site = process.env.SITE_URL?.replace(/\/$/, '');
  const desc = '新北市土地利用學會活動與課程。探索土地利用、權利登記與產業開發講座，查閱課程內容、時間、地點與報名資訊。';
  const fullTitle = path === 'index.html' ? `${a.name}｜活動與課程` : `${esc(title)}｜${a.name}`;
  return `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#142766">
<script>document.documentElement.classList.add('js');</script>
<title>${fullTitle}</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:locale" content="zh_TW">
${site ? `<link rel="canonical" href="${esc(site)}/${path}"><meta property="og:url" content="${esc(site)}/${path}">` : ''}
<link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@600;700&display=swap">
<link rel="stylesheet" href="${prefix}assets/style.css">
<script type="module" src="${prefix}assets/app.js"></script>
</head>
<body data-root="${prefix}">
${sprite}
<a class="skip" href="#main">跳到主要內容</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="${prefix}index.html" aria-label="${a.name}首頁">${brandMark}<span class="brand-text"><strong>${a.name}</strong><small>活動與課程</small></span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" hidden><span>選單</span>${icon('menu', 'i-open')}${icon('x', 'i-close')}</button>
    <nav id="main-nav" aria-label="主要導覽">
      ${navs.map(([key, url, text]) => `<a href="${prefix}${url}"${nav === key ? ' aria-current="page"' : ''}>${text}</a>`).join('')}
      <a class="nav-ext" href="${a.official}">學會官網${icon('arrow-up-right')}</a>
    </nav>
  </div>
</header>
<main id="main" tabindex="-1">${content}</main>
<footer class="site-footer on-dark">
  <div class="container footer-grid">
    <div class="footer-about">
      <a class="footer-brand" href="${prefix}index.html">${brandMark}<span>${a.name}</span></a>
      <p>以知識連結土地，以交流累積專業。</p>
      <small>活動與課程資訊平台</small>
    </div>
    <div>
      <h2>探索</h2>
      <ul>
        <li><a href="${prefix}events.html">所有活動與課程</a></li>
        <li><a href="${prefix}about.html">認識學會</a></li>
        <li><a href="${prefix}help.html">報名與交通指南</a></li>
      </ul>
    </div>
    <div>
      <h2>官方資訊</h2>
      <ul>
        <li><a href="${a.official}">學會原官網${icon('arrow-up-right')}</a></li>
        <li><a href="https://twlu.site/category/課程報名/">原始課程公告${icon('arrow-up-right')}</a></li>
      </ul>
      <small>資料核對：${a.verified}<br>課程異動以主辦單位公告為準。</small>
    </div>
  </div>
  <div class="container footer-bottom"><span>© ${new Date().getFullYear()} ${a.name}</span><a href="#main">回到頁面上方${icon('arrow-up')}</a></div>
</footer>
</body>
</html>`;
}

/* ---------- Event card (grid on home, rows on the directory) ---------- */
function card(e) {
  const p = parts(e.date);
  return `<article class="event-card" data-event="${e.slug}" data-search="${esc(`${e.title} ${e.speaker} ${e.topic} ${e.edition}`)}" data-category="${e.topic}" data-state="${status(e)}">
  <time class="ec-date" datetime="${e.date}"><span>${p.y} / ${p.mm}</span><strong>${p.d}</strong><span>星期${p.w}</span></time>
  <div class="ec-body">
    <div class="ec-meta">${tag(e)}<span class="ec-cat">${icon(topicIcon[e.topic] || 'book-open')}${e.topic}</span></div>
    <p class="ec-edition">${e.edition}</p>
    <h3 class="ec-title"><a href="${href(e)}">${e.title}</a></h3>
    <p class="ec-desc">${e.description}</p>
    <div class="ec-foot"><span class="ec-speaker">${icon('user')}${e.speaker}</span><span class="ec-more" aria-hidden="true">查看課程${icon('arrow-right')}</span></div>
  </div>
</article>`;
}

/* ---------- Home ---------- */
export function home() {
  const e = events[0];
  const p = parts(e.date);
  return `<section class="hero on-dark">
  <div class="container hero-grid">
    <div class="hero-copy">
      ${eyebrow('新北市土地利用學會 · 活動與課程')}
      <h1>讀懂土地，<br>讓專業<span class="em">扎根。</span></h1>
      <p class="lead">把法規帶進實務，把交流化為養分。與新北市土地利用學會一起，持續探索土地的可能。</p>
      <div class="actions">${go('events.html', '探索活動與課程', 'button on-dark-btn')}<a class="button ghost" href="about.html">認識學會</a></div>
    </div>
    <article class="featured" aria-labelledby="featured-title">
      <div class="featured-head"><span class="featured-label">本期專題講座</span>${tag(e)}</div>
      <div class="featured-main">
        <time class="featured-date" datetime="${e.date}"><strong>${p.m}<small>月</small>${p.d}<small>日</small></strong><span>${p.y} 年・星期${p.w}</span></time>
        <div>
          <p class="ec-edition">${e.edition}</p>
          <h2 id="featured-title">${e.title}</h2>
          <p class="featured-tagline">${e.tagline || e.description}</p>
        </div>
      </div>
      <ul class="facts">
        <li>${icon('user')}<span>講師</span><b>${e.speaker}</b></li>
        <li>${icon('clock')}<span>時間</span><b>09:30–16:45（含午休）</b></li>
        <li>${icon('map-pin')}<span>地點</span><b>${a.venue}・15 樓</b></li>
        <li>${icon('calendar-check')}<span>報名截止</span><b>${dateLabel(e.deadline)}</b></li>
      </ul>
      <div class="featured-actions" data-registration="${e.slug}">
        ${status(e) === 'open' ? `${link(e.registration, '前往官方報名頁', 'button', ' data-register')}` : ''}
        ${go(href(e), '課程內容', 'button secondary')}
        <template><span class="closed-message"></span>${go(href(e), '課程內容', 'button secondary')}</template>
      </div>
    </article>
  </div>
</section>

<section class="trust" aria-label="本站資訊說明">
  <div class="container trust-grid">
    <div>${icon('shield-check')}<p><b>依學會官網公告整理</b><span>核對日期 ${a.verified}</span></p></div>
    <div>${icon('calendar')}<p><b>2026 年度共 ${events.length} 場專題講座</b><span>每月一場，主題橫跨登記、土地利用與開發</span></p></div>
    <div>${icon('lock')}<p><b>本站不收集個人資料</b><span>報名在官方 BeClass 表單填寫</span></p></div>
  </div>
</section>

<section class="section container">
  <div class="section-heading"><div>${eyebrow('COURSES & EVENTS')}<h2>每一堂課，都是新的視角。</h2></div><a class="text-link" href="events.html">所有活動${icon('arrow-right')}</a></div>
  <div class="cards">${events.slice(0, 3).map(card).join('')}</div>
</section>

<section class="mission">
  <div class="container mission-grid">
    <div class="mission-lead">
      ${eyebrow('OUR PURPOSE')}
      <h2>讓知識與土地，<br>產生更深的連結。</h2>
      <a class="text-link" href="about.html">了解學會宗旨${icon('arrow-right')}</a>
    </div>
    <div class="mission-body">
      <p class="mission-intro">學會關注土地利用法規與政策，透過資訊整合與專業研習，讓實務經驗成為可以持續交流的知識。</p>
      ${[['book-open', '法規研習', '從條文出發，理解土地利用的制度與規範。'], ['users', '實務交流', '從真實議題切入，在不同觀點中累積判斷。'], ['link', '資訊連結', '整合課程與活動資訊，讓學習更容易開始。']].map(([i, t, d]) => `<div class="mission-row"><span class="icon-tile">${icon(i)}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}
    </div>
  </div>
</section>

<section class="section container">
  <div class="help-banner">
    <div>${eyebrow('FIRST TIME HERE?')}<h2>第一次參加？從這裡開始。</h2><p>報名方式、上課地點與常見問題，一次看清楚。</p></div>
    ${go('help.html', '查看參加指南')}
  </div>
</section>`;
}

/* ---------- Directory ---------- */
export function directory() {
  return `${pageHero({eyebrow: 'LEARN · CONNECT · GROW', title: '活動與課程', lead: '找到關心的議題，讓下一次學習更有方向。'})}
<section class="container section compact">
  <div class="filters" hidden>
    <div class="field field-search"><label for="search">搜尋課程或講師</label><div class="input-wrap">${icon('search')}<input type="search" id="search" placeholder="例如：抵押權、王世隆" autocomplete="off"></div></div>
    <div class="field"><label for="category">課程主題</label><div class="select-wrap"><select id="category"><option value="all">全部主題</option>${[...new Set(events.map(e => e.topic))].map(t => `<option>${t}</option>`).join('')}</select>${icon('chevron-down')}</div></div>
    <div class="field"><label for="state">活動狀態</label><div class="select-wrap"><select id="state"><option value="all">全部活動</option><option value="open">開放報名</option><option value="closed">報名已截止</option><option value="past">已結束活動</option></select>${icon('chevron-down')}</div></div>
  </div>
  <div class="results-line"><h2>2026 年度課程</h2><p id="result-count" aria-live="polite">共 ${events.length} 場活動</p></div>
  <div class="cards list">${events.map(card).join('')}</div>
  <div id="empty" class="empty" hidden>${icon('search')}<h2>沒有找到符合的活動</h2><p>試試其他關鍵字，或清除篩選重新查看。</p><button class="button secondary" id="reset" type="button">清除所有篩選</button></div>
  <p class="source-note">更多歷年課程，可至${link('https://twlu.site/category/課程報名/', '學會原官網')}查閱。</p>
</section>`;
}

/* ---------- Event detail ---------- */
export function detail(e) {
  const p = parts(e.date);
  const open = status(e) === 'open';
  const crumbs = `<nav class="breadcrumb" aria-label="頁面路徑"><a href="index.html">首頁</a>${icon('chevron-down', 'sep')}<a href="events.html">活動與課程</a>${icon('chevron-down', 'sep')}<span aria-current="page">課程詳情</span></nav>`;
  return `<section class="page-hero detail-hero on-dark">
  <div class="container detail-heading">
    <div>
      ${crumbs}
      <div class="hero-tags">${tag(e)}<span class="hero-topic">${icon(topicIcon[e.topic] || 'book-open')}${e.topic}</span></div>
      <p class="eyebrow">${e.edition}</p>
      <h1>${e.title}</h1>
      <p class="lead">${e.description}</p>
    </div>
    <time class="date-tile" datetime="${e.date}"><span>${p.y} / ${p.mm}</span><strong>${p.d}</strong><span>星期${p.w}</span></time>
  </div>
</section>
<div class="container detail-layout">
  <aside class="enrollment" aria-label="參加資訊">
    <div class="enrollment-inner">
      <h2>參加資訊</h2>
      <dl>
        <div><dt>${icon('calendar')}上課日期</dt><dd>${dateLabel(e.date)}</dd></div>
        <div><dt>${icon('clock')}上課時間</dt><dd>09:30–12:30<br>13:45–16:45</dd></div>
        <div><dt>${icon('user')}授課講師</dt><dd>${e.speaker}</dd></div>
        <div><dt>${icon('map-pin')}上課地點</dt><dd>${a.venue}<br><span>${a.address}</span></dd></div>
        <div><dt>${icon('calendar-check')}報名截止</dt><dd>${dateLabel(e.deadline)}</dd></div>
      </dl>
      <div class="enrollment-action" data-registration="${e.slug}">
        ${open ? `<p>費用與名額請至官方報名頁確認。</p>${link(e.registration, '前往官方報名頁', 'button', ' data-register')}<small>前往 BeClass 填寫報名資料</small>`
          : `<div class="closed-message">${labels[status(e)]}</div><p>歡迎至活動總覽查看其他課程。</p><a class="button secondary" href="events.html">查看所有活動</a>`}
        <template><div class="closed-message"></div><p>歡迎至活動總覽查看其他課程。</p><a class="button secondary" href="events.html">查看所有活動</a></template>
      </div>
      <a class="map-link" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(a.address)}">${icon('map-pin')}開啟地圖導航${icon('arrow-up-right')}</a>
    </div>
  </aside>
  <article class="course-content">
    ${e.note ? `<div class="notice">${icon('info')}<div><strong>日期提醒</strong><p>${e.note}</p></div></div>` : ''}
    <section>
      ${eyebrow('COURSE OVERVIEW')}
      <h2>把觀念帶進真實情境。</h2>
      <p>這堂課以主題研習結合案例討論，讓法規、程序與實務經驗相互對照。您可以先閱讀下方課程重點，再查看參加資訊。</p>
      <ol class="outline">${e.outline.map(([t, d], i) => `<li class="outline-item"><span class="num">0${i + 1}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
    </section>
    <section>
      ${eyebrow('YOUR DAY OF LEARNING')}
      <h2>一天的學習安排</h2>
      <ol class="schedule">
        <li>${icon('book-open')}<time>09:30–12:30</time><span>上午課程 · 3 小時</span></li>
        <li class="break">${icon('coffee')}<time>12:30–13:45</time><span>午休</span></li>
        <li>${icon('book-open')}<time>13:45–16:45</time><span>下午課程 · 3 小時</span></li>
      </ol>
      <p class="muted">全天共 6 小時；實際課程安排以主辦單位現場說明為準。</p>
    </section>
    ${e.fees ? `<section>
      <h2>當期費用紀錄</h2>
      <p>本活動已結束，以下保留原公告費用供查閱。</p>
      <div class="table-wrap"><table><caption class="sr-only">十月份講座費用</caption><thead><tr><th scope="col">身分與方案</th><th scope="col">時段</th><th scope="col">費用（元）</th></tr></thead><tbody>${e.fees.map(r => `<tr>${r.map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <p class="muted">半天方案不含午餐。原報名表的銀行名稱與帳號後五碼均為選填，供查帳使用。</p>
    </section>` : ''}
    ${e.poster ? `<section>
      <h2>活動海報</h2>
      <figure class="poster-frame"><img class="poster" src="${e.poster}" alt="115年十月份專題講座原始海報；日期、地點、講師與課程內容已列於本頁文字" width="1152" height="1536" loading="lazy"><figcaption>歷史活動海報（完整比例）</figcaption></figure>
    </section>` : ''}
    <section class="sources">
      <h2>公告與相關資訊</h2>
      <p>本頁依學會公開公告整理，課程異動、費用與報名規定請以原公告及報名頁為準。</p>
      <p>${link(e.source, '查看學會原始公告')}</p>
      ${e.legacy ? `<p>${link(e.legacy, '十月份活動原網站（歷史頁面）')}</p>` : ''}
    </section>
  </article>
</div>
<section class="container section related">
  <div class="section-heading"><h2>繼續探索其他課程</h2><a class="text-link" href="events.html">活動總覽${icon('arrow-right')}</a></div>
  <div class="cards">${events.filter(x => x.slug !== e.slug).slice(0, 3).map(card).join('')}</div>
</section>`;
}

/* ---------- About ---------- */
export function about() {
  return `${pageHero({eyebrow: 'ABOUT THE ASSOCIATION', title: '專業扎根，<br>價值向前。', lead: '新北市土地利用學會'})}
<section class="container about-grid section">
  <div class="manifesto">
    ${eyebrow('學會宗旨')}
    <blockquote><p>研習土地法規，<br>連結資訊與實務，<br>探索土地的價值。</p></blockquote>
    <small>依學會官網所載宗旨整理</small>
  </div>
  <div class="prose">
    <h2>從土地出發，持續學習。</h2>
    <p>新北市土地利用學會以土地利用法規的研習為核心，重視土地資訊的整合、土地政策的推動與土地價值的創造。</p>
    <p>在課程裡，土地利用不只是條文與名詞。透過不同領域講師的觀點，從權利登記、土地使用到產業開發，將抽象規定與實際案例連結起來。</p>
    <p>這個活動平台讓您更容易找到課程、掌握時間與地點，也讓過往主題成為下一次學習的起點。</p>
    ${link(a.official, '前往學會原官網')}
  </div>
</section>
<section class="mission">
  <div class="container section">
    ${eyebrow('FIELDS OF LEARNING')}
    <h2>從不同面向，讀懂土地。</h2>
    <div class="topic-grid">${[['scale', '01', '權利與登記', '意定監護、遺囑繼承與抵押權，從制度走向案例。'], ['map', '02', '土地利用', '理解土地使用與相關法規，建立實務判讀的基礎。'], ['layers', '03', '產業與開發', '結合產業需求、土地制度與開發策略，拓展觀點。']].map(([i, n, t, d]) => `<article class="topic-card"><div class="topic-top"><span class="icon-tile">${icon(i)}</span><span class="topic-num">${n}</span></div><h3>${t}</h3><p>${d}</p><a class="text-link" href="events.html?category=${encodeURIComponent(t)}">探索相關課程${icon('arrow-right')}</a></article>`).join('')}</div>
  </div>
</section>`;
}

/* ---------- Help ---------- */
export function help() {
  return `${pageHero({eyebrow: 'A SIMPLE GUIDE', title: '安心參加，從容學習。', lead: '第一次參加也沒關係，照著這三步開始。'})}
<section class="container section">
  <ol class="steps">${[['search', '01', '選擇課程', '先查看主題、課程重點、講師與上課日期，找到您有興趣的活動。'], ['file-text', '02', '確認並報名', '進入課程詳情，確認截止日期，再前往該活動的官方報名頁填寫資料。'], ['bookmark', '03', '保存報名資訊', '依報名頁說明確認結果與繳費方式，保存報名編號或通知，方便後續查詢。']].map(([i, n, t, d]) => `<li class="step"><div class="step-top"><span class="icon-tile">${icon(i)}</span><span class="topic-num">${n}</span></div><h2>${t}</h2><p>${d}</p></li>`).join('')}</ol>
  <div class="visit-grid">
    <div class="visit-card">
      ${eyebrow('GETTING HERE')}
      <h2>上課地點</h2>
      <h3>${a.venue}・15 樓</h3>
      <p>${a.address}</p>
      <p class="muted">此為本頁所列課程的上課場地，非學會辦公室。出發前請再次確認您所報名活動的地點。</p>
      ${link('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(a.address), '開啟 Google 地圖', 'button secondary')}
    </div>
    <div class="faq">
      <h2>常見問題</h2>
      <details><summary>費用與全天、半天如何選擇？${icon('chevron-down')}</summary><p>請以各場課程的官方報名頁為準。不同課程的費用與時段選項可能不同，請勿沿用過往活動的價格。</p></details>
      <details><summary>如何查詢、修改或取消報名？${icon('chevron-down')}</summary><p>請使用報名確認通知中的查詢連結，或依該場活動報名頁的聯絡方式洽詢承辦人。本平台不公開報名者資料。</p></details>
      <details><summary>可以在這裡直接填寫個人資料嗎？${icon('chevron-down')}</summary><p>本平台提供活動資訊與報名入口。最新課程會連至學會公告的 BeClass 報名頁，個人資料在該報名服務填寫。</p></details>
      <details><summary>找不到要參加的課程怎麼辦？${icon('chevron-down')}</summary><p>您可以先到活動總覽搜尋講師或主題；更多歷年活動請查看學會原官網的課程公告。</p></details>
    </div>
  </div>
  <div class="help-banner">
    <div><h2>還有其他問題？</h2><p>請至學會原官網或該場報名頁查看最新聯絡資訊。</p></div>
    ${link(a.official, '前往學會原官網', 'button')}
  </div>
</section>`;
}

/* ---------- 404 ---------- */
export function notFound() {
  return `<section class="section container not-found">${eyebrow('404')}<h1>這個頁面暫時找不到。</h1><p>您可以回到首頁，或從活動總覽重新尋找課程。</p><div class="actions">${go('index.html', '回到首頁')}<a class="button secondary" href="events.html">活動與課程</a></div></section>`;
}
