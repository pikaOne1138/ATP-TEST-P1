# 學員獨立 Astro Starter（第一階段）

此匯出功能只提供**可建置的網站骨架**。版型仍須由 AI 根據原始 Layout Library 做真實構圖移植，不可聲稱已完成 12 款版型的視覺還原。

- `npm install` → `npm run dev` → `npm run build`
- 發布前修改 `site.config.json` 的 `site`、`base`，填寫真實內容。
- 若使用 GitHub Pages 專案站，需要正確的 BASE_URL；Cloudflare 根網域通常使用 `/`。
- 使用 astro-site-assembly、astro-starter-deploy、astro-site-maintenance Skills。
- 未設定的服務、預約、文章不要假裝已經完成。

搜尋引擎收錄預設關閉。僅在完成內容與預覽驗收、獲得網站擁有者明確同意、並於正式部署環境設定 SITE_INDEXABLE=true 後開放索引；不要在 Preview 分支共用這項正式發布設定。

## 部署設定

- GitHub Pages：到 Settings → Pages 把 Source 設為 GitHub Actions。`.github/workflows/deploy.yml` 會用 `actions/configure-pages` 自動帶入網站網址與路徑前綴（專案網站會是 `/倉庫名`），不需要手動改 `site.config.json`。
- Cloudflare Pages：Framework preset 選 Astro，組建命令 `npm run build`，輸出目錄 `dist`。預覽網址會自動帶入。正式網址或自訂網域要在環境變數設定 `SITE_URL`（含 `https://`）；要開放搜尋引擎收錄，另外設定 `SITE_INDEXABLE=true`。
- 兩條路線都不需要把網址寫進原始碼；本機開發與沒設定網址時，網站會以示範網址輸出並禁止收錄。

## Selected visual composition

Layout: 田野筆記 (field-notes). The independent homepage renderer is src/components/layouts/selected/Home.astro. Update site.config.json for brand content and navigation; edit the renderer to replace example notes, illustrations and image slots with real owned material. The original prototype is /layouts/field-notes/. The generated site needs human visual review before launch.

## Brand typography and images

The brand typography preset and image style are configured in site.config.json. If heroImagePath is set, place that exact licensed image under public/images/ and provide meaningful heroImageAlt. The exporter does not fetch remote images or invent licenses.
