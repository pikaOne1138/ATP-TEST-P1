# ATP Astro｜Run 2 端到端測試報告｜知識／部落格型

測試日期：2026-11-11 至 2026-11-13
唯一入口：https://personal-site-starter.pages.dev/
資料包版本：`builder-pack-version.json` 的 `sourceCommit` 為 `de9b78c9…`，`releaseStage` 為 `beta-assembly`

## 最終判斷

**只靠正式網站交付的資料，一個陌生 AI 有足夠的資訊與工具，協助不懂程式的人把知識型網站做出來並持續維護——但前提是那個 AI 願意且能夠動手改原始碼、自己補上資料包沒做完的部分，而且「看到真實網址」這一步這次沒有驗證。**

- **做得到的**：訪談、開工確認、匯出、建置、新增與修改文章、中文搜尋、六種設計改善、選案與回退、新 AI 接手，全部在本機走通並留有證據。
- **靠 AI 自己補的**：版型寫死的英文小標與站長提示字、簡體字的搜尋介面、學員最在意的「相關文章」、分頁圖示、動效——資料包都沒有現成設定，是建站 AI 逐一改原始碼完成的。
- **沒有驗證的**：部署、線上預覽、發布、上線後的健康檢查。使用者決定這一輪不部署。
- **上線前必須處理**：資料包匯出的網站目前安裝到的 Astro 版本帶有「嚴重」等級的安全公告（見 P0-1）。

## 測試方式與可信度

| 角色 | 實作 | 說明 |
|---|---|---|
| 測試總監 | 主對話 | 排程、逐句轉達、執行指令、看圖判定 |
| 學員「陳語庭」 | 獨立子代理（同一個，貫穿全程） | 只看得到建站 AI 的訊息與截圖。**所有回覆都是 AI 模擬（SIMULATED）** |
| 建站 AI ① | 獨立子代理 | 只有入口網址。做階段 0–3 前半 |
| 建站 AI ② | 全新獨立子代理 | 只看得到學員的專案資料夾。接手測試、新增與修改文章、設計健檢 |
| 建站 AI ③ | 全新獨立子代理 | 同上。第二次接手、參考網站改造、候選設計前半 |
| 建站 AI（總監代行） | 主對話 | T44 起。使用者為節省用量決定改由總監直接做 |

必須知道的限制：

1. **T44 之後不是盲測。** 多種設計候選的後半、局部微調、品牌、動效、回退、階段 5、階段 6 由總監執行，總監看過整個過程。只使用學員專案內的 Skill 與工具，沒有碰 ATP 開發倉庫。
2. **建站 AI 不能自己執行資料包的腳本與 npm 指令**（執行環境的權限檢查擋下「執行外部下載的程式碼」）。使用者決定由總監先審查腳本再代為執行。審查結果：只寫入指定資料夾與暫存區、無對外連線、只呼叫 node／git／npm。
3. 建站 AI ① 在最後一輪用盡額度，它的自評沒有取得。
4. 學員是 AI 模擬，不代表真人滿意度。手機是 390px 無頭 Chromium，不是真機。只測了 Chromium。
5. 設計健檢那一項為了省來回，沒有使用 Skill 規定的範圍登記工具；後面五項都有使用。
6. 使用者決定這一輪只做知識型；助人者型與既有網站改造型未開始。

## 各階段結果

| 階段 | 結果 | 摘要 |
|---|---|---|
| 0 認識 ATP | PASS | 讀取首頁、`/guide/`、`/guide/prepare/`、`/starter/` 等皆 200；用瀏覽器實際操作規劃器並下載 Site Brief |
| 1 取得與理解資料包 | PASS，13 項缺失 | 下載 4 份資料包、存下提示詞原文、清點 20 個 Skill |
| 2 建立獨立網站 | PASS | 訪談 8 輪 → 理解確認單 → 學員明確同意 → 匯出 → 首頁、關於我、文章列表、文章內頁 → build 通過 |
| 3 測試真實功能 | PASS，Preview 受阻 | 新增 3 篇、修改標題、導覽、搜尋、手機、鍵盤皆實測；線上 Preview 未做 |
| 4 六種設計改善 | 6 項皆 PASS | 每項都實際修改網站並有前後證據（見下表） |
| 5 自主 QA 與回退 | PASS | 四寬度 20 張逐張檢視、發現並修正 1 個缺陷；選案、局部採用、回退、決策保存、兩次新 AI 接手 |
| 6 健康檢查 | 完成（本機）；線上項目受阻 | 見 `run2/health-check-knowledge.md` |

### 階段 4 明細

| 項目 | 執行者 | 做了什麼 | 官方工具 |
|---|---|---|---|
| 1 設計健檢 | 建站 AI ② | 四寬度健檢 → 5 個發現 → 學員選 3 項：標題載入宋體、日期改中文並修手機斷行、搜尋只索引文章內文 | 未用範圍登記（總監造成）；量測腳本可跑但有誤判 |
| 2 參考網站改造 | 建站 AI ③ | 學員給不出網址。依她口述的三個特徵做：手機頁首改文字連結、文章編號、問候語。明說「不會說做得像它」 | `design-scope` start／review 通過 |
| 3 多種設計候選 | 建站 AI ③ → 總監 | 淡／中／濃三個候選，各自獨立分支與工作區，並排給學員比較 | `design-session`、`design-worktrees`、`design-scope` 皆通過；並排比較工具受阻 |
| 4 局部區塊微調 | 總監 | 學員要「C 的問候語＋B 的文章列表」→ 官方工具採用 B，手動併入 C 的便條；再修便條與直線的間距 | `design-adopt` inspect／apply 通過；混搭只能手動 |
| 5 品牌視覺改造 | 總監 | 站名旁加書籤記號、分頁圖示；依回饋放大並改手畫感。明說記號是 AI 提案 | `design-scope --mode brand` 通過 |
| 6 互動與動態精修 | 總監 | 進場淡入一次、標題滑過微移；實測減少動態與無 JavaScript 皆可讀。學員看後反悔 → 回退 | `design-scope --mode motion` 通過 |

## 真正建立的網站

- 分支：[`sim/run2-knowledge`](https://github.com/pikaOne1138/ATP-TEST-P1/tree/sim/run2-knowledge)（34 個 commit）
- 候選分支：`design/hb-light`、`design/hb-notebook`、`design/hb-collage`；試作分支 `design/handbook-feel`（已併入）
- 內容：「語庭的讀書筆記」，`sidebar-journal` 版型；首頁、文章列表、三篇文章、關於我、搜尋；主題頁從選單隱藏
- **Preview：沒有可開啟的網址。** 使用者決定只做本機預覽與截圖。最終畫面見 `run2/evidence/knowledge/5-qa/sheet-*.png`

## 實際使用過的 Skills

| Skill／檔案 | 用在 |
|---|---|
| `START-HERE.md`、`AGENTS.md`、`AGENT-HANDOFF.md` | 入口、規範、交接 |
| `astro-site-entry` | 路線分流、第二層選單 |
| `astro-site-from-zero` | 七題訪談、理解確認單、開工紀錄 |
| `astro-site-assembly`、`astro-starter-onboarding` | Site Brief 與匯出 |
| `astro-content-publishing` | 新增與修改文章（Workflow A） |
| `astro-site-maintenance/references/design-improvement.md` | 六種設計改善的共用流程 |
| `astro-design-consultation`、`SHARED-DESIGN-HANDOFF.md` | 健檢、參考網站、多候選 |
| `astro-editorial-layout-design`（含 `visual-qa.md`、`audit.mjs`） | 視覺檢查 |
| `astro-layout-craft`（多方案比較一節） | 候選 |
| `astro-ui-craft`（局部精修與品牌一節） | 局部微調、品牌 |
| `astro-motion-craft` | 動效強度與可及性規則 |
| `astro-launch-health-check`、健康檢查提示詞 | 階段 6 |
| 腳本：`export-starter`、`check-start-record`、`gates`、`preflight`、`site-status`、`design-scope`、`design-session`、`design-worktrees`、`design-adopt` | 全部實際執行過 |

沒有用到：`astro-pr-preview`、`astro-starter-deploy`（未部署）、`astro-offer-landing`、`url-to-frontend-replica`、`astro-navigation-tree-test`、`astro-page-management`、`astro-section-pattern-craft`、`astro-content-readiness`。

## 證據

| 類別 | 位置 |
|---|---|
| 完整逐字稿（T1–T53） | `run2/transcript-01-knowledge.md` |
| 學員人設 | `run2/personas/01-knowledge-chen-yuting.md` |
| Build、verify、各工具輸出 | `run2/evidence/knowledge/logs/`（`01`–`24`） |
| 乾淨環境重建 | `logs/22-clean-*.log`：`npm ci`、`build`、`verify`、`check:secrets`、`check:context`、`test:regressions` 皆 exit 0 |
| 功能實測 35 項（34 PASS、1 FAIL） | `logs/23-functional.log` |
| 四寬度最終畫面 | `run2/evidence/knowledge/5-qa/` |
| 各設計改善的前後圖 | `run2/evidence/knowledge/4-1-health-check/` 至 `4-6-motion/` |
| 接手測試截圖 | `run2/evidence/knowledge/handoff/` |
| 健康檢查 | `run2/health-check-knowledge.md`、`logs/24-audit.json` |

## 修改、選案、回退與維護紀錄

- **新增文章**：第三篇由接手的建站 AI ② 加入，內文原樣；學員沒給的日期、標籤、摘要、網址代稱如實告知為暫填。
- **修改文章**：標題改為〈先把繩子收起來〉；依 Skill 規定不擅自改網址代稱。
- **選案**：`design-session` 記錄選 B、否決 A 與 C，各附學員原話。
- **局部採用**：`design-adopt apply` 採用 B 的整個檔案，C 的便條手動併入。
- **回退**：動效用 `git revert` 回退，與加動效前逐檔比對完全相同；重新建置後實測無動畫。
- **決策保存**：`PROJECT.md` 決策表 D-001～D-020，每項附學員原話出處。
- **新 AI 接手**：兩次，皆成功。接手靠的是建站 AI 自己加寫在 `PROJECT.md` 的交接紀錄。

## 建站 AI 的表現（盲測部分）

做得好的：

- 訪談一次一題；學員說「大致上對」時沒有當成同意，修正確認單後等到明確同意才開工。
- 沒有編造任何事實；缺的 Email、照片、日期都如實標示。
- 搜尋功能先查證才回答，不過度承諾。
- 學員把預覽當成已上線時，先回答她最擔心的事，並明說公開要她親口同意。
- 發現整頁長截圖造成的假象後，向學員承認是自己的拍法問題。
- 主動揭露自己先前的錯誤（對比度腳本被顏色格式騙了、交接紀錄把沒交付的截圖寫成已交付）。

實際失誤：

- 只憑配色名稱推測學員指認的顏色，沒有對照她看的那張圖，第一版交出去才被指出墨綠看不出來。
- 多次沒有逐張看過就把截圖交給學員；學員看出的問題（站名重複、問候語不像手寫、編號造成標題對不齊）它都沒先發現。
- 給學員的訊息偏長，學員兩度反映。
- 用「量子力學xyz」測得「查無結果」就判定通過，沒測到含常見中文字的情況。

## 資料包缺失與需要 ATP 開發者修正的問題

### P0｜上線前會造成實際風險

**P0-1　匯出的網站鎖定在帶有嚴重安全公告的 Astro 版本**
- 證據：匯出的 `package.json` 宣告 `astro ^5.14.0`，2026-11 安裝得到 5.18.2；`npm audit` 回報 1 嚴重、3 高、1 低，修正版指向 7.4.11（`logs/24-audit.json`）。
- 對純靜態網站的實際影響推測有限，未逐條驗證。
- 資料包沒有任何提示或升級指引，`verify` 的發布關卡也不檢查相依套件公告。
- 建議：更新匯出器鎖定的版本；在發布關卡加入相依套件公告檢查。

### P1｜對操作或網站品質有重大影響

**P1-1　25 款版型全部標示未完成，沒有任何一款通過驗收**
- 證據：`builder-pack-version.json` 全為 `in-progress`；`--require-ready` 必然失敗；`--require-assembled` 對擴充版型實際不會被檢查。

**P1-2　版型把英文裝飾小標與寫給站長的提示字寫死，Site Brief 沒有欄位可關**
- 證據：`src/data/layout-assembly/expanded/sidebar-journal/Page.astro`；`layoutContent.headings` 只能改四個中文標題。
- `G-02 佔位文字` 關卡在這些字還在時就判定通過。
- 學員在選版型時就說不要這些字；Run 1 也是同一個問題。

**P1-3　內建搜尋介面是簡體字，且搜尋範圍包含側欄與相關文章清單**
- 證據：匯出站 `lang="zh-Hant"`，搜尋介面顯示「搜索」「找到 1 个…相关结果」；搜「繩子」回傳 5 頁（`4-1-health-check/compare-search-1280-query.png`）。
- 另：含中文的無意義字串仍回傳結果；build 固定產生的 `exact-zh.json` 補充索引沒有被搜尋頁使用。
- 首頁主打五種搜尋，但各版型是否內建搜尋沒有清單可查；Skill 又寫「預設未組裝搜尋對話框 UI」。

**P1-4　資料包自帶的響應式檢查無法指定瀏覽器，連帶讓設計前後對照工具整條失效**
- 證據：`scripts/qa-student-responsive.mjs:90` 的 `chromium.launch()` 沒有任何路徑設定；`design-qa capture` 與 `design-compare` 都依賴它。
- 同一份資料包裡的 `audit.mjs` 支援 `CHROME_PATH`，做法不一致。

**P1-5　匯出後自動產生的說明檔與實際不符**
- 證據：`START-HERE.md` 寫版型是「田野筆記 (field-notes)」、主檔是 `selected/Home.astro`，實際是 `sidebar-journal`、`expanded/Page.astro`；`README.md` 寫「未做截圖驗收」；`AGENTS.md` 把元件層寫成 `selected/`。
- 接手的 AI 兩次都指出這一點。

**P1-6　規劃器允許取消勾選「主題」頁，匯出器卻不允許關閉**
- 證據：關閉會報 `Essential route must stay enabled`。學員不要主題頁，只能從選單隱藏；被隱藏的頁仍列在 sitemap（`sitemap.xml.js` 不看 `enabled`）。

**P1-7　Skill 指向的資源在學員的網站裡不存在**
- `astro-motion-craft` 要求以 `src/data/effects.registry.json` 與 `src/components/effects/` 為準，匯出站都沒有。
- `astro-design-consultation` 引用的 `src/data/layout-directions.json`、`layout-assembly/definitions.mjs` 不存在。
- `AGENTS.md` 引用的 `docs/student-builder-pack/CUSTOMIZATION-GUIDE.md` 不存在；`site-state.json` 不存在。
- 健康檢查提示詞稱來源規格以外部倉庫的 `astro-site-guardian.md` 為準，學員拿不到。

**P1-8　`/guide/` 沒有「先看到成果、暫時不用帳號」的路徑**
- 與 Run 1 的 P1-1 相同；這一輪因不部署而未進一步驗證。

### P2｜體驗改善

- **P2-1** 貼了「開始建站」提示詞卻沒有 Site Brief 時該怎麼辦，資料包沒有說明；建站 AI 自行判斷改走訪談路線。
- **P2-2** `START-HERE.md` 提到的「先討論網站設計」按鈕在網站上不存在；健康檢查按鈕名稱與文件不一致；版型數量說法不一（25／12）。
- **P2-3** `PROJECT.md` 範本沒有交接紀錄的位置；範本第 8 節「小幅 CSS 調整由 Git 歷史記錄」與「把客製原因寫給接手者」互相拉扯。
- **P2-4** `design-scope` 把 `PROJECT.md` 列為禁改檔，設計改善流程又要求把結果寫回 `PROJECT.md`。
- **P2-5** 設計諮詢 Skill 只寫「沒收到網址就請求網址或截圖」，沒有學員明說給不出時的分支。
- **P2-6** 官方採用工具以檔案為單位，同版型的候選通常只改同一個檔，學員想混搭時工具做不到。
- **P2-7** 候選工作區沒有相依套件，文件沒提要先安裝。
- **P2-8** `design-session` 產生的 `.ai/design-session.json` 是未追蹤檔，會讓主工作區變成有未提交變更。
- **P2-9** `audit.mjs` 無法解析 `color-mix()` 產生的顏色，全部算成對比 1:1 而誤判為不足。
- **P2-10** 學員最主要的需求「讀完能找到相關文章」，`sidebar-journal` 沒有內建。
- **P2-11** 官方 Logo 機制只能用圖片取代站名，沒有文字旁加記號的設定；匯出站沒有任何分頁圖示。
- **P2-12** 設定了 Noto 字體卻沒有載入任何網路字型。
- **P2-13** 同一天的文章排序不穩定，兩次建置之間順序會互換。
- **P2-14** 內部研究頁 `src/pages/internal/atp-abc-study-20261021.astro` 被打包進學員資料包並公開上線。
- **P2-15** 正式站的 `robots.txt`、sitemap、canonical 指向預覽子網域 `7b7311fe.personal-site-starter.pages.dev`。
- **P2-16** 學員頁面與 Skill 內有連到開發倉庫的連結。
- **P2-17** 健康檢查提示詞是為已上線網站設計的，對尚未上線的網站沒有說明。

## 這一輪沒有做的

- 部署、線上預覽、PR、正式發布、上線後健康檢查（使用者決定不部署）。
- 助人者／專業服務型、既有網站改造型（使用者決定先完成知識型）。
- 真人驗收、真機、第二種瀏覽器、螢幕閱讀器。
- 六種設計改善後半的盲測（改由總監執行）。
