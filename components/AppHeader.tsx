"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 顶部导航：沿用 BizPilot 的 64px 白底头部 + 品牌渐变标 + 激活项蓝色下划线。
const NAV = [
  { href: "/", label: "首页", icon: "⌂" },
  { href: "/modules/business", label: "经营结果", icon: "💰" },
  { href: "/modules/customer", label: "客户增长", icon: "👥" },
  { href: "/modules/project", label: "项目与交付", icon: "▧" },
  { href: "/modules/org", label: "组织效率", icon: "🏢" },
];

export default function AppHeader() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#e8edf3] bg-white px-6">
      <div className="flex h-full items-center">
        <Link href="/" className="flex items-center gap-2.5 pr-5">
          <span className="grid h-[34px] w-[34px] place-items-center rounded-lg bg-gradient-to-br from-[#2563eb] to-[#18a058] text-xs font-extrabold text-white">
            BP
          </span>
          <span className="text-lg font-bold text-slate-800">BizPilot Lite</span>
        </Link>
        <nav className="hidden h-full items-center gap-1 md:flex" aria-label="主导航">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex h-16 items-center gap-1.5 px-3.5 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-[#2563eb] after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:rounded-t-full after:bg-[#2563eb]"
                  : "text-slate-600 hover:bg-[#f6f8ff] hover:text-[#2563eb]"
              }`}
            >
              <span className="text-[15px] leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-[rgba(18,169,135,0.1)] px-2 py-0.5 text-xs font-bold text-[#0f936f]">
          v0.1 模拟数据
        </span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
          CE
        </span>
      </div>
    </header>
  );
}
