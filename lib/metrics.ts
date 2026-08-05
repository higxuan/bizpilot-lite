// 统一经营模型（栈无关）——课程的核心契约
// 驾驶舱只认这种统一结构，不关心数据原来来自什么系统。

export type ModuleKey = "business" | "customer" | "project" | "org";

export type Metric = {
  metric_code: string;
  metric_name: string;
  module: ModuleKey;
  period: string;
  actual_value: number;
  target_value: number;
  yoy: number; // 同比
  mom: number; // 环比
  unit: "CNY" | "count" | "pct";
  source: string;
  owner: string;
  updated_at: string;
  trend?: number[]; // 近 N 期数值，仅用于首页趋势图（单位见 unit）
};

export const MODULES: { key: ModuleKey; name: string; desc: string }[] = [
  { key: "business", name: "经营结果", desc: "收入、成本、毛利、利润、现金流、目标完成率" },
  { key: "customer", name: "客户增长", desc: "新增/活跃/流失客户、客单价、复购率、客户集中度" },
  { key: "project", name: "项目与交付", desc: "项目进度、预算偏差、延期风险、交付质量" },
  { key: "org", name: "组织效率", desc: "人均产出、费用率、团队负载、关键岗位风险" },
];

// 第一版模拟数据（脱敏，不来自任何真实企业）
export const MOCK_METRICS: Metric[] = [
  // 经营结果
  { metric_code: "monthly_revenue", metric_name: "月度收入", module: "business", period: "2026-07", actual_value: 1280000, target_value: 1500000, yoy: 0.12, mom: -0.03, unit: "CNY", source: "erp_api", owner: "销售负责人", updated_at: "2026-08-01", trend: [110, 118, 121, 125, 128] },
  { metric_code: "gross_profit", metric_name: "毛利", module: "business", period: "2026-07", actual_value: 420000, target_value: 450000, yoy: 0.05, mom: 0.01, unit: "CNY", source: "erp_api", owner: "财务负责人", updated_at: "2026-08-01", trend: [38, 40, 41, 41, 42] },
  { metric_code: "net_profit", metric_name: "经营利润", module: "business", period: "2026-07", actual_value: 210000, target_value: 300000, yoy: -0.06, mom: -0.02, unit: "CNY", source: "erp_api", owner: "财务负责人", updated_at: "2026-08-01", trend: [24, 23, 22, 21, 21] },
  { metric_code: "cash_flow", metric_name: "现金流", module: "business", period: "2026-07", actual_value: 95000, target_value: 120000, yoy: -0.1, mom: -0.05, unit: "CNY", source: "erp_api", owner: "财务负责人", updated_at: "2026-08-01", trend: [10, 11, 9, 10, 9.5] },
  { metric_code: "total_cost", metric_name: "总成本", module: "business", period: "2026-07", actual_value: 860000, target_value: 800000, yoy: 0.18, mom: 0.04, unit: "CNY", source: "erp_api", owner: "财务负责人", updated_at: "2026-08-01" },
  { metric_code: "target_rate", metric_name: "目标完成率", module: "business", period: "2026-07", actual_value: 0.85, target_value: 1.0, yoy: -0.04, mom: -0.01, unit: "pct", source: "manual", owner: "CEO", updated_at: "2026-08-01" },

  // 客户增长
  { metric_code: "new_customers", metric_name: "新增客户", module: "customer", period: "2026-07", actual_value: 42, target_value: 50, yoy: 0.08, mom: 0.02, unit: "count", source: "crm_api", owner: "销售负责人", updated_at: "2026-08-01" },
  { metric_code: "active_customers", metric_name: "活跃客户", module: "customer", period: "2026-07", actual_value: 320, target_value: 350, yoy: 0.06, mom: 0.01, unit: "count", source: "crm_api", owner: "销售负责人", updated_at: "2026-08-01" },
  { metric_code: "churn_rate", metric_name: "客户流失率", module: "customer", period: "2026-07", actual_value: 0.06, target_value: 0.05, yoy: 0.01, mom: 0.005, unit: "pct", source: "crm_api", owner: "客户成功", updated_at: "2026-08-01" },
  { metric_code: "arpu", metric_name: "客单价", module: "customer", period: "2026-07", actual_value: 3200, target_value: 3500, yoy: 0.03, mom: -0.01, unit: "CNY", source: "crm_api", owner: "销售负责人", updated_at: "2026-08-01" },
  { metric_code: "repurchase", metric_name: "复购率", module: "customer", period: "2026-07", actual_value: 0.38, target_value: 0.45, yoy: -0.02, mom: 0, unit: "pct", source: "crm_api", owner: "客户成功", updated_at: "2026-08-01" },
  { metric_code: "concentration", metric_name: "客户集中度", module: "customer", period: "2026-07", actual_value: 0.55, target_value: 0.4, yoy: 0.07, mom: 0.02, unit: "pct", source: "manual", owner: "CEO", updated_at: "2026-08-01" },

  // 项目与交付
  { metric_code: "project_progress", metric_name: "项目进度", module: "project", period: "2026-07", actual_value: 0.72, target_value: 0.8, yoy: 0.03, mom: 0.01, unit: "pct", source: "project_api", owner: "项目总监", updated_at: "2026-08-01" },
  { metric_code: "budget_deviation", metric_name: "预算偏差", module: "project", period: "2026-07", actual_value: 0.08, target_value: 0.05, yoy: 0.02, mom: 0.01, unit: "pct", source: "project_api", owner: "项目总监", updated_at: "2026-08-01" },
  { metric_code: "delay_risk", metric_name: "延期风险", module: "project", period: "2026-07", actual_value: 0.3, target_value: 0.2, yoy: 0.05, mom: 0.03, unit: "pct", source: "project_api", owner: "项目总监", updated_at: "2026-08-01" },
  { metric_code: "delivery_quality", metric_name: "交付质量", module: "project", period: "2026-07", actual_value: 0.9, target_value: 0.95, yoy: 0, mom: -0.01, unit: "pct", source: "project_api", owner: "项目总监", updated_at: "2026-08-01" },

  // 组织效率
  { metric_code: "per_capita_output", metric_name: "人均产出", module: "org", period: "2026-07", actual_value: 85000, target_value: 90000, yoy: 0.04, mom: 0, unit: "CNY", source: "hr_api", owner: "HR 负责人", updated_at: "2026-08-01" },
  { metric_code: "expense_rate", metric_name: "费用率", module: "org", period: "2026-07", actual_value: 0.18, target_value: 0.15, yoy: 0.02, mom: 0.01, unit: "pct", source: "erp_api", owner: "财务负责人", updated_at: "2026-08-01" },
  { metric_code: "team_load", metric_name: "团队负载", module: "org", period: "2026-07", actual_value: 0.88, target_value: 0.8, yoy: 0.03, mom: 0.02, unit: "pct", source: "hr_api", owner: "HR 负责人", updated_at: "2026-08-01" },
  { metric_code: "key_role_risk", metric_name: "关键岗位风险", module: "org", period: "2026-07", actual_value: 0.2, target_value: 0.1, yoy: 0.04, mom: 0.01, unit: "pct", source: "manual", owner: "CEO", updated_at: "2026-08-01" },
];

export function metricsByModule(key: ModuleKey): Metric[] {
  return MOCK_METRICS.filter((m) => m.module === key);
}
