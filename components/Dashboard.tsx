"use client";

import { useMemo, useState } from "react";
import * as echarts from "echarts";
import Hero from "@/components/Hero";
import KpiCard from "@/components/KpiCard";
import Panel from "@/components/Panel";
import EChart from "@/components/EChart";
import {
  OVERVIEW_KPIS,
  TRENDS,
  REVENUE_STRUCTURE,
  STRUCTURE_COLORS,
  PeriodKey,
} from "@/lib/overview";
import { metricsByModule, formatMetricValue, metricStatus, Metric } from "@/lib/metrics";

const UPDATED_AT = "2026-08-01";

function buildTrendOption(period: PeriodKey): echarts.EChartsOption {
  const { labels, series } = TRENDS[period];
  return {
    color: series.map((s) => s.color),
    tooltip: { trigger: "axis" },
    legend: {
      top: 0,
      right: 8,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: "#5d6678" },
      data: series.map((s) => s.name),
    },
    grid: { left: 8, right: 12, top: 42, bottom: 8, containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: labels,
      axisLine: { lineStyle: { color: "#e6ebf2" } },
      axisLabel: { color: "#7d8797" },
    },
    yAxis: {
      type: "value",
      name: "万元",
      axisLabel: { color: "#7d8797" },
      splitLine: { lineStyle: { color: "#edf1f6" } },
    },
    series: series.map((s, i) => ({
      name: s.name,
      type: "line",
      smooth: true,
      symbolSize: 6,
      lineStyle: { width: 2.5 },
      ...(i === 0
        ? {
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(255,90,61,0.18)" },
                { offset: 1, color: "rgba(255,90,61,0)" },
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
  return {
    color: STRUCTURE_COLORS,
    tooltip: { trigger: "item", valueFormatter: (v) => `¥${v}万` },
    legend: {
      bottom: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: "#5d6678" },
    },
    series: [
      {
        type: "pie",
        radius: ["48%", "72%"],
        center: ["50%", "44%"],
        avoidLabelOverlap: true,
        label: { formatter: "{d}%", color: "#344054", lineHeight: 16 },
        labelLine: { length: 12, length2: 8 },
        data,
      },
    ],
  };
}

// 模块速览面板的单条统计
function statOf(m: Metric) {
  return { label: m.metric_name, value: formatMetricValue(m.actual_value, m.unit), status: metricStatus(m) };
}

export default function Dashboard() {
  const [period, setPeriod] = useState<PeriodKey>("month");

  const trendOption = useMemo(() => buildTrendOption(period), [period]);
  const structureOption = useMemo(() => buildStructureOption(period), [period]);

  const customerStats = metricsByModule("customer").slice(0, 4).map(statOf);
  const projectStats = metricsByModule("project").slice(0, 4).map(statOf);

  return (
    <div className="grid gap-4">
      <Hero period={period} onChange={setPeriod} updatedAt={UPDATED_AT} />

      {/* 核心指标卡片 */}
      <section className="grid grid-cols-2 gap-3.5 md:grid-cols-3 xl:grid-cols-5">
        {OVERVIEW_KPIS[period].map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </section>

      {/* 趋势 + 收入结构 */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Panel title="收入 · 成本 · 利润趋势" source="统一经营模型">
          <EChart option={trendOption} height={320} />
        </Panel>
        <Panel title="收入结构">
          <EChart option={structureOption} height={320} />
        </Panel>
      </section>

      {/* 模块速览 */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Panel title="客户增长速览" source="CRM 数据">
          <InfoStatGrid stats={customerStats} />
        </Panel>
        <Panel title="项目与交付速览" source="项目系统">
          <InfoStatGrid stats={projectStats} />
        </Panel>
      </section>

      <footer className="pb-2 pt-2 text-center text-xs text-[#98a2b3]">
        本页为课程「用 AI 搭出第一版经营驾驶舱」的产出 · 数据来自 lib/overview.ts 与 lib/metrics.ts 的脱敏模拟数据
      </footer>
    </div>
  );
}

function InfoStatGrid({
  stats,
}: {
  stats: { label: string; value: string; status: "达标" | "关注" | "预警" }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3.5">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1 rounded-lg bg-[#f7f9fc] p-3.5">
          <span className="text-[13px] text-[#667085]">{s.label}</span>
          <div className="flex items-baseline justify-between">
            <strong className="text-base font-semibold text-[#101828]">{s.value}</strong>
            <StatusDot status={s.status} />
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusDot({ status }: { status: "达标" | "关注" | "预警" }) {
  const map = {
    达标: "bg-[rgba(18,169,135,0.1)] text-[#0f936f]",
    关注: "bg-[rgba(240,180,41,0.15)] text-[#b15c00]",
    预警: "bg-[rgba(255,90,61,0.1)] text-[#c2410c]",
  } as const;
  return (
    <span className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold ${map[status]}`}>{status}</span>
  );
}
