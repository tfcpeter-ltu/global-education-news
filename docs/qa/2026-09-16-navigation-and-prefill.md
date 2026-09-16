# 留學 DIY 導覽及網址回填修復

基準 main：9664d481d10a203ec1ed293f176663bb4fd395a9。

- npm run build 在 Astro 輸出後執行 scripts/unify-study-navigation.mjs，共 247 個 HTML 頁面套用同一組靜態導覽與 LTU 圖片品牌，沒有 JavaScript 載入閃爍。npm run dev 在啟動前套用同一來源。往後改導覽只改該腳本；子目錄採 /study-abroad/ 絕對路徑。
- 我的規劃固定 plan.html；開始規劃固定 student-start.html；我的選校固定 shortlist.html。工具與 Peter 的國際教育講座保留於可用鍵盤操作的原生 details 選單。
- student-start.js 以明確網址參數優先、裝置舊資料其次。未知值回到未選擇，明確空值不回填舊資料；開啟分享網址不會自動覆寫原規劃，修改或送出才儲存。
- 合併重複目標題，保留 goal。舊 priority 連結與儲存資料可回填；Co-op 顯示「Co-op／實習」，底層保留既有 Co-op／就業 識別值，以相容選校器。規劃研究順序不再疊加舊 priority 與新 goal。
- 清除時移除已存條件及目前網址參數，重新整理不恢復清除前資料。

本機驗收：Astro 217 頁建置成功；產出 247 個相同導覽，連結及 logo 路徑全部存在；六欄參數、舊 priority、無效／空參數、預覽不覆寫、送出與清除回歸測試通過；既有選校修復 3 項與 733 校系流程回歸通過。

Chrome 實測以英國、Architecture、OSSD、85–89%、IELTS 6.5 左右／同等、名校／研究六欄網址開啟並產生規劃，畫面與下一頁一致。桌面品牌與導覽完整；手機 375px 視窗有效內容寬度 360px，頁面 scrollWidth 為 360px，更多工具展開後連結仍在畫面內。清除並重新整理八個下拉欄位均為空值。

會員資料庫建立仍受免費專案額度限制；本次不啟用尚未完成的會員版。
