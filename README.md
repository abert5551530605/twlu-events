# 新北市土地利用學會｜活動與課程

依使用者指定的 UI UX Pro Max skill 全面重新設計的網站。此倉庫只用於新北市土地利用學會，不包含其他專案。

## 本次交付

- 大字、高對比、手機優先的全新首頁。
- 可搜尋課名／講師、依主題與活動狀態篩選的活動總覽。
- 四場課程詳情頁、學會介紹、參加指南與常見問題。
- 十月份課程保留歷史海報、費用、整天／上午／下午方案紀錄；不重新開放已結束活動。
- 最新十一月份講座實際上課日期為 **2026-12-05**；報名截止 **2026-11-30**，連至官網公布的 BeClass 表單。
- 完整靜態 HTML：沒有 JavaScript 仍可閱讀、導覽與開啟原始公告。搜尋與行動選單為漸進增強。

## 開發

Node.js 22 或更新版；網站建置與自動測試不需要安裝第三方套件。

```sh
npm run check
npm run preview
# 開啟 http://localhost:4173
```

`npm run build` 產生 `dist/`。可部署到支援靜態網站的主機；在主機設定建置指令 `npm run build`，輸出目錄 `dist`。設定非敏感環境變數 `SITE_URL=https://your-domain.example` 後會產生對應 canonical URL 與 sitemap；不要在預覽環境填入既有正式網站網址。

GitHub Actions 執行建置與測試，並上傳 `twlu-events-website` 建置產物。**此工作流程不會自動覆蓋原 ChatGPT Sites 或 twlu.site。** 原網站發佈與主機連線尚未變更。

## 維護位置

| 內容 | 檔案 |
|---|---|
| 課程、日期、講師、公告與報名入口 | `src/events.mjs` |
| 共用導覽、頁面內容與版型 | `src/templates.mjs` |
| 設計變數、字級與響應式版面 | `public/assets/style.css` |
| 搜尋、選單與日期狀態更新 | `public/assets/app.js` |
| 圖片 | `public/assets/` |
| 設計依據與覆寫 | `design-system/twlu-events/` |
| 公開資料來源 | `docs/sources.md` |
| 既有系統整合邊界 | `docs/integrations.md` |

新增活動時填寫唯一 slug、日期、截止日期、來源與經核實的報名網址，新增後重建。首頁本期主視覺取活動陣列第一項，調整本期活動時請同步更新主視覺的日期文案。日期採台北時區；截止與結束後，瀏覽器會更新狀態並移除過期的報名入口。無 JavaScript 的頁面狀態以建置時為準，請於截止後重新建置。

## 個資與報名

此新版入口網站不收集個人資料、不公開報名名單、不儲存憑證。各活動報名入口依原公告連結；既有十月份 Google Apps Script / Google Sheets 後端未被修改。不要將 `SHEETS_SECRET`、報名名單或匯出的 Excel 提交至 GitHub。

這次提交的是全新網站原始碼；不代表舊 Sites 的伺服器端程式已完成匯入。請參閱整合文件。
