# CAP English AI 管理後台

入口：`https://cap-english-ai-v14-stable.vercel.app/admin.html`。

使用既有網站帳號 `tfcpeter@gmail.com` 與原本密碼登入。首次部署初始化會將在 2026-10-14 08:00 UTC 前建立的既有帳號 ID 綁定為唯一指定管理員；不存在時不會替未來註冊帳號保留管理權限，也不會建立或修改密碼。

會員 Email／姓名可搜尋，列表每頁 50 人。選取會員後輸入 1～365 天，開通完整功能；既有免費測試從到期日延長，已到期者從現在起算。可以撤銷測試並恢復 Free，保留學習紀錄。有效的付費或其他來源完整資格不會被測試操作覆寫。

首次初始化替既有 `slim2007960913@gmail.com` 開通 30 天完整功能；若帳號不存在或已有有效完整資格，不會自動新增帳號或覆寫方案。初始化只執行一次。授權完成後，會員重新整理頁面即可讀取新資格。

所有管理 API 重新查驗伺服器 session 及資料庫角色；寫入必須使用同來源 JSON 請求。會員權限變動與管理紀錄在同一資料庫交易提交。免費測試寫入 `memberships.source=admin_test`，不寫入付款訂單。到期由現有 Complete 功能與會員 API 判斷。

初始化表：`cap_admin_roles`、`cap_admin_audit`、`cap_admin_setup`。角色不能從前端、一般會員 API 或自行修改個人資料取得。後台僅能授權學習測試，無管理員升級、付款紀錄修改或帳號刪除入口。

驗證：建置後執行 `node scripts/qa-product.mjs` 及 `node --test scripts/admin.test.mjs`。建置保留正式站 7deeac6 的畫面與圖片，頁面來源固定為該 commit。
