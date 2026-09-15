# 留學 DIY 導航每日社群宣傳

更新：2026-09-15（Asia/Taipei）。本流程與 [AGENTS.md](../AGENTS.md)、[社群宣傳流程](social-publishing.md) 共同適用。

## 每日交付與時程

使用者已授權每天宣傳 https://globalednews.com/study-abroad/ 。每天選一個「國家／地區 × 學校 × 故事角度」，製作圖文並茂的 Threads、Facebook、Instagram 各一則自然貼文。臉書與 FB 是同一平台；本次「崔」依既有平台安排按 Threads 執行。X 保留備用，不自行增加付費廣告或預算。

這三則是新增工作，不取代原本一篇國際新聞與一則獎學金的六則宣傳。每日合計三個主題、每平台三則，共九則；來源或平台阻礙須如實記錄，不為湊數造假。

沿用 automation 08-00：台灣時間 05:00 開始、07:00 接續、08:00 前完成並驗收，不另建重複排程。依 codex-handover.md 的既有帳號發布。桌面排程仍需電腦與 Codex 運作。

## 選題與查核

1. 每次重新讀 GitHub main 的 public/study-abroad/ 及正式網站。從實際已收錄的大學與科系選題；主要資料包括 university-data*.js、official-program-sources*.js、countries/ 與相關文章。現有資料不是永久有效的招生保證。
2. 讀取 docs/social-posts/study-abroad-history.json、當日資料與平台歷史。優先輪換英國、加拿大、美國、澳洲、歐洲、日本、新加坡、香港；歐洲選題須注明實際國家。避免連續兩天同一目的地，原則上 30 天內不重複同一學校；有實質新資訊時記錄例外理由。
3. 故事可談真實校史、城市環境、特色科系、研究或實習制度，以及台灣家庭可以如何利用導航比較選校。不得虛構學生經歷、錄取案例、人物引言、就業保證或推薦背書。
4. 每篇學校故事實際閱讀至少兩個獨立可信來源，其中至少一個官方來源。招生、金額、排名、簽證、截止日與認證等逐項核對當期規定，保留來源、查核時間及支持的敘述；兩個同機構網址不自動算獨立來源。查核不足換題，仍不足則記錄未發布原因。
5. 使用繁體中文與台灣用字；來源或頁面若有簡體文字，文案轉為繁體並確認專有名稱。不得把站內研究判讀宣傳成官方排名或錄取機率。

## 圖片與平台文案

- 每天使用與當日學校／主題相符的主視覺。優先已取得社群使用權的官方實景照片、授權明確的 Wikimedia Commons 照片；可搭配校名、國家、已查核亮點與留學 DIY 導航品牌製作圖卡。
- 保存 imageSource、imageCredit、imageLicense、imageAlt；官方網站能看到不代表可自由轉載。不可用 AI 虛構校園作為實景，不用地球圖示或同一預設 OG 圖充當每天的學校故事照片。
- 同一主題可跨平台沿用圖片並調整裁切；不同日避免重複主圖。預覽手機裁切，保持校名與重點文字清楚。
- 缺合適圖時建立 imageRequest，標 needs-image；不可把未完成圖片的 IG 稿標 ready 或 published。
- Threads：用具體問題或已查核的特色開場，短篇故事＋選校提醒＋連結，不能整份照抄 Facebook。
- Facebook：3–5 段，亮點、學校背景、台灣學生／家長應比較的面向、導流與品牌定位，附完整網址。
- Instagram：圖片為核心，前兩行有亮點，caption 比 FB 短；仍保留完整導流網址，且可另寫「完整內容見首頁連結」。先確認帳號首頁確有入口；一般 caption 的網址不可假稱可點擊。
- 三平台都自然帶出 Global Education News 環球教育新聞的國際教育定位與免費會員週報價值，不逐字重複固定口號。主要 CTA 沿用當日全站批次的「閱讀全文 → 收藏 → 分享 → 追蹤 → 免費加入會員」輪替，不另開獨立輪替序列。

## 導流連結

每篇必須附 https://globalednews.com/study-abroad/ ，也可附正式站實際開啟驗證的國家／學校深層連結，讓讀者能接著找大學、比較科系或開始規劃。

目前國家頁位於 countries/<目的地>.html；學校頁由 university-detail.html 的 school 參數識別，參數值須與資料內 name 完全一致。從正式介面取得連結並驗證顯示正確校名，不能自行猜測 slug。深層連結若有個人資料不得用於宣傳。不要把大學官方外連當成本站導流網址。

## 資料與去重

每個主題保存 UTF-8 JSON：
docs/social-posts/YYYY-MM-DD/study-abroad--<country>--<school>--<angle>.json

沿用 social-publishing.md 所有必備欄位；本流程 articleTitle 是宣傳主題標題，articleUrl 是實際導航落地網址，不代表必須新增新聞文章。另包含：

- campaign：study-abroad；country、schoolName、storyAngle、selectionReason。
- sourcePath／sourcePaths、articleCommit、sources、verifiedAt。
- destinationUrl、navigatorUrl、facebookCopy、instagramCopy、threadsCopy、xCopy、shortHook。
- CTA、ctaDate、socialImage、imageAlt、imageSource、imageCredit、imageLicense、必要的 imageRequest。
- plannedPublishDate、status、publishedPosts，以及各平台 intent、account、id、url、publishedAt、status、error。

輪換紀錄存於 docs/social-posts/study-abroad-history.json 的 entries，包含台灣日期、country、schoolName、storyAngle、內容檔位置及分平台狀態。新增資料先記 planned，回讀結果後才更新 published；空紀錄不代表以前從未發過，仍須查平台歷史。

本活動不能只用 articleUrl 去重，因多天可共用導航首頁。使用「campaign × schoolName × storyAngle × 平台 × 發布日期／版本」識別發布意圖，並檢查近期相同學校與角度。重跑只補同批未完成平台；未知結果先查平台，不盲目重送。

## 完成證據與阻礙

正式落地頁、圖片、來源、文案與裁切驗收後才標 ready。每平台送出後回讀成功狀態、貼文 ID、公開 URL 與實際時間才標 published。每日報告分開列新聞、獎學金、DIY 宣傳，不以已排程或已備稿冒充已發布。

2026-09-15 已知 Metricool 發布額度用完；未確認恢復前不再建立必然失敗的排程，可使用已授權的直接平台介面。IG 直接圖片上傳曾因 Chrome 擴充功能檔案網址權限受阻；需使用者處理權限，不自行擴權或付費。先完成其他可發布平台，保存 IG 圖文並說明阻礙。每次執行重新確認狀態，解除後只補尚未成功項目。
