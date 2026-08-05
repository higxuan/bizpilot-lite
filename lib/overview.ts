// 首页经营概览的演示数据（脱敏，不来自任何真实企业）。
// 说明：这是「表现层」数据，直接决定首页 KPI 卡 / 趋势图 / 环形图 / 预警 / 摘要如何渲染。
// 生产环境中，这些值应由「统一经营模型」(lib/metrics.ts) 聚合而来，
// 并按所选周期（本周/本月/本季）动态计算同比、环比与目标完成率。

import type { IconName } from "@/components/Icon";

export type PeriodKey = "week" | "month" | "quarter";

export const PERIODS: { key: PeriodKey; label: string }[] = [
  { key: "week", label: "本周" },
  { key: "month", label: "本月" },
  { key: "quarter", label: "本季" },
];

// KPI 状态（绿=健康/达标，橙=关注，红=预警，灰=中性）
export type Tone = "positive" | "warning" | "negative" | "neutral";

export type OverviewKpi = {
  icon: IconName;
  label: string;
  value: string;
  badge: string;
  change: string; // 环比文字，如 "+12.0%"
  dir: "up" | "down"; // 数值变化方向（用于箭头；颜色由 tone 决定，因为有些指标升是坏事）
  tone: Tone;
  sub: string; // 副文本：目标 / 上周期
  spark: number[]; // 迷你趋势线（近 8 个点）
};

export const OVERVIEW_KPIS: Record<PeriodKey, OverviewKpi[]> = {
  week: [
    { icon: "revenue", label: "本周收入", value: "¥29.6万", badge: "增长", change: "+4.2%", dir: "up", tone: "positive", sub: "目标 ¥35万", spark: [22, 24, 23, 26, 25, 27, 28, 29.6] },
    { icon: "profit", label: "经营利润", value: "¥4.8万", badge: "关注", change: "-3.1%", dir: "down", tone: "negative", sub: "利润率 16.2%", spark: [5.4, 5.2, 5.3, 5.0, 5.1, 4.9, 4.9, 4.8] },
    { icon: "cash", label: "经营现金流", value: "¥2.1万", badge: "回落", change: "-8.4%", dir: "down", tone: "negative", sub: "回款率 78%", spark: [2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.2, 2.1] },
    { icon: "target", label: "目标完成率", value: "84.6%", badge: "进行中", change: "+1.2pct", dir: "up", tone: "warning", sub: "周目标 ¥35万", spark: [78, 79, 80, 81, 82, 82.5, 83.5, 84.6] },
    { icon: "users", label: "新增客户", value: "9", badge: "转化", change: "+12.5%", dir: "up", tone: "positive", sub: "成交成本 ¥3.2万", spark: [5, 6, 6, 7, 7, 8, 8, 9] },
  ],
  month: [
    { icon: "revenue", label: "本月收入", value: "¥128万", badge: "增长", change: "+12.0%", dir: "up", tone: "positive", sub: "目标 ¥150万", spark: [98, 104, 110, 108, 115, 118, 122, 128] },
    { icon: "profit", label: "经营利润", value: "¥21万", badge: "关注", change: "-6.0%", dir: "down", tone: "negative", sub: "利润率 16.4%", spark: [26, 25, 24, 24, 23, 22, 22, 21] },
    { icon: "cash", label: "经营现金流", value: "¥9.5万", badge: "预警", change: "-10.0%", dir: "down", tone: "negative", sub: "回款率 74%", spark: [13, 12.5, 12, 11.5, 11, 10.5, 10, 9.5] },
    { icon: "target", label: "目标完成率", value: "85.3%", badge: "进行中", change: "-1.0pct", dir: "down", tone: "warning", sub: "月目标 ¥150万", spark: [80, 82, 84, 86, 87, 86, 86, 85.3] },
    { icon: "users", label: "新增客户", value: "42", badge: "转化", change: "+8.0%", dir: "up", tone: "positive", sub: "成交成本 ¥3.0万", spark: [30, 32, 34, 33, 36, 38, 40, 42] },
  ],
  quarter: [
    { icon: "revenue", label: "季度收入", value: "¥356万", badge: "增长", change: "+15.4%", dir: "up", tone: "positive", sub: "目标 ¥450万", spark: [280, 295, 300, 312, 320, 330, 342, 356] },
    { icon: "profit", label: "经营利润", value: "¥58万", badge: "关注", change: "-4.2%", dir: "down", tone: "negative", sub: "利润率 16.3%", spark: [66, 64, 63, 62, 61, 60, 59, 58] },
    { icon: "cash", label: "经营现金流", value: "¥31万", badge: "回落", change: "-6.8%", dir: "down", tone: "negative", sub: "回款率 76%", spark: [40, 38, 37, 36, 35, 34, 32, 31] },
    { icon: "target", label: "目标完成率", value: "79.0%", badge: "进行中", change: "-3.0pct", dir: "down", tone: "warning", sub: "季目标 ¥450万", spark: [70, 73, 75, 77, 78, 79, 80, 79] },
    { icon: "users", label: "新增客户", value: "118", badge: "转化", change: "+10.3%", dir: "up", tone: "positive", sub: "成交成本 ¥3.1万", spark: [88, 92, 96, 100, 104, 108, 112, 118] },
  ],
};

// 收入 / 成本 / 利润趋势（单位：万元）——墨绿主色系
export type TrendSeries = { name: string; color: string; data: number[] };

export const TREND_COLORS = { revenue: "#0e7a5a", cost: "#94a3b8", profit: "#c2410c" };

export const TRENDS: Record<PeriodKey, { labels: string[]; series: TrendSeries[] }> = {
  week: {
    labels: ["08-01", "08-02", "08-03", "08-04", "08-05", "08-06", "08-07"],
    series: [
      { name: "收入", color: TREND_COLORS.revenue, data: [3.8, 4.1, 3.6, 4.4, 4.2, 4.6, 4.9] },
      { name: "成本", color: TREND_COLORS.cost, data: [2.9, 3.1, 2.9, 3.3, 3.2, 3.4, 3.6] },
      { name: "利润", color: TREND_COLORS.profit, data: [0.9, 1.0, 0.7, 1.1, 1.0, 1.2, 1.3] },
    ],
  },
  month: {
    labels: ["第1周", "第2周", "第3周", "第4周"],
    series: [
      { name: "收入", color: TREND_COLORS.revenue, data: [30, 31, 32, 35] },
      { name: "成本", color: TREND_COLORS.cost, data: [25, 26, 27, 29] },
      { name: "利润", color: TREND_COLORS.profit, data: [5, 5, 5, 6] },
    ],
  },
  quarter: {
    labels: ["5月", "6月", "7月"],
    series: [
      { name: "收入", color: TREND_COLORS.revenue, data: [108, 120, 128] },
      { name: "成本", color: TREND_COLORS.cost, data: [90, 98, 110] },
      { name: "利润", color: TREND_COLORS.profit, data: [18, 22, 18] },
    ],
  },
};

// 收入结构（按业务线，单位：万元）——环形占比图
export const REVENUE_STRUCTURE: Record<PeriodKey, { name: string; value: number }[]> = {
  week: [
    { name: "硬件", value: 12.4 },
    { name: "软件订阅", value: 9.8 },
    { name: "服务", value: 4.6 },
    { name: "配件", value: 2.8 },
  ],
  month: [
    { name: "硬件", value: 53.8 },
    { name: "软件订阅", value: 41.0 },
    { name: "服务", value: 20.5 },
    { name: "配件", value: 12.7 },
  ],
  quarter: [
    { name: "硬件", value: 149.5 },
    { name: "软件订阅", value: 114.0 },
    { name: "服务", value: 57.0 },
    { name: "配件", value: 35.5 },
  ],
};

// 环形图配色（墨绿主色 + 大地色系）
export const STRUCTURE_COLORS = ["#0e7a5a", "#3f7d5d", "#7ba05b", "#c2410c", "#8a8f98", "#5b6670"];

// 风险预警（由规则引擎驱动；此处为演示）
export type Alert = {
  level: "high" | "mid" | "low";
  title: string;
  desc: string;
  owner: string;
};

export const ALERTS: Alert[] = [
  { level: "high", title: "经营现金流连续两期下滑", desc: "回款率 74%，低于 80% 安全线，建议跟进大客户回款", owner: "财务负责人" },
  { level: "high", title: "客户集中度超警戒线", desc: "前五大客户收入占比 55%，超过 40% 阈值，存在集中风险", owner: "CEO" },
  { level: "mid", title: "三个项目延期风险上升", desc: "延期风险 30%，环比 +3pct，交付成本同步走高", owner: "项目总监" },
  { level: "mid", title: "复购率未达目标", desc: "当前 38%，目标 45%，需加强老客户经营", owner: "客户成功" },
  { level: "low", title: "费用率略高于预算", desc: "18% vs 预算 15%，主要增量来自销售费用", owner: "财务负责人" },
];

// 经营摘要（AI 生成的一句话结论 + 展开要点；演示文案）
export const EXEC_SUMMARY: Record<PeriodKey, { headline: string; points: string[] }> = {
  week: {
    headline: "本周收入环比增长 4.2%，但现金流仍在回落，需优先保障回款。",
    points: [
      "收入 ¥29.6万，完成周目标 84.6%，软件订阅贡献主要增量",
      "经营利润 ¥4.8万，利润率 16.2%，成本增速连续三期高于收入",
      "现金流 ¥2.1万，回款率 78%，建议本周内跟进两笔大客户尾款",
    ],
  },
  month: {
    headline: "本月收入增长 12%，但利润同比下滑 6%，增收不增利的信号需要重视。",
    points: [
      "收入 ¥128万，完成月目标 85.3%，同比 +12%，软件订阅为主引擎",
      "经营利润 ¥21万，同比 -6%，成本（+18%）增速持续高于收入",
      "现金流 ¥9.5万低于安全线，客户集中度 55% 超阈值，建议核查低毛利项目并分散客户结构",
    ],
  },
  quarter: {
    headline: "本季收入同比增长 15.4%，完成率 79%，增长质量与现金安全是下季重点。",
    points: [
      "收入 ¥356万，同比 +15.4%，规模持续扩张",
      "经营利润 ¥58万，同比 -4.2%，盈利质量有所下滑",
      "现金流 ¥31万、回款率 76%，叠加客户集中度 55%，建议建立现金流与大客户双预警机制",
    ],
  },
};
