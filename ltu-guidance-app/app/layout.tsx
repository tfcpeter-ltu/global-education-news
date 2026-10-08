import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LTU OSSD 升學輔導資料庫",
  description: "學生選校、申請、錄取與簽證輔導紀錄",
  other: {
    "codex-preview": "development",
  },
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
