import Link from "next/link";
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
    <div className="space-y-5">
      {/* 模块头 */}
      <header className="flex flex-col gap-1">
        <Link href="/" className="text-[13px] font-medium text-[#6b7280] transition-colors hover:text-[#0e7a5a]">
          ← 返回概览
        </Link>
        <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-tight text-[#16181d]">{mod.name}</h1>
        <p className="text-sm text-[#6b7280]">{mod.desc}</p>
      </header>

      {/* 指标卡片 */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m) => (
          <MetricCard key={m.metric_code} metric={m} />
        ))}
      </section>

      {/* 目标完成率 */}
      <Panel title="各指标目标完成率" icon="target" source="统一经营模型">
        <CompletionChart metrics={metrics} />
      </Panel>
    </div>
  );
}
