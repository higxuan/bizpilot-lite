import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BizPilot Lite · CEO 经营驾驶舱",
  description: "基于 AI Coding 的企业经营驾驶舱：可导入数据、发现异常、生成 AI 经营分析。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
      </body>
    </html>
  );
}
