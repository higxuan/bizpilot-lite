"use client";

import { useMemo } from "react";
import * as echarts from "echarts";
import EChart from "@/components/EChart";
import { Metric, completionRate, metricStatus } from "@/lib/metrics";

const STATUS_COLOR = { 达标: "#12a987", 关注: "#f0b429", 预警: "#ff5a3d" } as const;

// 模块页「目标完成率」横向条形图：单位无关、可比，按状态着色（红/黄/绿）。
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
        valueFormatter: (v) => `${(Number(v) * 100).toFixed(0)}%`,
      },
      grid: { left: 8, right: 40, top: 8, bottom: 8, containLabel: true },
      xAxis: {
        type: "value",
        max: (v: { max: number }) => Math.max(1, Math.ceil(v.max * 10) / 10),
        axisLabel: { color: "#7d8797", formatter: (v: number) => `${v * 100}%` },
        splitLine: { lineStyle: { color: "#edf1f6" } },
      },
      yAxis: {
        type: "category",
        data: rows.map((r) => r.name),
        axisLine: { lineStyle: { color: "#e6ebf2" } },
        axisLabel: { color: "#475467" },
        axisTick: { show: false },
      },
      series: [
        {
          type: "bar",
          barWidth: 16,
          itemStyle: { borderRadius: [0, 8, 8, 0] },
          label: {
            show: true,
            position: "right",
            color: "#475467",
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

  return <EChart option={option} height={Math.max(220, metrics.length * 44)} />;
}
