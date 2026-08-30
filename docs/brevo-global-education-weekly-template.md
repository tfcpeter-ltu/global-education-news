# Global Education Weekly｜Brevo 固定週報版型

## 建議寄件設定
- From name: Global Education News 編輯部
- From email: editor.jsti.ltu@gmail.com
- Reply-to: editor.jsti.ltu@gmail.com
- Recipients list: Global Education Weekly Subscribers
- Subject: Global Education Weekly｜本週國際教育重點
- Preview text: 台灣與全球大學招生、留學政策、國際高中與教育趨勢，一封信掌握本週重點。

## RSS Feed
https://tfcpeter-ltu.github.io/global-education-news/weekly-feed.xml

## 固定結構

### Masthead
GLOBAL EDUCATION WEEKLY
國際教育週報
Global Education News｜Taiwan Edition

### Opening note
本週精選台灣與全球最值得關注的國際教育新聞、大學招生、留學政策與教育趨勢。以下內容均可點擊標題閱讀完整文章與來源。

### Repeatable article block
此區塊在 Brevo RSS Template 中設定為 Repeatable content，建議每期最多顯示 6 則。

- 圖片 URL: `{{ item.ENCLOSURE }}`
- 分類: `{{ item.CATEGORY }}`
- 標題: `{{ item.TITLE }}`
- 日期: `{{ item.PUBDATE }}`
- 摘要: `{{ item.DESCRIPTION | safe }}`
- 閱讀全文連結: `{{ item.LINK }}`
- CTA: `閱讀全文 →`

### Peter's Note
PETER'S NOTE｜本週觀點
每週從最新政策與招生新聞中挑出最值得台灣學生、家長與教育工作者注意的變化。完整觀點請至 Peter的國際教育講座。

連結：https://tfcpeter-ltu.github.io/global-education-news/peter/

### Footer
Global Education News｜國際教育新聞網
編輯部：editor.jsti.ltu@gmail.com
免費訂閱 Global Education Weekly，每週掌握國際教育重點。

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
- Article limit: 6
- 若沒有新文章：不寄送
