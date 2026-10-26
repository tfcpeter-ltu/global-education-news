# 國際教育搜尋入口修正（2026-10-26）

基準：GitHub main `e45788df0add44aacd2cc5e06b3f5a3d85ac85f4`。本輪為使用者授權之 SEO 修正，讀者包括台灣與海外繁體中文使用者。

## 已實作範圍

- 首頁 title、description 與固定 H1；頭條改為同等視覺樣式的 H2，保留新聞排序。
- 新增 `/international-education/`，以閱讀需求連結既有新聞、國別、政策、申請、獎學金與深度專題。
- `/news/` 與八個既有主題頁補強獨立標題、描述及閱讀連結；海外讀者另核對國籍與居留資格。
- 共用導覽新增國際教育、政策與招生入口；文章延伸閱讀回連主題頁與總覽。
- WebPage／CollectionPage 接上既有 WebSite 與 NewsMediaOrganization；只在 `/news/` 輸出 NewsArticle，其他共用文章使用 Article；keywords 改用實際分類與 tags。
- 沿用既有 robots、sitemap、驗證檔與 canonical，未新增虛構作者、背書、評價或排名。

## 關鍵字與承接頁（候選，未取得搜尋量）

|候選詞|承接頁|
|---|---|
|國際教育、全球教育、國際教育資訊|/international-education/|
|國際教育新聞、全球教育新聞、教育國際新聞|/news/|
|美國留學、美國教育新聞|/topics/us/|
|加拿大留學、加拿大教育新聞|/topics/canada/|
|英國留學、英國教育新聞|/topics/uk/|
|澳洲留學、澳洲教育新聞|/topics/australia/|
|亞洲留學、亞洲教育新聞|/topics/asia/|
|留學政策、學生簽證、國際學生政策|/topics/policy/|
|海外大學申請、大學招生、留學申請|/topics/admissions/|
|留學獎學金、海外獎學金|/scholarships/|

「國際新聞」僅在教育相關敘述中自然出現，不把網站改成綜合新聞定位。這些優先詞依內容適配提出，不代表月搜尋量排序。

## 證據與限制

|Claim|Source URL|Organization|Verified date|Level|
|---|---|---|---|---|
|Google AI 搜尋仍以 SEO 基礎與獨特、實用內容為核心；不保證曝光|https://developers.google.com/search/docs/fundamentals/ai-optimization-guide|Google Search Central|2026-10-26|A|
|Article 結構化資料可描述新聞與一般文章的標題、作者、日期等資訊|https://developers.google.com/search/docs/appearance/structured-data/article|Google Search Central|2026-10-26|A|
|本站現有主題、工具與編輯政策入口|https://globalednews.com/|環球教育新聞網|2026-10-26|D|

未取得 Search Console、Keyword Planner 地區搜尋量與 AI 引用基準，無法宣稱已增加流量或 AI 推薦。新總覽為網站導覽與閱讀建議，不新增簽證規則、費用數字或招生資格結論。

## 驗收與後續量測

1. 完整建置後執行 `python scripts/test-education-seo.py`；檢查 11 個入口頁、實際建置的新聞／專題 schema、內部連結與 sitemap。
2. 執行既有雙語及搜尋索引檢查，核對本次 commit 的 GitHub Pages 部署。
3. 正式站檢查首頁、新總覽、國別、政策及一篇新聞的標題、canonical、schema、手機與桌面顯示。
4. Search Console 以國家分組比較 28 天非品牌曝光、點擊、CTR 與入口頁；另觀察 8–12 週趨勢，不承諾固定成長幅度。
5. Keyword Planner 依台灣、香港及其他實際目標市場分開取得近 12 個月搜尋量；廣告競爭度不當成自然搜尋難度。
6. 以固定問題與讀者地區記錄 AI 引用來源、日期及答案準確性，將觀察到的引用與未觀察到的情況分開，不當成全平台引用率。
