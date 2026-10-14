# CAP English AI 網域切換

2026-10-14：正式網址 https://cap-ai.ossdtw.com/。

- 會員中心：https://cap-ai.ossdtw.com/complete
- 管理後台：https://cap-ai.ossdtw.com/admin
- 題型與解析範例：https://cap-ai.ossdtw.com/mock-example
- Webnode 原入口：https://www.ossdtw.com/capai-eng/；四個學習入口已改為新網域，使用目前分頁開啟。

Webnode DNS 新增一筆 CNAME：`cap-ai.ossdtw.com` → `8479afce42e19012.vercel-dns-017.com.`。主站、郵件及其他子網域記錄不變。

Vercel 專案 `prj_GUp3EM6zv4Of16G1mBi5KWUzMaij` 已綁定並驗證網域。`APP_BASE_URL` 已更新為 `https://cap-ai.ossdtw.com`；正式部署 `dpl_ELnxbzDciKnfyyJAfAEqQCpvAVjr` 狀態 READY，來源 `2b81b04`。此部署同時包含會考聽力三選一與交卷後逐題解析修正。

本次為自訂網域切換；後端仍由 Vercel 執行，會員與學習資料仍使用原資料庫。使用者首次使用新網域需要重新登入；不需重新註冊。Cookie 為主機限定、HttpOnly、Secure、SameSite=Lax，未擴大到整個 ossdtw.com。

已檢查 DNS 配置正確、有效 HTTPS、首頁／會員中心／後台與未登入 API 同網域，並由 Webnode 公開頁實際點入新網址。未使用真實帳號進行付款測試。
