# 2027 會考英文 AI｜會員與藍新金流部署

## 方案
- 月繳：NT$999 / 30 天
- 年繳：NT$9,999 / 365 天

## Vercel Environment Variables
請在 Vercel Project Settings → Environment Variables 設定：

- `DATABASE_URL`：PostgreSQL / Neon 連線字串
- `NEWEBPAY_MERCHANT_ID`：藍新商店代號
- `NEWEBPAY_HASH_KEY`：藍新 HashKey
- `NEWEBPAY_HASH_IV`：藍新 HashIV
- `APP_BASE_URL`：正式網站根網址，例如 `https://your-domain.com`
- `NEWEBPAY_MODE`：先使用 `test`，正式收款前才改成 `production`

HashKey / HashIV 不可放入 GitHub、HTML、瀏覽器 JavaScript 或公開文件。

## 初始化資料庫
資料庫接好後，在可取得同一組 `DATABASE_URL` 的環境執行：

```bash
npm run db:init
```

會建立：
- users
- sessions
- memberships
- payment_orders
- membership_events

## 上線前檢查
部署後開啟：

`/api/system/status`

應符合：
- `databaseConnected: true`
- `schemaReady: true`
- `paymentConfigured: true`
- `ready: true`
- `paymentMode: "test"`

V17 頁面也會以圖形方式顯示這些狀態。

## 第一筆付款測試
1. 在正式 Vercel 網址開啟 `/cap-ai-preview/final-v17.html`
2. 建立學生測試帳號
3. 登入
4. 選 NT$999 月繳
5. 使用藍新測試環境完成交易
6. 回到會員中心
7. 確認最近訂單為 `paid`
8. 確認方案變成 `AI Complete`
9. 確認到期日增加 30 天
10. 再確認相同 Notify 重送不會多加 30 天

## 正式收款前
完成至少一筆月繳與一筆年繳測試後，才將 `NEWEBPAY_MODE` 從 `test` 改為 `production`，並重新部署。
