import { notFound } from "next/navigation";
import { MODULES, metricsByModule } from "@/lib/metrics";
import MetricCard from "@/components/MetricCard";
import CompletionChart from "@/components/CompletionChart";
import Panel from "@/components/Panel";

export function generateStaticParams() {
  return MODULES.map((m) => ({ key: m.key }));
}

export default function ModulePage({ params }: { params: { key: string } }) {
  const mod = MODULES.find((m) => m.key === params.key);
  if (!mod) notFound();
  const metrics = metricsByModule(mod.key);

  return (
    <div className="grid gap-4">
      {/* 模块头 */}
      <section className="rounded-lg border border-[#e8edf3] bg-[linear-gradient(110deg,rgba(240,249,255,0.96),rgba(244,255,248,0.95))] px-7 py-6">
        <div className="flex items-center gap-2.5 text-[13px] text-[#667085]">
          <span className="h-2 w-2 rounded-full bg-[#12a987] shadow-[0_0_0_4px_rgba(18,169,135,0.12)]" />
          <span>经营驾驶舱 · {mod.name}</span>
        </div>
        <h1 className="mt-1.5 text-[26px] font-bold leading-tight text-[#101828]">{mod.name}</h1>
        <p className="mt-1 text-sm text-[#475467]">{mod.desc}</p>
      </section>

      {/* 指标卡片 */}
      <section className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m) => (
          <MetricCard key={m.metric_code} metric={m} />
        ))}
      </section>

      {/* 目标完成率 */}
      <Panel title="各指标目标完成率" source="统一经营模型">
        <CompletionChart metrics={metrics} />
      </Panel>
    </div>
  );
}
