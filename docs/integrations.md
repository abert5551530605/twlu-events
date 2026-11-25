# 整合與發佈邊界

同一個倉庫、同一個學會品牌：母網站與活動詳情共用導覽與設計系統。所有新版課程頁的品牌連結均返回新版首頁。

## 既有正式服務

- 母網站：https://twlu-events.rtfghggytjjj.chatgpt.site/
- 十月份原活動頁：https://land-seminar-october-2026.rtfghggytjjj.chatgpt.site/
- 官方內容網站：https://twlu.site/

本次重設計未覆蓋上述服務。既有十月份報名後端使用 Google Apps Script 與 Google Sheets，本次沒有更換端點或金鑰，沒有寫入任何報名資料，也沒有匯入私人表單資料。

## 後端保留要求

如後續匯入原表單與伺服器端程式，需保留 schemaVersion 2、requestId 冪等性、重複報名保護、人機驗證、伺服器驗證、金鑰僅在伺服器／Script Properties 的要求。銀行名稱及帳號後五碼為選填。會員／非會員全天與半天價格須按該活動原設定，半天為上午或下午且不用餐，全天為整天。

現在已過十月份報名期限；不得以測試為由重新開放報名。新版歷史頁只呈現資訊。

## 部署

本次新增 GitHub 建置檢查，不自動選定新的正式主機，也不聲稱 GitHub push 已同步 ChatGPT Sites。先在獨立預覽環境驗收 `dist/`，再依實際主機設定網域與發佈。`scripts/serve.mjs` 僅供本機預覽。
