# 驗證紀錄（2026-11-26）

## 自動檢查
`npm run check`：建置 10 個 HTML 頁面（含 404），4 項測試通過（台北時區截止邊界、本機連結與錨點、十月份歷史狀態不輸出報名、最新活動官方報名網址）。

## 瀏覽器檢查（Google Chrome 153 + Playwright）
- 6 個代表頁面（首頁、活動總覽、關於、指南、十一月與十月詳情）於 375 / 768 / 1440 寬度：皆無橫向捲動、無 JavaScript 錯誤。
- 已人工檢視 1440 首頁與詳情、375 首頁與活動總覽截圖。
- 尚未執行 axe / Lighthouse / 跨瀏覽器（Safari、Firefox）測試。

## 設計依據
skill 版本 8db36338810d0942567b97ce439affd1619fcf31；`design-system/twlu-events/MASTER.md` 為該版本產生（Accessible & Ethical、深藍 + 琥珀 CTA、Noto Serif/Sans TC）。

## 部署
`.github/workflows/pages.yml` 於 push 到 main 時建置並發佈 `dist/` 到 GitHub Pages（SITE_URL 指向 github.io 網址）。未測試或寫入任何報名資料，未呼叫既有 Apps Script 後端。
