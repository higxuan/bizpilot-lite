// 首页经营概览的演示数据（脱敏，不来自任何真实企业）。
// 说明：这是「表现层」数据，直接决定首页 KPI 卡 / 趋势图 / 环形图怎么渲染。
// 生产环境中，这些值应由「统一经营模型」(lib/metrics.ts) 聚合而来，
// 并按所选周期（本周/本月/本季）动态计算同比、环比与目标完成率。

export type PeriodKey = "week" | "month" | "quarter";

export const PERIODS: { key: PeriodKey; label: string }[] = [
  { key: "week", label: "本周" },
  { key: "month", label: "本月" },
  { key: "quarter", label: "本季" },
];

// KPI 状态色（沿用 BizPilot 语义：绿=健康/达标，橙=关注，红=预警，灰=中性）
export type Tone = "positive" | "warning" | "negative" | "neutral";

export type OverviewKpi = {
  icon: string;
  label: string;
  value: string;
  badge: string;
  change: string; // 同比/环比文字，如 "+12.0%"
  tone: Tone;
  sub: string; // 副文本：目标 / 上周期 / 单位说明
};

export const OVERVIEW_KPIS: Record<PeriodKey, OverviewKpi[]> = {
  week: [
    { icon: "💰", label: "本周收入", value: "¥29.6万", badge: "增长", change: "+4.2%", tone: "positive", sub: "目标 ¥35万" },
    { icon: "📈", label: "经营利润", value: "¥4.8万", badge: "关注", change: "-3.1%", tone: "negative", sub: "利润率 16.2%" },
    { icon: "💧", label: "经营现金流", value: "¥2.1万", badge: "回落", change: "-8.4%", tone: "negative", sub: "回款率 78%" },
    { icon: "🎯", label: "目标完成率", value: "84.6%", badge: "进行中", change: "+1.2pct", tone: "warning", sub: "周目标 ¥35万" },
    { icon: "👥", label: "新增客户", value: "9", badge: "转化", change: "+12.5%", tone: "positive", sub: "成交成本 ¥3.2万" },
  ],
  month: [
    { icon: "💰", label: "本月收入", value: "¥128万", badge: "增长", change: "+12.0%", tone: "positive", sub: "目标 ¥150万" },
    { icon: "📈", label: "经营利润", value: "¥21万", badge: "关注", change: "-6.0%", tone: "negative", sub: "利润率 16.4%" },
    { icon: "💧", label: "经营现金流", value: "¥9.5万", badge: "预警", change: "-10.0%", tone: "negative", sub: "回款率 74%" },
    { icon: "🎯", label: "目标完成率", value: "85.3%", badge: "进行中", change: "-1.0pct", tone: "warning", sub: "月目标 ¥150万" },
    { icon: "👥", label: "新增客户", value: "42", badge: "转化", change: "+8.0%", tone: "positive", sub: "成交成本 ¥3.0万" },
  ],
  quarter: [
    { icon: "💰", label: "季度收入", value: "¥356万", badge: "增长", change: "+15.4%", tone: "positive", sub: "目标 ¥450万" },
    { icon: "📈", label: "经营利润", value: "¥58万", badge: "关注", change: "-4.2%", tone: "negative", sub: "利润率 16.3%" },
    { icon: "💧", label: "经营现金流", value: "¥31万", badge: "回落", change: "-6.8%", tone: "negative", sub: "回款率 76%" },
    { icon: "🎯", label: "目标完成率", value: "79.0%", badge: "进行中", change: "-3.0pct", tone: "warning", sub: "季目标 ¥450万" },
    { icon: "👥", label: "新增客户", value: "118", badge: "转化", change: "+10.3%", tone: "positive", sub: "成交成本 ¥3.1万" },
  ],
};

// 收入 / 成本 / 利润趋势（单位：万元）
export type TrendSeries = { name: string; color: string; data: number[] };

export const TRENDS: Record<PeriodKey, { labels: string[]; series: TrendSeries[] }> = {
  week: {
    labels: ["08-01", "08-02", "08-03", "08-04", "08-05", "08-06", "08-07"],
    series: [
      { name: "收入", color: "#ff5a3d", data: [3.8, 4.1, 3.6, 4.4, 4.2, 4.6, 4.9] },
      { name: "成本", color: "#1d7dfa", data: [2.9, 3.1, 2.9, 3.3, 3.2, 3.4, 3.6] },
      { name: "利润", color: "#13b981", data: [0.9, 1.0, 0.7, 1.1, 1.0, 1.2, 1.3] },
    ],
  },
  month: {
    labels: ["第1周", "第2周", "第3周", "第4周"],
    series: [
      { name: "收入", color: "#ff5a3d", data: [30, 31, 32, 35] },
      { name: "成本", color: "#1d7dfa", data: [25, 26, 27, 29] },
      { name: "利润", color: "#13b981", data: [5, 5, 5, 6] },
    ],
  },
  quarter: {
    labels: ["5月", "6月", "7月"],
    series: [
      { name: "收入", color: "#ff5a3d", data: [108, 120, 128] },
      { name: "成本", color: "#1d7dfa", data: [90, 98, 110] },
      { name: "利润", color: "#13b981", data: [18, 22, 18] },
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

// 环形图配色（沿用 BizPilot 渠道色板）
export const STRUCTURE_COLORS = ["#ff5a3d", "#1d7dfa", "#12a987", "#9a6bff", "#f0b429", "#52627a"];
