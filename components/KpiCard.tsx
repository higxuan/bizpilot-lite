import { OverviewKpi, Tone } from "@/lib/overview";
import Icon from "@/components/Icon";
import Sparkline from "@/components/Sparkline";

// 高端 KPI 卡：线性图标 + 大数字 + 迷你趋势线 + 涨跌箭头（克制配色，无 emoji）。
const TONE_TEXT: Record<Tone, string> = {
  positive: "text-[#15803d]",
  warning: "text-[#b45309]",
  negative: "text-[#b91c1c]",
  neutral: "text-[#5b6670]",
};
const TONE_BADGE: Record<Tone, string> = {
  positive: "bg-[#15803d]/10 text-[#15803d]",
  warning: "bg-[#b45309]/10 text-[#b45309]",
  negative: "bg-[#b91c1c]/10 text-[#b91c1c]",
  neutral: "bg-[#5b6670]/10 text-[#5b6670]",
};
const TONE_SPARK: Record<Tone, string> = {
  positive: "#15803d",
  warning: "#b45309",
  negative: "#b91c1c",
  neutral: "#5b6670",
};

export default function KpiCard({ kpi }: { kpi: OverviewKpi }) {
  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-[#e8e6e1] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#dcd9d2] hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#6b7280]">
          <Icon name={kpi.icon} size={16} className="text-[#0e7a5a]" />
          <span className="text-[13px] font-medium">{kpi.label}</span>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${TONE_BADGE[kpi.tone]}`}>
          {kpi.badge}
        </span>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="num truncate text-[28px] font-semibold leading-none text-[#16181d]">
            {kpi.value}
          </div>
          <div className={`mt-2 flex items-center gap-1 text-[13px] font-semibold ${TONE_TEXT[kpi.tone]}`}>
            <Icon name={kpi.dir === "up" ? "arrowUp" : "arrowDown"} size={14} />
            <span className="num">{kpi.change}</span>
            <span className="ml-1 font-normal text-[#9aa0a8]">{kpi.sub}</span>
          </div>
        </div>
        <div className="shrink-0 opacity-80 transition-opacity group-hover:opacity-100">
          <Sparkline data={kpi.spark} color={TONE_SPARK[kpi.tone]} />
        </div>
      </div>
    </article>
  );
}
