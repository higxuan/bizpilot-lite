import { OverviewKpi, Tone } from "@/lib/overview";

// KPI 卡：图标 + 标签 + 大数值 + 徽标 pill + 涨跌% + 副文本（对齐 BizPilot 卡片语言）。
const TONE_TEXT: Record<Tone, string> = {
  positive: "text-[#0f936f]",
  warning: "text-[#b15c00]",
  negative: "text-[#c2410c]",
  neutral: "text-[#52627a]",
};
const TONE_BADGE: Record<Tone, string> = {
  positive: "bg-[rgba(18,169,135,0.1)] text-[#0f936f]",
  warning: "bg-[rgba(240,180,41,0.15)] text-[#b15c00]",
  negative: "bg-[rgba(255,90,61,0.1)] text-[#c2410c]",
  neutral: "bg-[rgba(82,98,122,0.1)] text-[#52627a]",
};

export default function KpiCard({ kpi }: { kpi: OverviewKpi }) {
  return (
    <article className="flex flex-col gap-2.5 rounded-lg border border-[#e8edf3] bg-white px-[18px] py-4 shadow-[0_8px_24px_rgba(23,32,51,0.04)]">
      <div className="flex items-center gap-2">
        <span className="text-lg">{kpi.icon}</span>
        <span className="text-[13px] text-[#667085]">{kpi.label}</span>
      </div>
      <div className="break-words text-2xl font-bold leading-[1.1] text-[#101828]">{kpi.value}</div>
      <div className="flex items-center justify-between">
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${TONE_BADGE[kpi.tone]}`}>
          {kpi.badge}
        </span>
        <span className={`text-[13px] font-semibold ${TONE_TEXT[kpi.tone]}`}>{kpi.change}</span>
      </div>
      <div className="text-xs text-[#98a2b3]">{kpi.sub}</div>
    </article>
  );
}
