# 2026-10-19 網站安全與服務識別補強

基準 main：426101964f9a67269a4fb89333184de88f0c2cf0。正式站為 GitHub Pages，並非 vercel.json 所描述的 Vercel 部署；沒有藉由修改該檔宣稱正式站標頭已生效。

## 已查核與修改

- HTTPS 主網域與 www 均通過 curl 預設 TLS 驗證；HTTP 與 www 以 301 轉向 https://globalednews.com/；受影響 /ielts-ai-test/ 回傳 200。此結果僅代表此檢查連線，不能代表所有電信業者的警示已解除。
- Astro 5.18.2 與 sharp 0.34.5 的原鎖定相依檢查回報 14 項已知弱點。更新為 Astro 7.2.8、sharp 0.35.5 與對應 pnpm 鎖定檔後，本次 audit 回報 0；不等同完整滲透測試或零風險認證。靜態站沒有對外提供 Astro SSR 或影像最佳化伺服器，原公告弱點須依各自前提評估可利用性。
- 部署使用既有 pnpm 鎖定檔，新增 production dependencies 的 high 以上弱點建置檢查。
- 關於、聯絡與共用頁尾揭露使用者提供的公司名稱與統編；沿用原公開編輯部信箱，不公開申訴使用的私人聯絡電話。
- 新增 /security/ 與 /.well-known/security.txt 安全聯絡入口。此頁不是政府安全認證。
- 共用版型與測驗頁新增有限的 CSP meta（object-src none、base-uri self、upgrade-insecure-requests）與 Referrer Policy。不限制現有第三方 script/connect，避免未驗收的全站功能中斷；此 CSP 不能當成完整 XSS 防護。GitHub Pages 自訂 HTTP 回應標頭尚未配置。
- /ielts-ai-test/ 是本機 Beta 示範：移除未用於驗證的 Email／密碼輸入，保留不需帳密的體驗流程；明確揭露分數與題庫含模擬、非 IELTS 官方、不收費、不成立訂單及 localStorage 資料用途。開通按鈕標示為示範。
- /ielts-ai-student/ 原 gzip 載入器在標準 gunzip 檢查回報 unexpected end of file，解出的部分 HTML 在題庫區中斷。改為可直接閱讀、無自動跳轉的同網域練習入口。舊版完整檔仍保留於上述基準 commit，可單檔還原。

## 驗證與限制

Astro 7 建置通過；雙語 678 對頁面、1,342 個唯一 sitemap URL 與搜尋索引檢查通過，1,348 張照片預覽檢查通過。靜態安全檢查以 scripts/test-public-service-safety.mjs 執行。正式站部署後另留驗收紀錄。

未取得主管機關列警原因，不能將上述問題斷言為檢舉原因。未更改 DNS、停用安全警示、購買憑證、宣稱列入白名單，亦未新增第三方掃描資料上傳或自動申訴。

待後續處理：主管機關人工複核、託管帳號 MFA／權限人工確認，以及會員／AI 後端另案的存取控制稽核。這些不能從靜態前台直接證明已完成。
