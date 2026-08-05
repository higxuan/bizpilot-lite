import {
  Metric,
  formatMetricValue,
  metricStatus,
  completionRate,
} from "@/lib/metrics";

const STATUS_BADGE = {
  达标: "bg-[rgba(18,169,135,0.1)] text-[#0f936f]",
  关注: "bg-[rgba(240,180,41,0.15)] text-[#b15c00]",
  预警: "bg-[rgba(255,90,61,0.1)] text-[#c2410c]",
} as const;

export default function MetricCard({ metric }: { metric: Metric }) {
  const status = metricStatus(metric);
  const rate = completionRate(metric);

  return (
    <article className="flex flex-col gap-2.5 rounded-lg border border-[#e8edf3] bg-white px-[18px] py-4 shadow-[0_8px_24px_rgba(23,32,51,0.04)]">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-[#667085]">{metric.metric_name}</span>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${STATUS_BADGE[status]}`}>
          {status}
        </span>
      </div>
      <div className="break-words text-2xl font-bold leading-[1.1] text-[#101828]">
        {formatMetricValue(metric.actual_value, metric.unit)}
      </div>
      <div className="flex items-center justify-between text-[13px]">
        <span className="text-[#98a2b3]">目标 {formatMetricValue(metric.target_value, metric.unit)}</span>
        <span className="font-semibold text-[#52627a]">{(rate * 100).toFixed(0)}%</span>
      </div>
      {/* 目标完成率进度条 */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#eef2f6]">
        <div
          className={`h-full rounded-full ${
            status === "达标" ? "bg-[#12a987]" : status === "关注" ? "bg-[#f0b429]" : "bg-[#ff5a3d]"
          }`}
          style={{ width: `${Math.min(rate, 1) * 100}%` }}
        />
      </div>
      <div className="text-xs text-[#98a2b3]">
        同比 {(metric.yoy * 100).toFixed(0)}% · 环比 {(metric.mom * 100).toFixed(0)}% · {metric.owner}
      </div>
    </article>
  );
}
