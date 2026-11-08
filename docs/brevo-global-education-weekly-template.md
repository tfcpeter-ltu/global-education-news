# Global Education Weekly｜Brevo 固定週報版型

## 建議寄件設定
- From name: Global Education News 編輯部
- From email: editor.jsti.ltu@gmail.com
- Reply-to: editor.jsti.ltu@gmail.com
- Recipients list: Global Education Weekly Subscribers
- Subject: Global Education Weekly｜本週國際教育重點
- Preview text: 國際教育新聞與本週新增獎學金摘要、申請重點及連結。

## RSS Feed
https://globalednews.com/weekly-feed.xml

## 固定結構

### Masthead
GLOBAL EDUCATION WEEKLY
國際教育週報
Global Education News｜Taiwan Edition

### Opening note
本週精選台灣與全球最值得關注的國際教育新聞、大學招生、留學政策與教育趨勢，另附台灣國際獎學金本週新增項目的摘要及連結。以下內容均可點擊標題閱讀完整文章與來源。

### Repeatable article block
保留六篇新聞，再顯示一個「台灣國際獎學金｜本週新增」彙整區塊。既有 Brevo 模板 #8 的迴圈改為 `params.items | slice:"0:7"`，保留 `item.DESCRIPTION | safe`，讓彙整中的各獎項連結可直接點擊。

- 圖片 URL: `{{ item.ENCLOSURE }}`
- 分類: `{{ item.CATEGORY }}`
- 標題: `{{ item.TITLE }}`
- 日期: `{{ item.PUBDATE }}`
- 摘要: `{{ item.DESCRIPTION | safe }}`
- 閱讀全文連結: `{{ item.LINK }}`
- CTA: `閱讀全文 →`

### 台灣國際獎學金｜本週新增（2026-11-08 新增）

- RSS 第七項彙整最近七個台北日曆日實際新增的獎學金；採原始發布日期，不以更新或重查日期充抵新增。當日報告須證明 `isNew`、`baselineAbsent`、台灣資格，且 slug 不在起始基準。
- 每項提供名稱、國家／學位、補助、簡短摘要、重要申請資格、期限、當下申請狀態及獨立的正式詳情連結；詳情頁保留官方來源。
- 已截止或待複查項目如實標示，不能冒稱仍可申請。沒有合格新增項目時不捏造名額。
- 免費、具公益性質的資訊整理，邀請追蹤環球教育新聞與免費加入會員；不宣稱保證獲獎。
- 每期正式寄出前核對更新後的預覽、日期範圍、每個摘要與連結、會員名單及原排程；不重送已寄期別，不新增寄送自動化。

### Peter's Note
PETER'S NOTE｜本週觀點
每週從最新政策與招生新聞中挑出最值得台灣學生、家長與教育工作者注意的變化。完整觀點請至 Peter的國際教育講座。

連結：https://globalednews.com/peter/

### Footer
Global Education News｜國際教育新聞網
編輯部：editor.jsti.ltu@gmail.com
免費訂閱 Global Education Weekly，每週掌握國際教育重點與新增獎學金摘要、連結。會員入口：https://globalednews.com/newsletter/

保留 Brevo 自動產生的 Unsubscribe／取消訂閱連結，不可移除。

## 視覺規格
- 背景：#F4F0E7 或白色
- 主文字：#171512
- 強調色：#7A2E36
- 標題：Georgia / serif
- 內文：Arial / Noto Sans TC
- 版寬：600–680px
- 圖片：16:9，寬度 100%
- 文章之間使用 1px 細線，不使用大型彩色卡片
- 保持英式報紙／週報感

## Brevo RSS Campaign 建議排程
- Frequency: Weekly
- Day: Monday
- Check/send time: 08:00 Asia/Taipei
- Send mode: Automatically
- Article limit: 7（六篇新聞＋一個獎學金彙整區塊）
- 若沒有新文章：不寄送
