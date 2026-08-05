import { PERIODS, PeriodKey } from "@/lib/overview";
import Icon from "@/components/Icon";

// 编辑感页头：问候 + 日期 + 一句定位，右侧为分段周期控件。克制、无大面积渐变。
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
    <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="flex items-center gap-2 text-[13px] text-[#6b7280]">
          <Icon name="calendar" size={14} />
          <span>经营驾驶舱</span>
          <span className="text-[#dcd9d2]">·</span>
          <span>数据截至 {updatedAt}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#0e7a5a]/10 px-2 py-0.5 text-[11px] font-semibold text-[#0e7a5a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0e7a5a]" />
            实时
          </span>
        </div>
        <h1 className="mt-2 text-[30px] font-semibold leading-tight tracking-tight text-[#16181d]">
          经营概览
        </h1>
        <p className="mt-1 text-sm text-[#6b7280]">
          汇聚经营结果、客户、项目与组织核心指标，一页掌握全局。
        </p>
      </div>

      {/* 分段周期控件 */}
      <div className="inline-flex self-start rounded-xl border border-[#e8e6e1] bg-white p-1 shadow-[0_1px_2px_rgba(16,24,40,0.03)] md:self-auto">
        {PERIODS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={`h-9 min-w-[72px] rounded-lg px-4 text-[13px] font-semibold transition-all duration-150 ${
              period === t.key
                ? "bg-[#16181d] text-white shadow-sm"
                : "text-[#6b7280] hover:text-[#16181d]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </header>
  );
}
