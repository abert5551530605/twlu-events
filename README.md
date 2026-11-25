# 新北市土地利用學會｜官方網站改版

本 repository 專用於新北市土地利用學會官方網站的重新設計與遷移。

## 內容來源

- 官方原網站：<https://twlu.site/>
- 最新消息：<https://twlu.site/category/最新消息/>
- 課程報名：<https://twlu.site/category/課程報名/>
- 理監事名單：<https://twlu.site/理監事名單/>

官方網站是學會宗旨、理監事名單、活動公告與公開報名連結的主要依據。已將 2026 年 12 月 5 日專題講座及 2025–2026 年部分歷史活動整理進新版。

## Website 2.0 routes

- `index.html` — 首頁、學會宗旨、最新活動
- `events.html` — 最新課程與活動列表
- `event-2026-12-05.html` — 2026/12/5 抵押權法令實務眉角解析
- `event-2026-10-31.html` — 2026/10/31 歷史活動
- `archive.html` — 2025–2026 歷史活動
- `about.html` — 學會宗旨與服務方向
- `history.html` — 學會成立沿革
- `past-presidents.html` — 已核實的歷任理事長資料
- `documents.html` — 正式制度文件匯入狀態
- `membership.html` — 會員申請資訊（原文待確認）
- `organization.html` — 學會組織與制度文件入口
- `board.html` — 第八屆理監事名單
- `gallery.html` — 活動剪影與官方照片入口
- `contact.html` — 官方網站與報名資訊

## 技術

- 原生 HTML、CSS、JavaScript，無前端框架及執行期套件依賴。
- 共用樣式：`assets/css/site.css`
- 共用互動：`assets/js/site.js`
- GitHub Actions 執行靜態網站檢查。
- 可先部署到獨立 preview URL，再安排正式網域遷移。

## 報名系統邊界

已核實的 WordPress 原網站活動公告使用 BeClass 外部報名連結。先前 ChatGPT Sites 專案另有討論 Google Apps Script / Google Sheets 報名流程。兩者必須分開盤點，不得假設是同一個 API。

- 2026/12/5 報名：<https://www.beclass.com/rid=31528ee6ae84276cc736>
- 不得猜測或替換報名 API。
- 不得提交 SHEETS_SECRET、API keys、tokens、私人憑證或報名者個資。
- 正式報名流程需在預覽環境確認連結、狀態、截止日期與錯誤處理。

## 尚待匯入的原始資產

目前已確認 WordPress 網站保留多篇活動照片、活動剪影及附件，但尚未取得這些檔案的可下載副本。正式切換網域前，必須匯出原始 Logo、照片、PDF 及其他媒體檔，放入 repository 並改用本地路徑。

目前頁首的幾何圖形只是暫用 UI 圖樣，不是學會正式 Logo。

## 部署原則

- 保留 <https://twlu.site/> 正式 WordPress 網站，不在此階段修改。
- 預覽站使用獨立 URL。
- 不將 `twlu.site` DNS 指向 GitHub Pages，直到內容、圖片、報名流程、舊網址導向及行動版檢查全部通過。
- Earlier ChatGPT Sites project URLs are separate legacy sources; do not confuse them with the official WordPress source.
- 本 repository 不得匯入、修改或部署 Northern Moluccas Digital Historical Atlas。
