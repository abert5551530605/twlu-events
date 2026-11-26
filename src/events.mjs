export const association = {
  name: '新北市土地利用學會', official: 'https://twlu.site/', verified: '2026-11-26',
  venue: '板橋區農會', address: '新北市板橋區府中路29-1號15樓',
  times: '09:30–12:30 ／ 13:45–16:45',
};
const article = (date, title) => `https://twlu.site/${date}/${encodeURIComponent(title)}/`;
export const events = [
  {
    slug: '2026-mortgage', edition: '115年十一月份專題講座', title: '抵押權法令實務眉角解析',
    topic: '權利與登記', date: '2026-12-05', deadline: '2026-11-30', speaker: '黃偉政 老師',
    description: '從抵押權的基本觀念走進實務現場，串聯登記、拍賣與塗銷的關鍵環節，透過案例梳理不同階段需要留意的問題。',
    tagline: '從登記到實行，梳理抵押權的關鍵問題。',
    note: '本場為「十一月份專題講座」，實際上課日期為 12 月 5 日（六）。',
    source: article('2026/11/05', '新北市土地利用學會115年十一月份專題講座'),
    registration: 'https://www.beclass.com/rid=31528ee6ae84276cc736',
    outline: [
      ['掌握抵押權的基礎', '比較普通與最高限額抵押權，理解擔保債權與標的物範圍。'],
      ['理解拍賣與權利實行', '從法院拍賣程序，認識租賃、地上權及價金分配的處理問題。'],
      ['梳理消滅與塗銷情境', '討論不同存續狀況下的抵押權消滅，以及塗銷登記實務。'],
      ['連結案例與日常業務', '以共有土地分割、增建物及借名登記等情境，整理實務上的判斷重點。']
    ]
  },
  {
    slug: '2026-october', edition: '115年十月份專題講座', title: '意定監護與遺囑登記實務',
    topic: '權利與登記', date: '2026-10-31', deadline: '2026-10-26', speaker: '鄭竹祐 老師',
    description: '以財產安排與登記實務為主軸，從意定監護的法令架構、法院許可案例，到遺囑繼承登記的審查細節，建立更完整的理解。',
    source: article('2026/10/02','新北市土地利用學會115年十月份專題講座'),
    legacy: 'https://land-seminar-october-2026.rtfghggytjjj.chatgpt.site/',
    poster: 'assets/october-poster.jpg',
    outline: [['意定監護法令與實務', '從民法規定出發，研討監護人處分財產的法院許可案例，並延伸理解遺囑信託與未成年人保護。'], ['遺囑登記事件重點', '從常見登記爭議切入，討論公同共有與遺囑繼承的關係，以及登記機關的審查觀點。']],
    fees: [['會員全天','整天','1,200'],['非會員全天','整天','2,400'],['會員半天','上午或下午','800'],['非會員半天','上午或下午','1,600']]
  },
  {
    slug:'2026-september', edition:'115年九月份專題講座', title:'學會用簡單的法條，解密高含金量物件',
    topic:'土地利用', date:'2026-09-19', deadline:'2026-09-14', speaker:'王世隆 總經理',
    description:'以法條與案例串起土地資訊判讀、國土計畫及共有物分割議題，練習在實務情境中辨識機會與風險。',
    source:article('2026/09/01','新北市土地利用學會115年九月份專題講座'),
    outline:[['從資訊到法規','透過網站資訊與國土計畫相關規定，建立土地案件的初步理解。'],['以案例辨識風險','結合變更編定、共有物分割及投資仲介案例，探討業務上的注意事項。']]
  },
  {
    slug:'2026-august', edition:'115年八月份專題講座', title:'工業用地開發策略與產業布局實務',
    topic:'產業與開發', date:'2026-08-22', deadline:'2026-08-16', speaker:'王世隆 總經理',
    description:'由產業需求出發，探討工業土地的供需、法規與開發模式，連結區位判讀及風險管理。',
    source:article('2026/07/30','新北市土地利用學會115年八月份專題講座-題'),
    outline:[['看懂產業與土地需求','梳理供應鏈變化與工業土地市場，討論產業園區的制度差異。'],['開發策略與風險判讀','從法規、土地開發模式與案例，認識產品定位和區位分析。']]
  }
];
export function status(event, now = new Date()) {
  if (now.getTime() > Date.parse(`${event.date}T16:45:00+08:00`)) return 'past';
  if (now.getTime() > Date.parse(`${event.deadline}T23:59:59+08:00`) || !event.registration) return 'closed';
  return 'open';
}
export const labels = {open:'開放報名', closed:'報名已截止', past:'活動已結束'};
export function dateLabel(date) {
  const d = new Date(`${date}T12:00:00+08:00`);
  return `${d.getUTCFullYear()} 年 ${d.getUTCMonth()+1} 月 ${d.getUTCDate()} 日（${'日一二三四五六'[d.getUTCDay()]}）`;
}
export function weekday(date) {
  return '日一二三四五六'[new Date(`${date}T12:00:00+08:00`).getUTCDay()];
}
