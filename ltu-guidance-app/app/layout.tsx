import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LTU OSSD 升學輔導資料庫",
  robots: { index: false, follow: false },
  referrer: 'strict-origin-when-cross-origin',
  description: "學生選校、申請、錄取與簽證輔導紀錄",
icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className="antialiased">{children}<footer data-service-identity="ltu" style={{"position":"relative","clear":"both","padding":"18px 20px","textAlign":"center","font":"13px/1.8 system-ui,sans-serif","color":"#193b56","background":"#f1f6fa","borderTop":"1px solid #ccd9e4","overflowWrap":"anywhere"}}><span>布萊斯教育有限公司（LTU Education Center Co.）｜統一編號 91023087</span><br /><a href="/security" style={{"color":"#164c76","textDecoration":"underline"}}>營運者、資料使用與安全</a> · <a href="/security#privacy" style={{"color":"#164c76","textDecoration":"underline"}}>資料使用與聯絡方式</a></footer></body>
    </html>
  );
}
