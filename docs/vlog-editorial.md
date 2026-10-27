# 留遊學 Vlog 維護

## 2026-10-27 留學／遊學左右雙區

依使用者指示，桌面同一列左側為「留學影音 Vlog」、右側為「遊學 Vlog」，各有獨立播放器與片庫；手機在頁面上方以固定的雙入口切換，不把遊學排在長串留學片庫之後。兩播放器不應同時發聲，下一部與自動連播限於自己的分類；來源篩選及搜尋同時更新兩邊數量，搜尋時收起播放器與每日精選，直接展示符合影片。

分類規則集中在 `src/lib/vlog-categories.mjs`：明示 `vlogGroup: "tour"` 或 `topic: "遊學體驗"` 進入遊學，其餘保留留學分類；不能把所有 Peter／LTU 影片視為遊學。已新增八支使用者頻道公開遊學 Shorts（英國唐頓女王學院四支、加拿大皇冠高中四支），每支核對頻道、發布時間、片長、公開與嵌入狀態及縮圖。遊學共十支，含原有伊頓暑期學校及皇冠夏令營；留學三十五支。保留全部既有影片與十一個推薦標記及順序。新遊學短片使用 `format: "short"`、`addedAt`，不填入每日五外部加一 LTU 精選的 `collectedAt`，避免取代當日六則。

遊學圖像仍為原始 YouTube 縮圖，影片仍由原始播放器播放，不下載、剪輯或重新上傳。LTU 關聯課程及合成旁白／AI 情境示意保留於介紹，不冒充活動實拍。新標題與簡介須同步補齊英文 overrides。未來新增遊學短片延續同一分類，不另建立重複網址或同片多筆。

驗收涵蓋中英文雙區、桌面左右位置、手機切換與不溢出、兩區搜尋、原推薦清單、分類內連播、原片備援。執行 `node scripts/test-vlog.mjs --built` 與既有雙語檢查；`source-review.json` 保存八支原片的公開查核資料。

## 2026-10-25 首頁今日精選

首頁在 Peter 推薦放映上方展示最新收錄日期的六則影片，依 collectedAt 的日期分組並顯示日期。每日五則外部官方影片、一則 LTU 相關影片皆填入 collectedAt。新一批收錄後自動替換此區，舊片保留於完整片庫。此區另用 data-daily-video 連接原播放器，不複製播放佇列；Peter 指定九部推薦的 featured、recommended、priority 與原順序保持不變。繁中與英文首頁同步更新，手機兩欄、桌面三欄。

頁面：`https://globalednews.com/vlog/`；英文版：`/en/vlog/`。

影片來源集中在 `src/data/vlog-videos.json`。首批 10 部為 Peter 指定頻道的 7 部影片及 UWE Bristol、多倫多大學、墨爾本大學的 3 部官方影片；2026-10-23 透過 YouTube 公開頻道／搜尋資料核對影片 ID、標題、頻道 ID、日期、片長及預覽圖。保留 originalTitle 方便回查。不下載、重製或重新上傳影片；以原始 YouTube 播放器與縮圖呈現。

後續收到投稿時：核對原作者與授權／公開分享意願，確認公開網址、頻道、縮圖與嵌入播放可用後，新增同格式紀錄。sourceType 使用 `submission`；peter 與 official 分別為 Peter 指定頻道與經查核的大學官方頻道。尚未審核的影片設為 `draft`，不會出現在頁面。

必填：id（11 字元）、title（繁體中文編輯標題）、originalTitle、description、country、topic、sourceType、channelTitle、channelId、publishedAt（原始 ISO 時間）、duration（ISO 8601）、thumbnail、url、featured、priority、verifiedAt、status。priority 越小越前面；featured=true 加入頂端輪播。新中文內容同步補入 en-overrides.json。

首頁輪播每 8 秒換圖，滑鼠停留、鍵盤焦點、背景分頁及減少動態偏好會暫停；播放開始後不再自動換圖。使用者主動開始播放後依完整影片清單輪流播放，可關閉「自動播放下一部」。搜尋／分類只篩選列表，不改播放順序。嵌入受限或網路失敗時顯示提示及原始 YouTube 連結，不自動無限跳片。投稿按鈕是電子郵件連結，沒有假裝已完成上傳的表單。

更新後在 OneDrive 外的工作副本建置，執行 `node scripts/test-vlog.mjs`、既有雙語檢查，部署後回讀中英文、桌面與手機、縮圖、搜尋／篩選、播放及連播。

## 2026-10-23 使用者推薦與頻道版面

使用者指定的 9 部影片依提供順序優先排列：8-zSAurL2hY、nBD6XJWkaPk、8PCtk9OV-sk、fhxXy0P7gkc、QdWNTNuOxso、zM3H-bUNvUg、5AeDNw4kxu4、70D3Legd1kc、lEJ-qc82YG4。透過公開 YouTube 資料核對，全部來自 Peter 指定頻道；2 部已存在，淨新增 7 部，總計 17 部。recommended=true 與 featured=true 為這 9 部，priority 保存使用者的順序。AI 外星人影片標明為 AI 創作寓言，不以新聞事實呈現。

Vlog 使用獨立白底頻道介面：精簡品牌與搜尋列、側欄、分類、頻道識別、精選播放器、縮圖網格。卡片點擊直接播放；不顯示每部影片的外部連結。只有嵌入失敗時才顯示 YouTube 備用連結。全站其他頁面仍使用既有報頭與頁尾。
