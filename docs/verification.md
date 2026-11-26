# 驗證紀錄（2026-11-26）

## 自動檢查
`npm run check`：建置 9 個 HTML 頁面（含 404），4 項測試通過（台北時區截止邊界、本機連結與錨點、十月份歷史狀態不輸出報名、最新活動官方報名網址）。

## 瀏覽器檢查（Google Chrome 153 + Playwright）
- 6 個代表頁面（首頁、活動總覽、關於、指南、十一月與十月詳情）於 375 / 768 / 1440 寬度：皆無橫向捲動、無 JavaScript 錯誤。
- 已人工檢視 1440 首頁與詳情、375 首頁與活動總覽截圖。
- 尚未執行 axe / Lighthouse / 跨瀏覽器（Safari、Firefox）測試。

## 設計依據
skill 版本 8db36338810d0942567b97ce439affd1619fcf31；`design-system/twlu-events/MASTER.md` 為該版本產生（Accessible & Ethical、深藍 + 琥珀 CTA、Noto Serif/Sans TC）。

## 部署
`.github/workflows/pages.yml` 於 push 到 main 時建置並發佈 `dist/` 到 GitHub Pages（SITE_URL 指向 github.io 網址）。未測試或寫入任何報名資料，未呼叫既有 Apps Script 後端。

## 動畫更新（2026-11-26）
- `npm run check`：建置 9 頁、5 項測試通過（新增動畫安全測試：減少動態效果區塊存在、隱藏狀態只在 `.js .reveal`、不使用 `transition: all`）。
- Chrome + Playwright（1280 寬）於 5 個頁面實測：一般模式下捲動後無卡在不可見的元素、無橫向溢位、無 JS 錯誤、卡片 hover 無延遲；`prefers-reduced-motion: reduce` 模式下載入即全部可見。
- 未實測：跨頁淡入淡出（View Transitions）於各瀏覽器的表現、Safari / Firefox、低階裝置效能。

## 課程瀏覽與載入優化（2026-11-26）

- Node 24.22.3 執行 `npm run check`，產生 9 頁，5 項通過，0 項略過。
- `npm run preview` 搭配 Chromium 156 和 Playwright。9 頁 × 375、768、1440 px × 一般及減少動態效果，共 54 組，皆無橫向溢位、Console error 或未處理 JS 例外。減少動態效果時標題及進場元素可見。另檢視三種寬度的活動總覽截圖。
- 驗證搜尋及清除後恢復 4 場活動、詳情頁鍵盤跳至時段、FAQ 全開與全關、行動選單 Escape 關閉，以及停用 JS 後完整列出 4 場。十月份 WebP 海報可解碼並可開啟 JPEG 原圖。
- 模擬台北時間 12 月 1 日載入尚含報名按鈕的靜態詳情頁，瀏覽器撤下過期連結，保留可返回活動總覽的相對路徑。
- 海報預覽由 490,344 降至 309,808 bytes。測試機有本機 Noto 字型。外部 Google Fonts 服務在此環境回應代理 403，未驗證缺少本機字型時的遠端下載。未測實際載入秒數、Lighthouse、Safari 或 Firefox。
