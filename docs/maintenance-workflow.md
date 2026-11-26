# 維護工作流程（Maintenance Workflow）

適用對象：後續負責維護「新北市土地利用學會｜活動與課程」網站的人與 AI 代理（例如 Codex）。
先讀 `AGENTS.md`（邊界與安全規則），再讀本文件。兩者衝突時以 `AGENTS.md` 為準。

- 線上網址：https://abert5551530605.github.io/twlu-events/
- 技術：Node 22、零相依性的靜態網站產生器（沒有 npm 套件、沒有框架）
- 部署：push 到 `main` → GitHub Actions 建置、測試、發佈到 GitHub Pages

## 1. 專案地圖

| 路徑 | 用途 |
|---|---|
| `src/events.mjs` | **唯一的內容來源**：學會資料、所有活動、狀態計算 |
| `src/templates.mjs` | 所有頁面版型、共用元件、SVG 圖示 |
| `scripts/build.mjs` | 把 `public/` 與頁面輸出到 `dist/` |
| `scripts/serve.mjs` | 本機預覽 `dist/`（`npm run preview`，預設 4173） |
| `public/assets/style.css` | 全站樣式，含 Motion system 區塊 |
| `public/assets/app.js` | 選單、篩選、報名狀態重算、動畫觸發 |
| `public/assets/status.js` | 報名狀態判斷（與 `events.mjs` 必須一致） |
| `tests/site.test.mjs` | 自動測試 |
| `design-system/twlu-events/` | 設計系統紀錄（MASTER.md 與頁面覆寫） |
| `docs/` | 整合說明、資料來源、驗證紀錄、本文件 |
| `dist/` | 建置輸出，**已被 gitignore，絕對不要提交** |

## 2. 日常指令

```bash
npm run build     # 產生 dist/
npm test          # 執行測試（需先 build）
npm run check     # build + test，提交前必跑
npm run preview   # http://localhost:4173
SITE_URL=https://abert5551530605.github.io/twlu-events npm run build  # 產生 canonical 與 sitemap
```

## 3. 標準流程（每次修改都照做）

1. **釐清範圍**：只改被要求的部分；不要順手重構或換設計。
2. **開分支**：`git switch -c <type>/<short-name>`（`content/`、`design/`、`fix/`、`docs/`）。
3. **修改**：內容只改 `src/events.mjs`；版型改 `src/templates.mjs`；樣式與互動改 `public/assets/`。
4. **本機驗證**：`npm run check`，再 `npm run preview` 用瀏覽器看（見第 7 節檢查表）。
5. **更新文件**：行為或流程有變就更新 `docs/`；驗證結果寫入 `docs/verification.md`（只寫實際執行過的）。
6. **提交**：訊息格式 `type: 簡短說明`（`feat`、`fix`、`content`、`docs`、`chore`）。
7. **發 PR**：推分支並開 Pull Request，CI（`Check website`）必須通過；說明改了什麼、跑了什麼、沒測什麼。
8. **合併到 `main`**：合併後 `Deploy to GitHub Pages` 自動發佈。
9. **上線確認**：到 Actions 確認 deploy 成功，再開線上網址檢查實際頁面。

> 緊急小修可直接 push `main`，但仍必須先跑 `npm run check`。

## 4. 新增或更新活動

只編輯 `src/events.mjs` 的 `events` 陣列（新的在最前面，最新一場是首頁主視覺）。

必填欄位：`slug`（唯一，例 `2027-january`）、`edition`、`title`、`topic`（只用既有三類：權利與登記／土地利用／產業與開發，要新增主題需同步改 `templates.mjs` 的 `topicIcon`）、`date`、`deadline`（`YYYY-MM-DD`，台北時間）、`speaker`、`description`、`source`（學會原始公告網址）、`outline`（每項 `[標題, 說明]`）。

選填：`tagline`、`note`、`registration`（官方 BeClass 網址）、`poster`、`fees`、`legacy`。

規則：
- 資料必須來自學會官網公告（https://twlu.site/category/課程報名/）；**不要編造**日期、費用、講師、報名網址。
- `registration` 只有「已驗證、尚未截止」的活動才填。過期活動不要保留報名入口（測試會檢查）。
- 同步更新 `association.verified`（核對日期）。
- 新增活動後，首頁、活動總覽、詳情頁、相關課程、sitemap 會自動更新；不需手改 HTML。
- `tests/site.test.mjs` 中「只有一場有報名網址」的斷言，要依實際情況更新並在 PR 說明原因。
- 海報圖放 `public/assets/`，用於 `poster` 欄位；圖片需有說明性 `alt`（在 `templates.mjs`）。

### 報名狀態邏輯
`status()` 以台北時間判斷：活動結束後 16:45 → `past`；截止日 23:59:59 之後或沒有 `registration` → `closed`；否則 `open`。
靜態頁面在建置時決定狀態，瀏覽器載入後再用 `status.js` 重算並撤下過期的報名按鈕。**修改狀態規則時，`events.mjs` 與 `status.js` 必須同時改**，測試會比對兩者。

## 5. 修改設計

設計系統記錄在 `design-system/twlu-events/MASTER.md`，原則如下，修改前先讀：

- 顏色只用 `style.css` 頂端的 CSS 變數（深藍 `--primary`、琥珀 `--accent`、金 `--gold`）；不要寫死色碼。
- 字體：標題 Noto Serif TC、內文 Noto Sans TC；內文 ≥ 16px、行高 ≥ 1.7。
- 圖示一律使用 `templates.mjs` 內的 SVG sprite（Lucide 風格線條圖示）；**不要用 emoji 當圖示**。
- 觸控目標 ≥ 48px、對比 ≥ 4.5:1、狀態不能只靠顏色（標籤一定有文字）。
- 保持橫向不溢位：375 / 768 / 1440 寬度都要檢查。
- 若要用 ui-ux-pro-max-skill 重新評估：
  `git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill`，在 `src/ui-ux-pro-max/scripts` 執行
  `python3 search.py "<產業與需求關鍵字>" --design-system -p "TWLU Events"`，把結論更新到 `MASTER.md`，並說明為何改動。

## 6. 動畫規範（Motion system）

所有動畫集中在 `style.css` 的 **Motion system** 區塊與 `app.js` 末段「Motion」。

| 效果 | 實作 | 備註 |
|---|---|---|
| 首屏進場 | CSS `rise` / `pop` keyframes，依序延遲 | 只在載入時跑一次 |
| 背景等高線漂移 | `drift`，40 秒來回 | 氛圍用，極慢 |
| 捲動顯現 | `app.js` 以 IntersectionObserver 加 `.reveal` → `.in-view` | 顯現後移除 class，把控制權還給元件 hover |
| 卡片／圖示 hover | transform + shadow，200–300ms | 只動 transform、opacity、shadow |
| 導覽底線、箭頭位移 | `scaleX`、`translate` | 桌機導覽才有底線動畫 |
| 開放報名圓點脈動 | `pulse` | 只有 `status-open` |
| 篩選結果淡入、FAQ 展開 | `fade-up` | 搭配搜尋與 `<details>` |
| 頁面切換淡入淡出 | CSS `@view-transition` | 漸進增強，不支援就沒有 |

**不可違反的規則**
1. 只動畫 `transform` 與 `opacity`（外加陰影與顏色的短 transition）；不要動畫 `width/height/top/left`。
2. 單次互動動畫 ≤ 300ms，進場 ≤ 800ms；不得有無限迴圈的大幅度動作（現有的 `drift`、`pulse` 例外）。
3. **一定要尊重 `prefers-reduced-motion: reduce`**：該情境下內容直接顯示、無動畫。測試會檢查這個區塊存在。
4. 內容在沒有 JavaScript 時必須可見：隱藏狀態只能寫在 `.js .reveal`，不可寫在 `.reveal`。
5. 不要用 `transition: all`（測試會擋）。
6. 新增動畫要同時在減少動態效果區塊裡關閉，並在 PR 說明。

## 7. 提交前檢查表

- [ ] `npm run check` 全過（建置 + 測試）
- [ ] `npm run preview` 實際打開首頁、活動總覽、一個詳情頁、關於、指南
- [ ] 375 / 768 / 1440 寬度無橫向捲動、版面不破
- [ ] 瀏覽器開發者工具 Console 沒有錯誤
- [ ] 作業系統開啟「減少動態效果」後，內容仍完整顯示
- [ ] 只用鍵盤（Tab、Enter、Esc）能操作選單、篩選、FAQ，且焦點樣式清楚
- [ ] 過期活動沒有任何報名入口
- [ ] 沒有提交 `dist/`、金鑰、報名者資料或試算表
- [ ] `docs/verification.md` 只記錄實際跑過的檢查

## 8. 部署

- `.github/workflows/check.yml`：每次 push 與 PR 執行 `npm run check`，並保留建置產物 14 天。
- `.github/workflows/pages.yml`：push 到 `main` 時以 `SITE_URL` 重新建置，上傳 `dist/` 並部署到 GitHub Pages。
- 需要的 GitHub 設定（只需設定一次，由 repo 擁有者操作）：
  - Settings → Pages → Source：**GitHub Actions**
  - Settings → Environments → `github-pages` → Deployment branches 允許 `main`
- 部署失敗時：先看 Actions 的 `build` 與 `deploy` 哪一步失敗；若是 "not allowed to deploy due to environment protection rules"，是上述環境設定問題，不是程式問題。
- `gh-pages` 分支是舊流程遺留的歷史版本，**不要再往裡推**；它也可作為還原用的舊版備份。

## 9. 回復與還原

- 壞掉的改動：`git revert <commit>` 後 push `main`，Pages 會自動重新部署。
- 回到重新設計前的舊站：舊版保存在 `gh-pages` 分支歷史（commit `c15acbf`）。

## 10. 禁止事項

- 不要把 Northern Moluccas 專案的任何內容帶進來（見 `AGENTS.md`）。
- 不要覆蓋原 ChatGPT Sites 的正式頁面，也不要宣稱 GitHub commit 會自動更新它。
- 不要在這個 repo 修改或部署既有 Google Apps Script 報名後端；其原始碼在 `source-export/staging-2026-11-25` 分支，需另行確認後才能動。
- 不要提交 `SHEETS_SECRET`、API 金鑰、報名者個資。
- 不要編造資料、網址、測試結果；沒跑過的檢查要明說沒跑。
