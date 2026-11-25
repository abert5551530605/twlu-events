# 新北市土地利用學會｜活動與課程

本 repository 是「新北市土地利用學會」母網站與活動資訊服務的單一整合專案。

## Website 2.0

本分支正在以 UI UX Pro Max 的設計原則，重新建構完整的靜態網站前端：

- 首頁：學會資訊入口、活動摘要與主要導覽
- 活動與課程：活動列表、狀態篩選與歷史紀錄
- 活動詳情：保留已結束活動資訊，不提供過期報名
- 關於學會：網站定位與正式機構資訊區
- 聯絡資訊：待官方聯絡資料確認後補齊

### 技術方式

- 原生 HTML、CSS、JavaScript，無前端框架與執行期套件依賴。
- 共用樣式與互動程式位於 `assets/css/site.css`、`assets/js/site.js`。
- 可部署至靜態網站託管服務；目前沒有設定自動正式部署。
- 以 GitHub Pull Request 作為預覽與審查流程。

## 設計原則

- UI UX Pro Max：Accessible & Ethical + Minimalism & Swiss Style。
- 高對比、清晰字級、語意化 HTML、鍵盤導覽、可見焦點狀態。
- 手機優先、響應式排版、44px 以上主要觸控目標。
- 尊重 `prefers-reduced-motion`。
- 不使用未經核實的活動、講者、場地、聯絡資料或機構統計。

## 既有網站入口（保留，不會由 GitHub 提交自動覆蓋）

- 母網站：<https://twlu-events.rtfghggytjjj.chatgpt.site/>
- 2026 年 10 月活動頁：<https://land-seminar-october-2026.rtfghggytjjj.chatgpt.site>

GitHub 提交不會自動更新以上 ChatGPT Sites 頁面。正式切換前必須另外確認部署方式、網域、表單串接及內容完整性。

## 報名後端與資料安全

原有報名後端為 Google Apps Script Web App 與 Google Sheets。新版前端目前**尚未連接報名 API**，因為目前 repository 尚無原始 Apps Script 程式碼、完整欄位規格或 API request/response 範例。

接回後端前必須先確認並保留：
- 原始欄位名稱、選項代碼與驗證規則
- request ID 冪等性
- 重複報名保護
- 成功、失敗、額滿與截止等回應狀態

禁止將 `SHEETS_SECRET`、API keys、tokens、私人憑證、報名者個資或含個資的試算表提交至 Git。

## 目前已知資料限制

目前可核實的活動資料只有 2026 年 10 月 31 日專題講座日期與活動類型；該活動已結束。講題、講者、場地、完整時間及其他歷史頁內容仍待舊站資料匯入。

正式學會沿革、宗旨、組織、聯絡電話、地址、電子郵件及社群網址也待官方資料確認。網站以清楚標示資料缺口的方式呈現，不會自行捏造。

## 專案邊界

- 本 repository 僅服務「新北市土地利用學會｜活動與課程」。
- 不得匯入、修改或部署 Northern Moluccas Digital Historical Atlas 專案。
- 母網站與活動頁維持同一 repository、共用品牌與維護流程。
- 不覆蓋仍在使用的 ChatGPT Sites 正式頁面。

## 本機預覽

直接以瀏覽器開啟 `index.html` 即可預覽。所有頁面均為靜態 HTML，可使用任何靜態 HTTP server 進行完整測試。
