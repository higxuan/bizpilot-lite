"use client";

import { useMemo } from "react";
import * as echarts from "echarts";
import EChart from "@/components/EChart";
import { Metric, completionRate, metricStatus } from "@/lib/metrics";

const STATUS_COLOR = { 达标: "#15803d", 关注: "#b45309", 预警: "#b91c1c" } as const;

// 模块页「目标完成率」横向条形图：单位无关、可比，按状态着色（绿/橙/红）。
export default function CompletionChart({ metrics }: { metrics: Metric[] }) {
  const option = useMemo<echarts.EChartsOption>(() => {
    const rows = metrics.map((m) => ({
      name: m.metric_name,
      rate: completionRate(m),
      status: metricStatus(m),
    }));
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: "#16181d",
        borderWidth: 0,
        textStyle: { color: "#fff", fontSize: 12 },
        valueFormatter: (v) => `${(Number(v) * 100).toFixed(0)}%`,
      },
      grid: { left: 4, right: 44, top: 8, bottom: 8, containLabel: true },
      xAxis: {
        type: "value",
        max: (v: { max: number }) => Math.max(1, Math.ceil(v.max * 10) / 10),
        axisLabel: { color: "#9aa0a8", fontSize: 11, formatter: (v: number) => `${v * 100}%` },
        splitLine: { lineStyle: { color: "#f0efeb" } },
      },
      yAxis: {
        type: "category",
        data: rows.map((r) => r.name),
        axisLine: { show: false },
        axisLabel: { color: "#44484f", fontSize: 12 },
        axisTick: { show: false },
      },
      series: [
        {
          type: "bar",
          barWidth: 14,
          showBackground: true,
          backgroundStyle: { color: "#f6f6f3", borderRadius: [0, 7, 7, 0] },
          itemStyle: { borderRadius: [0, 7, 7, 0] },
          label: {
            show: true,
            position: "right",
            color: "#44484f",
            fontSize: 12,
            fontWeight: 600,
            formatter: (p) => `${(Number(p.value) * 100).toFixed(0)}%`,
          },
          data: rows.map((r) => ({
            value: Math.round(r.rate * 100) / 100,
            itemStyle: { color: STATUS_COLOR[r.status] },
          })),
        },
      ],
    };
  }, [metrics]);

  return <EChart option={option} height={Math.max(220, metrics.length * 46)} />;
}
