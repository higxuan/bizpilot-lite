import {
  Metric,
  formatMetricValue,
  metricStatus,
  completionRate,
} from "@/lib/metrics";

const STATUS = {
  达标: { badge: "bg-[#15803d]/10 text-[#15803d]", bar: "#15803d" },
  关注: { badge: "bg-[#b45309]/10 text-[#b45309]", bar: "#b45309" },
  预警: { badge: "bg-[#b91c1c]/10 text-[#b91c1c]", bar: "#b91c1c" },
} as const;

export default function MetricCard({ metric }: { metric: Metric }) {
  const status = metricStatus(metric);
  const rate = completionRate(metric);
  const s = STATUS[status];

  return (
    <article className="flex flex-col rounded-2xl border border-[#e8e6e1] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.03)] transition-all duration-200 hover:border-[#dcd9d2] hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)]">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-[#6b7280]">{metric.metric_name}</span>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${s.badge}`}>{status}</span>
      </div>
      <div className="num mt-3 text-[26px] font-semibold leading-none text-[#16181d]">
        {formatMetricValue(metric.actual_value, metric.unit)}
      </div>
      <div className="mt-2 flex items-center justify-between text-[12px] text-[#9aa0a8]">
        <span>目标 {formatMetricValue(metric.target_value, metric.unit)}</span>
        <span className="num font-semibold text-[#44484f]">{(rate * 100).toFixed(0)}%</span>
      </div>
      {/* 目标完成率进度条 */}
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#f0efeb]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(rate, 1) * 100}%`, background: s.bar }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[#f0efeb] pt-3 text-[12px] text-[#9aa0a8]">
        <span className="num">
          同比 {(metric.yoy * 100).toFixed(0)}% · 环比 {(metric.mom * 100).toFixed(0)}%
        </span>
        <span>{metric.owner}</span>
      </div>
    </article>
  );
}
