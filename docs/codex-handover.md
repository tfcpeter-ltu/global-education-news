# Codex 維護與社群交接紀錄

更新日期：2026-09-15（Asia/Taipei）。使用者已明確授權 Codex 接手本專案網站維護、新聞與獎學金上稿及部署驗收。最新每日社群範圍為 FB／IG／Threads，各發一篇新聞、一則獎學金及一個留學 DIY 導航國家與學校故事，共九則自然貼文；X 保留備用文案。

## 啟用的排程

- 名稱：環球教育新聞｜每日08:00前完成上線與宣傳
- Codex automation ID：08-00；舊 fb-ig-x 已刪除。
- 類型：目前任務的桌面 heartbeat，狀態 ACTIVE。
- 每天台灣時間 05:00 啟動、07:00 接續補齊、08:00 回讀驗收。08:00 是完成期限，逾時須持續補救並如實回報，不是開始時間。
- 需要電腦開機與 Codex app 運作；尚未搬到 GitHub Actions 雲端執行。
- 執行依 AGENTS.md、social-publishing.md 與 study-abroad-social.md。國際新聞優先、每日檢查沅豐傳媒教育內容、嚴格雙重查核、獎學金每天最多三則，沒有合格選題可不發。
- 政策雷達納入每日工作：比較舊規定、新規定、生效日期、受影響對象及影響；來源不足不發布。
- 有完成、實質更新、失敗或需使用者處理時通知；無變化保持安靜。

## 原 ChatGPT 任務

已在 ChatGPT「已排程」管理頁實際查驗以下四個任務均顯示已暫停：

| 任務 | 交接處理 |
| --- | --- |
| 國際教育新聞自動上稿 | 查驗時已暫停 |
| 環球教育社群日更 | 查驗時已暫停；原時間 12:30 |
| 每日獎學金雷達 | 本次暫停並回讀確認 |
| 全球教育政策雷達 | 本次暫停並回讀確認 |

使用者亦已回覆「GPT已經暫停」，不再等待手動停用以上任務。這不代表已取消第三方平台先前排定的貼文；每次發布仍須查平台去重。其他不相關任務未變更。

## 社群目的地

原「環球教育社群日更」指令明確指定 Metricool 的 LTU OSSD 品牌，使用者本次授權整體移交，因此沿用既有目的地：

| 平台 | 目的地與狀態 |
| --- | --- |
| Metricool 品牌 | LTU OSSD #1加拿大 台加高中雙聯學制；brandId 6323205；Asia/Taipei |
| Facebook | 已連接；page ID 101904929207004 |
| Instagram | 已連接；@ltuossdtw |
| X | 使用者指定 PeterChen／@PeterChen8964；Metricool 尚未連接，保留 xCopy，待連接後核對帳號再發布 |
| Threads | @ltuossdtw；每日目標三則，已於 2026-09-15 直接登入介面發布並回讀成功 |

正式站頁尾 Facebook 連結與以上目的地不同，不可因此自行切換發布帳號。若使用者後續指定新帳號，以新指示更新此表。每次重新確認連線與目的 ID；此表不是永不失效的憑證。

## 執行紀錄與驗收

- 新文章與重要獎學金同步建立 docs/social-posts/ JSON，依規則輪替 CTA，保留來源與圖片授權。
- 發送前查文章 URL、平台已發布與已排程紀錄；先記錄意圖，再送出，再回讀 ID／狀態／URL。結果不明不重送。
- 新聞、網站與 FB／IG 不因 X 尚未連線而整批暫停。
- 2026-09-15 已補刊三篇國際新聞、一則獎學金與三篇 Peter 專欄；對應部署成功及正式站驗收見 docs/daily-reports/2026-09-15.json。FB、Threads 各兩則成功，IG 兩則尚未發布，不得標整批完成。
- 所有程式／內容修改須確認 Astro build、對應 commit 的 Pages 部署，以及正式站桌面／手機驗收。

## 2026-09-15 社群阻礙與接續

- Metricool 六則排程均已回讀 ERROR：You have reached your Metricool account limit.。恢復額度前使用授權帳號的直接平台介面；不重複建立注定失敗的排程，也不自行付費升級。
- FB 與 Threads 已完成四則，公開 URL、ID 與回讀時間存於 docs/social-posts/2026-09-15/promotion-publication-log.json。
- IG 直接上傳的 fileChooser.setFiles 回報 Not allowed。使用者需在 Chrome 的 ChatGPT 擴充功能詳細資料開啟「允許存取檔案網址」（Allow access to file URLs）。不得自動替使用者擴大權限。
- 權限開啟後，先核對 @ltuossdtw 最新貼文，只補 9 月 15 日美國 D/S 法院暫緩與台達氣候獎學金兩則；沿用當日 CTA「追蹤」，不重複 FB／Threads。
- 兩張原圖來源、授權與 IG caption 均已保存；若新的工作目錄沒有本機圖片，可依已查核來源重新下載。Metricool 工具的 mediaFiles 在本日驗證接受本機絕對路徑，直接傳 Wikimedia URL 會在上傳階段失敗。
- 下一個新發布日 CTA 為「免費加入會員」；9 月 15 日補發沿用「追蹤」。排程仍為 ACTIVE，但平台與本機權限阻礙必須如實回報。

