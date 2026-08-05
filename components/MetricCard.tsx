import { Metric } from "@/lib/metrics";

function fmtValue(m: Metric): string {
  if (m.unit === "CNY") return "¥" + (m.actual_value / 10000).toFixed(1) + "万";
  if (m.unit === "pct") return (m.actual_value * 100).toFixed(1) + "%";
  return String(m.actual_value);
}

function fmtTarget(m: Metric): string {
  if (m.unit === "CNY") return "¥" + (m.target_value / 10000).toFixed(1) + "万";
  if (m.unit === "pct") return (m.target_value * 100).toFixed(1) + "%";
  return String(m.target_value);
}

export default function MetricCard({ metric }: { metric: Metric }) {
  const rate = metric.target_value ? metric.actual_value / metric.target_value : 1;
  // 对「越低越好」的指标（成本、流失率、偏差、风险、费用率、负载）反向判断颜色
  const lowerBetter = ["total_cost", "churn_rate", "budget_deviation", "delay_risk", "expense_rate", "team_load", "key_role_risk", "concentration"].includes(metric.metric_code);
  const good = lowerBetter ? rate <= 1 : rate >= 1;
  const ok = lowerBetter ? rate <= 1.2 : rate >= 0.8;
  const color = good ? "text-emerald-600" : ok ? "text-amber-600" : "text-rose-600";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm text-slate-500">{metric.metric_name}</div>
      <div className={`mt-1 text-2xl font-semibold ${color}`}>{fmtValue(metric)}</div>
      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>目标 {fmtTarget(metric)}</span>
        <span>同比 {(metric.yoy * 100).toFixed(0)}% · 环比 {(metric.mom * 100).toFixed(0)}%</span>
      </div>
      <div className="mt-1 text-xs text-slate-400">
        负责人：{metric.owner} · 来源：{metric.source}
      </div>
    </div>
  );
}
