"use client";

import { useMemo, useState } from "react";
import * as echarts from "echarts";
import Hero from "@/components/Hero";
import KpiCard from "@/components/KpiCard";
import Panel from "@/components/Panel";
import EChart from "@/components/EChart";
import Icon from "@/components/Icon";
import {
  OVERVIEW_KPIS,
  TRENDS,
  REVENUE_STRUCTURE,
  STRUCTURE_COLORS,
  ALERTS,
  EXEC_SUMMARY,
  PeriodKey,
} from "@/lib/overview";
import { MODULES, metricsByModule, formatMetricValue, metricStatus, completionRate } from "@/lib/metrics";

const UPDATED_AT = "2026-08-01";

function buildTrendOption(period: PeriodKey): echarts.EChartsOption {
  const { labels, series } = TRENDS[period];
  return {
    color: series.map((s) => s.color),
    tooltip: {
      trigger: "axis",
      backgroundColor: "#16181d",
      borderWidth: 0,
      textStyle: { color: "#fff", fontSize: 12 },
      axisPointer: { lineStyle: { color: "#dcd9d2" } },
    },
    legend: {
      top: 0,
      right: 0,
      itemWidth: 10,
      itemHeight: 2,
      icon: "rect",
      textStyle: { color: "#6b7280", fontSize: 12 },
      data: series.map((s) => s.name),
    },
    grid: { left: 4, right: 8, top: 34, bottom: 4, containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: labels,
      axisLine: { lineStyle: { color: "#eceae5" } },
      axisTick: { show: false },
      axisLabel: { color: "#9aa0a8", fontSize: 12 },
    },
    yAxis: {
      type: "value",
      name: "万元",
      nameTextStyle: { color: "#9aa0a8", fontSize: 11 },
      axisLabel: { color: "#9aa0a8", fontSize: 12 },
      splitLine: { lineStyle: { color: "#f0efeb" } },
    },
    series: series.map((s, i) => ({
      name: s.name,
      type: "line",
      smooth: 0.4,
      symbol: "circle",
      symbolSize: 5,
      showSymbol: false,
      lineStyle: { width: i === 0 ? 2.5 : 1.8 },
      emphasis: { focus: "series" },
      ...(i === 0
        ? {
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(14,122,90,0.14)" },
                { offset: 1, color: "rgba(14,122,90,0)" },
              ]),
            },
          }
        : {}),
      data: s.data,
    })),
  };
}

function buildStructureOption(period: PeriodKey): echarts.EChartsOption {
  const data = REVENUE_STRUCTURE[period];
  const total = data.reduce((s, d) => s + d.value, 0);
  return {
    color: STRUCTURE_COLORS,
    tooltip: {
      trigger: "item",
      backgroundColor: "#16181d",
      borderWidth: 0,
      textStyle: { color: "#fff", fontSize: 12 },
      valueFormatter: (v) => `¥${v}万`,
    },
    legend: {
      bottom: 0,
      left: "center",
      itemWidth: 8,
      itemHeight: 8,
      icon: "circle",
      textStyle: { color: "#6b7280", fontSize: 12 },
    },
    series: [
      {
        type: "pie",
        radius: ["58%", "80%"],
        center: ["50%", "44%"],
        avoidLabelOverlap: true,
        padAngle: 2,
        itemStyle: { borderRadius: 6, borderColor: "#fff", borderWidth: 2 },
        label: { show: false },
        emphasis: {
          scale: true,
          scaleSize: 4,
          label: { show: false },
        },
        data,
      },
    ],
    graphic: [
      {
        type: "text",
        left: "center",
        top: "38%",
        style: {
          text: `¥${total.toFixed(0)}万`,
          fontSize: 22,
          fontWeight: 600,
          fill: "#16181d",
          align: "center",
        },
      },
      {
        type: "text",
        left: "center",
        top: "48%",
        style: { text: "总收入", fontSize: 12, fill: "#9aa0a8", align: "center" },
      },
    ],
  };
}

const ALERT_STYLE = {
  high: { dot: "#b91c1c", bg: "bg-[#b91c1c]/[0.06]", ring: "border-[#b91c1c]/20", label: "高" },
  mid: { dot: "#b45309", bg: "bg-[#b45309]/[0.06]", ring: "border-[#b45309]/20", label: "中" },
  low: { dot: "#5b6670", bg: "bg-[#5b6670]/[0.06]", ring: "border-[#5b6670]/20", label: "低" },
} as const;

export default function Dashboard() {
  const [period, setPeriod] = useState<PeriodKey>("month");

  const trendOption = useMemo(() => buildTrendOption(period), [period]);
  const structureOption = useMemo(() => buildStructureOption(period), [period]);
  const summary = EXEC_SUMMARY[period];

  // 模块健康度：各模块平均目标完成率
  const moduleHealth = MODULES.map((m) => {
    const list = metricsByModule(m.key);
    const avg = list.reduce((s, x) => s + completionRate(x), 0) / (list.length || 1);
    return { ...m, pct: Math.round(avg * 100) };
  });

  return (
    <div className="space-y-5">
      <Hero period={period} onChange={setPeriod} updatedAt={UPDATED_AT} />

      {/* 经营摘要横幅 */}
      <section className="relative overflow-hidden rounded-2xl bg-[#16181d] px-6 py-5 text-white shadow-[0_8px_24px_rgba(16,24,40,0.12)]">
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#0e7a5a]/20 blur-3xl" />
        <div className="relative flex items-start gap-4">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0e7a5a]/20 text-[#4ade80]">
            <Icon name="spark" size={18} />
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9aa0a8]">
              经营摘要 · AI 生成
            </div>
            <p className="mt-1.5 text-[16px] font-medium leading-snug text-white">
              {summary.headline}
            </p>
            <ul className="mt-3 space-y-1.5">
              {summary.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-[#c8cdd4]">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#4ade80]" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 核心指标卡片 */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {OVERVIEW_KPIS[period].map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </section>

      {/* 趋势 + 收入结构 */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Panel title="收入 · 成本 · 利润趋势" icon="revenue" source="统一经营模型">
          <EChart option={trendOption} height={300} />
        </Panel>
        <Panel title="收入结构" icon="layers" source="按业务线">
          <EChart option={structureOption} height={300} />
        </Panel>
      </section>

      {/* 风险预警 + 模块健康度 */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Panel
          title="风险预警"
          icon="alert"
          source={`${ALERTS.length} 条待处理`}
          action={
            <span className="rounded-full bg-[#b91c1c]/10 px-2 py-0.5 text-[11px] font-semibold text-[#b91c1c]">
              {ALERTS.filter((a) => a.level === "high").length} 高
            </span>
          }
        >
          <ul className="divide-y divide-[#f0efeb]">
            {ALERTS.map((a, i) => {
              const s = ALERT_STYLE[a.level];
              return (
                <li key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border text-[10px] font-bold ${s.bg} ${s.ring}`} style={{ color: s.dot }}>
                    {s.label}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="truncate text-[14px] font-medium text-[#16181d]">{a.title}</span>
                      <span className="shrink-0 text-[12px] text-[#9aa0a8]">{a.owner}</span>
                    </div>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-[#6b7280]">{a.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel title="模块健康度" icon="target" source="目标完成率">
          <div className="space-y-4">
            {moduleHealth.map((m) => (
              <div key={m.key}>
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="text-[13px] font-medium text-[#44484f]">{m.name}</span>
                  <span className="num text-[13px] font-semibold text-[#16181d]">{m.pct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f0efeb]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#0e7a5a] to-[#3f7d5d] transition-all duration-500"
                    style={{ width: `${Math.min(m.pct, 100)}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="border-t border-[#f0efeb] pt-3 text-[12px] leading-relaxed text-[#9aa0a8]">
              健康度 = 该模块各指标目标完成率的平均值，用于快速定位短板模块。
            </p>
          </div>
        </Panel>
      </section>

      <footer className="pb-2 pt-1 text-center text-[12px] text-[#9aa0a8]">
        本页为课程「用 AI 搭出第一版经营驾驶舱」产出 · 数据来自 lib/overview.ts 与 lib/metrics.ts 的脱敏模拟数据
      </footer>
    </div>
  );
}
