# 留遊學 Vlog 維護

頁面：`https://globalednews.com/vlog/`；英文版：`/en/vlog/`。

影片來源集中在 `src/data/vlog-videos.json`。首批 10 部為 Peter 指定頻道的 7 部影片及 UWE Bristol、多倫多大學、墨爾本大學的 3 部官方影片；2026-10-23 透過 YouTube 公開頻道／搜尋資料核對影片 ID、標題、頻道 ID、日期、片長及預覽圖。保留 originalTitle 方便回查。不下載、重製或重新上傳影片；以原始 YouTube 播放器與縮圖呈現。

後續收到投稿時：核對原作者與授權／公開分享意願，確認公開網址、頻道、縮圖與嵌入播放可用後，新增同格式紀錄。sourceType 使用 `submission`；peter 與 official 分別為 Peter 指定頻道與經查核的大學官方頻道。尚未審核的影片設為 `draft`，不會出現在頁面。

必填：id（11 字元）、title（繁體中文編輯標題）、originalTitle、description、country、topic、sourceType、channelTitle、channelId、publishedAt（原始 ISO 時間）、duration（ISO 8601）、thumbnail、url、featured、priority、verifiedAt、status。priority 越小越前面；featured=true 加入頂端輪播。新中文內容同步補入 en-overrides.json。

首頁輪播每 8 秒換圖，滑鼠停留、鍵盤焦點、背景分頁及減少動態偏好會暫停；播放開始後不再自動換圖。使用者主動開始播放後依完整影片清單輪流播放，可關閉「自動播放下一部」。搜尋／分類只篩選列表，不改播放順序。嵌入受限或網路失敗時顯示提示及原始 YouTube 連結，不自動無限跳片。投稿按鈕是電子郵件連結，沒有假裝已完成上傳的表單。

更新後在 OneDrive 外的工作副本建置，執行 `node scripts/test-vlog.mjs`、既有雙語檢查，部署後回讀中英文、桌面與手機、縮圖、搜尋／篩選、播放及連播。
