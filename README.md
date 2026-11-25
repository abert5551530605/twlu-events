# 新北市土地利用學會｜活動與課程

本 repository 是學會官方網站與活動報名服務的**單一整合專案**。母網站與 2026 年 10 月專題講座報名頁屬於同一套系統，應共用品牌、導覽、設計規範與維護流程，不應拆成互不相關的 repository。

## 系統範圍

- **母網站**：學會介紹、最新消息、活動與課程、會員及聯絡資訊。
- **活動模組**：活動介紹、報名表單、報名狀態及管理流程。2026 年 10 月 31 日專題講座頁面納入此模組，保留作為歷史活動頁與未來活動頁的實作參考。
- **報名後端**：既有 Google Apps Script Web App 與 Google Sheets。前端與後端的契約應維持一致；不得將金鑰或機密設定寫入前端或 Git。

## 既有網站入口

- 母網站：<https://twlu-events.rtfghggytjjj.chatgpt.site/>
- 2026 年 10 月活動頁：<https://land-seminar-october-2026.rtfghggytjjj.chatgpt.site>

以上是目前既有的 ChatGPT Sites 網址。GitHub repository 的提交不代表這些 Sites 網址會自動更新；正式切換前必須另行確認部署方式、功能與資料串接，不能直接中斷現有服務。

## Repository 身分與邊界

- GitHub：`abert5551530605/twlu-events`
- 本 repository 只服務「新北市土地利用學會｜活動與課程」。
- 不得匯入、修改或引用北摩鹿加數位歷史圖集（`northern-moluccas-historical-atlas`）的程式碼、資料庫、部署設定或資產。
- 母網站與十月活動報名頁應在本 repository 內整合維護。

## 初步技術盤點

先前對母網站的初步盤點為輕量靜態網站；活動報名流程另有 Google Apps Script `doPost` Web App 與 Google Sheets。完整前端原始碼、資產與 Apps Script 原始碼尚待匯入後再確認，不應在未檢查前臆測框架或目錄。

## 建議目錄方向

待原始碼匯入及盤點後，再依實際技術結構調整；預期以功能邊界整理：

- `apps/main-site/`：母網站
- `apps/events/`：活動頁與報名介面
- `integrations/google-apps-script/`：經確認後納入版本控制的 Apps Script 程式碼（不得包含機密）
- `docs/`：架構、部署、資料欄位與維運說明

此為目標方向，不代表目前已存在這些程式檔。

## 安全原則

- `SHEETS_SECRET`、API token、私人憑證及其他機密只能存放於受控環境變數或 Apps Script Properties。
- 不得將報名者個資、正式名單或含個資的試算表匯出檔提交至 Git。
- 修改報名 API 前，先確認既有欄位、方案代碼、重複報名防護及 request ID 冪等邏輯。
- 任何正式部署都先做預覽與測試，不直接覆蓋仍在使用的網站。
