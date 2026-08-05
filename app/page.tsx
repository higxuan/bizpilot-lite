import Link from "next/link";
import { MOCK_METRICS, MODULES, metricsByModule } from "@/lib/metrics";
import MetricCard from "@/components/MetricCard";
import TrendChart from "@/components/TrendChart";

export default function Home() {
  const business = metricsByModule("business");
  const get = (code: string) => MOCK_METRICS.find((m) => m.metric_code === code)!;
  const revenue = get("monthly_revenue");
  const profit = get("net_profit");
  const cash = get("cash_flow");

  return (
    <main>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">CEO 经营驾驶舱</h1>
        <p className="mt-1 text-sm text-slate-500">
          BizPilot Lite · 当前为模拟数据（{revenue.period}）· 企业接入真实数据后自动替换
        </p>
      </header>

      {/* 四大经营模块入口 */}
      <section className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {MODULES.map((m) => (
          <Link
            key={m.key}
            href={`/modules/${m.key}`}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-400 hover:shadow"
          >
            <div className="text-base font-semibold text-slate-800">{m.name}</div>
            <div className="mt-1 text-xs text-slate-400">{m.desc}</div>
          </Link>
        ))}
      </section>

      {/* 经营结果指标卡片 */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">经营结果</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {business.map((m) => (
            <MetricCard key={m.metric_code} metric={m} />
          ))}
        </div>
      </section>

      {/* 趋势图 */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">趋势：收入 / 利润 / 现金流（近 5 期，单位：万元）</h2>
        <TrendChart
          series={[
            { data: revenue.trend ?? [], color: "#2563eb", label: "收入" },
            { data: profit.trend ?? [], color: "#16a34a", label: "利润" },
            { data: cash.trend ?? [], color: "#f59e0b", label: "现金流" },
          ]}
        />
      </section>

      <footer className="mt-10 text-center text-xs text-slate-400">
        本页为课程第 3 篇「用 AI 搭出第一版经营驾驶舱」的骨架产出 · 数据来自 lib/metrics.ts 模拟数据
      </footer>
    </main>
  );
}
