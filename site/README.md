# 學員獨立 Astro Starter（第一階段）

此匯出功能只提供**可建置的網站骨架**。版型仍須由 AI 根據原始 Layout Library 做真實構圖移植，不可聲稱已完成 12 款版型的視覺還原。

- `npm install` → `npm run dev` → `npm run build`
- 發布前修改 `site.config.json` 的 `site`、`base`，填寫真實內容。
- 若使用 GitHub Pages 專案站，需要正確的 BASE_URL；Cloudflare 根網域通常使用 `/`。
- 使用 astro-site-assembly、astro-starter-deploy、astro-site-maintenance Skills。
- 未設定的服務、預約、文章不要假裝已經完成。

搜尋引擎收錄預設關閉。僅在完成內容與預覽驗收、獲得網站擁有者明確同意、並於正式部署環境設定 SITE_INDEXABLE=true 後開放索引；不要在 Preview 分支共用這項正式發布設定。

## Selected visual composition

Layout: 清晰臨床 (clinician). The independent homepage renderer is src/components/layouts/selected/Home.astro. Update site.config.json for brand content and navigation; edit the renderer to replace example notes, illustrations and image slots with real owned material. The original prototype is /layouts/clinician/. The generated site needs human visual review before launch.

## Brand typography and images

The brand typography preset and image style are configured in site.config.json. If heroImagePath is set, place that exact licensed image under public/images/ and provide meaningful heroImageAlt. The exporter does not fetch remote images or invent licenses.
