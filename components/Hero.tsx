import { PERIODS, PeriodKey } from "@/lib/overview";

// 渐变 Hero：live-dot + 经营驾驶舱 + 数据截止时间 + 大标题 + 副标题 + 周期切换。
export default function Hero({
  period,
  onChange,
  updatedAt,
}: {
  period: PeriodKey;
  onChange: (p: PeriodKey) => void;
  updatedAt: string;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-[#e8edf3] bg-[linear-gradient(110deg,rgba(240,249,255,0.96),rgba(244,255,248,0.95))] px-7 py-6 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5 text-[13px] text-[#667085]">
          <span className="h-2 w-2 rounded-full bg-[#12a987] shadow-[0_0_0_4px_rgba(18,169,135,0.12)]" />
          <span>经营驾驶舱</span>
          <span>数据截至 {updatedAt}（模拟）</span>
        </div>
        <h1 className="text-[26px] font-bold leading-tight text-[#101828]">全维度经营概览</h1>
        <p className="text-sm text-[#475467]">汇聚经营结果、客户、项目与组织核心指标，一页掌握经营全局</p>
      </div>
      <div className="inline-flex self-start rounded-lg border border-[#e6ebf2] bg-white/80 p-1 md:self-center">
        {PERIODS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={`h-[30px] min-w-[64px] rounded-md px-3 text-[13px] font-bold transition ${
              period === t.key
                ? "bg-white text-[#101828] shadow-[0_2px_6px_rgba(23,32,51,0.08)]"
                : "text-[#667085]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </section>
  );
}
