import { CSSProperties } from "react";

// 轻量线性 SVG 图标集（stroke 风格，1.6px），替代 emoji，让界面更专业克制。
export type IconName =
  | "revenue"
  | "profit"
  | "cash"
  | "target"
  | "users"
  | "building"
  | "alert"
  | "spark"
  | "arrowUp"
  | "arrowDown"
  | "calendar"
  | "layers";

const PATHS: Record<IconName, string> = {
  revenue: "M3 17l5-5 4 4 6-7 3 3M21 12V7h-5", // 折线向上
  profit: "M4 19h16M7 15v-3M12 15V8M17 15v-6", // 柱状
  cash: "M12 3v18M17 7H9.5a2.5 2.5 0 000 5h5a2.5 2.5 0 010 5H6", // 货币
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 17a5 5 0 100-10 5 5 0 000 10zM12 12h.01", // 靶心
  users: "M16 19v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1M9.5 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM21 19v-1a4 4 0 00-3-3.87M15.5 3.13a3.5 3.5 0 010 6.74",
  building: "M4 21V5a2 2 0 012-2h8a2 2 0 012 2v16M4 21h16M9 7h2M9 11h2M9 15h2M17 9h2a2 2 0 012 2v10M17 21v-4",
  alert: "M12 9v4M12 17h.01M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0z",
  spark: "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1",
  arrowUp: "M7 17L17 7M9 7h8v8",
  arrowDown: "M7 7l10 10M17 9v8H9",
  calendar: "M8 2v4M16 2v4M3 9h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  layers: "M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5",
};

export default function Icon({
  name,
  size = 16,
  className = "",
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
