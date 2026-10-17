# 林若安

這是 practice-compass 的獨立 Astro 網站，組裝狀態為 in-progress；本輪未做截圖驗收，尚未獲視覺核准。

1. npm install
2. npm run dev
3. npm run build && npm run verify

修改 site.config.json 的 brand、content、artDirection、pageContent 與 navigation。新增文章放在 src/content/articles/，未公開稿放 src/content/drafts/。topics 對應文章 frontmatter 的 topics 陣列。不要重新執行匯出器覆蓋已編輯的網站。

正式上線前設定實際 site/base、真實資格／費用／聯絡方式，並取得持有人核准。搜尋使用 Pagefind；預設 noindex。
