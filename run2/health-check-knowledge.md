# 階段 6｜健康檢查（唯讀）｜語庭的讀書筆記

> 依正式網站 `/guide/` 第 07 步「複製健康檢查提示詞」的內容執行（專案內 `docs/student-builder-pack/HEALTH-CHECK-PROMPT.md` 與之相同）。
> 這次只讀取、分析與報告：沒有修改檔案、沒有安裝或升級套件、沒有部署、沒有安裝自動巡檢。
> 檢查對象：分支 `sim/run2-knowledge` 的全新複製（`npm ci` 後 build），以本機伺服器提供。**這個網站沒有上線**，所以「線上網站」相關項目都是受阻。
> 由測試總監在主對話執行（非獨立子代理）。

## 給學員看的版本（照提示詞 D 段的格式）

**1. 網站目前怎麼樣？**
你的網站可以正常做出來，首頁、三篇文章、文章列表、關於我、搜尋都打得開，手機和電腦上都沒有跑版，搜尋「繩子」找得到對的那一篇。網站還沒有放到網路上，所以「別人能不能正常連進來」這件事我現在沒辦法檢查。

**2. 你現在需要擔心什麼？**
- 做網站用的核心工具（Astro）版本偏舊，官方已公布幾個安全問題，其中一個被標為「嚴重」。你的網站是先做成固定的頁面再放上去的那種，這類問題多半影響的是「會即時運算的網站」，所以對你的實際影響**很可能有限，但我沒有逐條證實**。它不是今天就會出事的問題，但上線前應該處理。
- 網站的正式網址還沒設定（現在是範例網址）。上線前一定要改，不然分享連結會指向錯的地方。
- 搜尋有一個小毛病：輸入一串沒意義的中文字，有時還是會跳出文章。

**3. 我建議你接下來做什麼？**
- 現在處理：不需要。網站還沒公開。
- 上線前處理：決定正式網址；請 AI 另開一個試作版本升級 Astro，升完重新檢查一次再決定要不要採用（這是跨大版本的升級，不能直接套）。
- 暫時不動：搜尋的小毛病、隱藏的「主題」頁還列在網站地圖裡。

## 技術明細

| 項目 | 結果 | 依據 |
|---|---|---|
| 全新複製後 `npm ci` | PASS（實際驗證） | exit 0 |
| `npm run build` | PASS（實際驗證） | 9 頁；Pagefind 索引 3 頁；內部連結 PASS 9 |
| `npm run verify`（發布關卡 preview 模式） | PASS，2 項 WARN | G-02／03／04／05／09／11 PASS；G-01 正式網址、G-08 環境能力報告 WARN |
| `npm run check:secrets`、`check:context` | PASS（實際驗證） | exit 0；errors 為空 |
| `npm run test:regressions` | PASS（實際驗證） | exit 0 |
| 首頁、三篇文章、列表、關於我、搜尋、RSS、sitemap、robots、分頁圖示回應 200；不存在的頁面回 404 | PASS（實際驗證，本機） | `logs/23-functional.log` |
| 首頁 8 個站內連結無壞連結 | PASS（實際驗證） | 同上 |
| 導覽、文章列表→文章、手機導覽 | PASS（實際驗證） | 同上 |
| 搜尋：關鍵字、標題、繁體介面、鍵盤 Tab／Enter | PASS（實際驗證） | 同上 |
| 搜尋：含中文的無意義字串應查無結果 | **FAIL** | 「不存在的詞xyz」回傳 2 篇；純英文亂碼則正確回 0 筆 |
| 手機 390 寬無水平溢出、觸控目標 44px | PASS（實際驗證，模擬） | 同上；非真機 |
| RSS 含 3 篇文章 | PASS（實際驗證） | `dist/rss.xml` |
| Canonical、sitemap、robots 的網址 | **FAIL（上線前必修）** | 全部是 `https://example.com`；`site.config.json` 的 `site` 未設定 |
| robots 禁止索引、頁面 `noindex` | PASS（符合「尚未公開」的預期） | `Disallow: /`、`noindex, nofollow` |
| sitemap 內容 | WARN | 仍列出已從選單隱藏的 `/topics/` |
| 示範內容殘留 | PASS | 掃描 `dist` 只命中範例網址本身，無示範文字 |
| Node.js 版本 | 推測可用 | 本機 v22.23.4；`package.json` 未宣告 `engines`，無從核對要求 |
| 套件版本 | 實際驗證 | astro 5.18.2（宣告 `^5.14.0`；最新 7.4.11）、pagefind 1.6.0、playwright 1.65.0 |
| `npm audit` | **5 項：1 嚴重、3 高、1 低** | astro（直接相依，多則公告，含「AVIF 影像最佳化遠端程式碼執行」「預先產生錯誤頁的 Host header SSRF」「XSS」等）；sharp、zod、zod-to-ts、esbuild（間接相依）。修正版本皆指向 astro 7.4.11（跨大版本） |
| 上述公告對本站的實際影響 | **推測：有限；未逐條驗證** | 本站 `output: 'static'`、無 SSR、無 View Transitions、無 server islands、目前沒有任何圖片經過影像最佳化；但 sharp 仍在 build 時載入。未做任何攻擊性測試 |
| 正式網址、HTTPS、線上可用性 | BLOCKED | 網站未部署（無部署授權） |
| 部署平台建置紀錄、GitHub Actions 執行結果 | BLOCKED | `.github/workflows/deploy.yml`、`pr-check.yml` 存在，但從未在平台上執行 |
| 備份與復原 | 部分 PASS | 原始碼在 GitHub 分支 `sim/run2-knowledge`（34 個 commit，可回到任一版）；`AGENTS.md` 提到的 `site-state.json`（已知正常版本紀錄）不存在；沒有實際演練過復原 |
| 第二種瀏覽器、真機、螢幕閱讀器 | NOT TESTED | 只有無頭 Chromium |
| 資料包自帶的 `qa:responsive` | BLOCKED | 專案 Playwright 1.65 與本機瀏覽器版本不合 |

## 健康檢查提示詞本身的觀察

- 提示詞設計給「已上線網站」。對還沒上線的網站，A 段會先要網址；有原始碼時可以繼續，這次就是走這條路。
- 提示詞與 Skill 都提到「來源規格以 ai-workbench 的 `astro-site-guardian.md` 為準」，學員拿不到那份檔案（階段 0–1 已記為缺失）。
- 資料包匯出的網站在今天（2026-11）安裝就會得到帶有「嚴重」公告的 Astro 5.x；資料包沒有提示這件事，也沒有升級指引。
