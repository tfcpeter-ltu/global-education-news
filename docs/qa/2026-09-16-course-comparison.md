# 選校與科系比較全量檢查

基準：e9e86d5931e9c2678c9c2df5f853ca05771273ac。

- 130 筆學校資料、58 個科系、733 組校系：逐組執行選校器篩選、收藏、加入比較、我的選校呈現、完整分析及詳細頁加入比較事件；沒有例外、空白或 undefined 欄位。這是程式功能驗證，不代表逐組招生資格已重新查核。
- 58 個科系逐一切換、保存，核對有效校系的科系資料同步；補齊中文選項及科系研究方向。
- Cambridge、Manchester 漏列的 Architecture 已加入；10 筆新建築課程來源，加上 UCL 別名共 11 筆校名對應，保留既有 RMIT 來源。來源與查核範圍逐筆記於 official-program-sources-architecture.js。
- UCL 兩種既存名稱共用課程來源。學校名稱暫不合併，以免破壞既有使用者選校紀錄。
- Oxford 官方學士 A–Z 清單沒有列 Architecture，畫面明確標示此查核結果；其他未收錄組合顯示資料狀態，不擅自宣稱學校沒有該科系。詳細頁不再把不匹配的科系當作該校已有課程。
- Cambridge 官方課程透過 Chrome 讀取 Overview 與 Entry requirements；其餘來源以官方課程頁、學校課程表、官方學程簡介核對。Delft 授課語言另以課程管理單位在 Studiekeuze123 的 2026-09-02 更新確認。Bath 官方網站本次無法讀取，未新增未核對內容。
- 建築師註冊與後續學位的說明保留適用範圍；一般學位不當作完整執業資格。
- 本機實際操作：由 Mathematics 切換 Architecture，找到 Cambridge，加入比較後顯示 BA (Hons)/MArch 及官方要求；手機 375px 頁寬、375px 內容寬，比較表於 334px 容器內水平捲動。
- 驗證命令：node scripts/test-all-school-selections.mjs、node --test scripts/test-selection-recovery.mjs、node scripts/check-us-majors.mjs、node scripts/check-canada-majors.mjs；Astro 建置 217 頁成功。

正式部署與回讀結果由本次任務記錄。會員草稿尚未啟用，上線前必須以新 main 合併，不可覆蓋這次校系修復。
