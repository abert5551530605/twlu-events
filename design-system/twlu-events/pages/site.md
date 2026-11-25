# TWLU 中文與高齡友善實作覆寫

適用於所有頁面；優先於產生的 MASTER 建議。

來源：使用者指定 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
核實版本：8db36338810d0942567b97ce439affd1619fcf31
執行查詢：`professional association education accessible --design-system --persist -p "TWLU Events"`
採用：Accessible & Ethical 風格、專業深藍與藍色 CTA、清楚焦點、高對比與觸控導向。

## 有意識的調整

- 中文閱讀：標題採本機繁中宋體字族、內文採系統黑體，不載入只覆蓋拉丁字母的 EB Garamond / Lato，也避免大型中文字型阻塞首屏。
- 內文基準 18px、行高 1.8，主要控制項至少 48px，CTA 56px。
- 色彩以 MASTER 的 navy / blue / slate 為核心；淺灰藍區塊與編輯式分隔線取代華麗漸層。
- 不採用生成建議中的銷售口吻、證照徽章、虛構統計與輪播。以可核對的課程日期、講師、場地與官方公告建立可信度。
- 無自動播放或捲動動畫。僅保留顏色轉換，尊重 reduced-motion。
- 手機詳情頁先完整呈現活動內容，再顯示參加資訊；桌機使用側欄。
- 海報保留完整比例，不放大鏡、不裁切、不加失效 PDF 按鈕。
- 所有活動頁皆有返回新版母站的共用品牌導覽。過期課程呈現歷史狀態，不顯示可報名的假表單。
