import Link from "next/link";
import { notFound } from "next/navigation";
import { MODULES, metricsByModule } from "@/lib/metrics";
import MetricCard from "@/components/MetricCard";

export function generateStaticParams() {
  return MODULES.map((m) => ({ key: m.key }));
}

export default function ModulePage({ params }: { params: { key: string } }) {
  const mod = MODULES.find((m) => m.key === params.key);
  if (!mod) notFound();
  const metrics = metricsByModule(mod.key);

  return (
    <main>
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← 返回驾驶舱首页
      </Link>
      <header className="mb-6 mt-2">
        <h1 className="text-2xl font-bold">{mod.name}</h1>
        <p className="mt-1 text-sm text-slate-500">{mod.desc}</p>
      </header>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {metrics.map((m) => (
          <MetricCard key={m.metric_code} metric={m} />
        ))}
      </section>
    </main>
  );
}
