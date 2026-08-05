"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { IconName } from "@/components/Icon";

// 顶部导航：白底细边、品牌方块、当前页墨绿下划线。
const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "概览", icon: "layers" },
  { href: "/modules/business", label: "经营结果", icon: "revenue" },
  { href: "/modules/customer", label: "客户增长", icon: "users" },
  { href: "/modules/project", label: "项目与交付", icon: "target" },
  { href: "/modules/org", label: "组织效率", icon: "building" },
];

export default function AppHeader() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-[#e8e6e1] bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div className="flex h-full items-center">
          <Link href="/" className="flex items-center gap-2.5 pr-6">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#16181d] text-[13px] font-bold text-white">
              B
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-[#16181d]">
              BizPilot<span className="ml-1 font-normal text-[#9aa0a8]">Lite</span>
            </span>
          </Link>
          <nav className="hidden h-full items-center gap-0.5 md:flex" aria-label="主导航">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex h-14 items-center gap-1.5 px-3 text-[13.5px] transition-colors ${
                  isActive(item.href)
                    ? "font-semibold text-[#16181d] after:absolute after:inset-x-3 after:bottom-0 after:h-[2px] after:rounded-t-full after:bg-[#0e7a5a]"
                    : "text-[#6b7280] hover:text-[#16181d]"
                }`}
              >
                <Icon name={item.icon} size={15} className={isActive(item.href) ? "text-[#0e7a5a]" : "text-[#9aa0a8]"} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-[#e8e6e1] bg-[#f6f6f3] px-2.5 py-1 text-[11px] font-medium text-[#6b7280] sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0e7a5a]" />
            模拟数据
          </span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0e7a5a] text-[11px] font-semibold text-white">
            CE
          </span>
        </div>
      </div>
    </header>
  );
}
