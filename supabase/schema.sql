-- BizPilot Lite · 统一经营模型（课程第 4 篇落地）
-- 在 Supabase SQL Editor 中执行；所有表均为脱敏的通用结构，不含任何真实业务数据。

-- 企业
create table if not exists enterprises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

-- 时间周期（如 2026-07）
create table if not exists periods (
  id uuid primary key default gen_random_uuid(),
  enterprise_id uuid references enterprises(id),
  code text not null,
  label text
);

-- 指标字典（统一经营模型的「定义层」）
create table if not exists metrics (
  code text primary key,                 -- metric_code
  name text not null,                    -- 指标名称
  caliber text,                         -- 统计口径
  unit text,                            -- CNY / count / pct
  module text,                          -- business / customer / project / org
  owner text,                           -- 负责人
  created_at timestamptz default now()
);

-- 指标取值（统一经营模型的「数据层」）
create table if not exists metric_values (
  id uuid primary key default gen_random_uuid(),
  metric_code text references metrics(code),
  period text not null,                 -- 2026-07
  actual_value numeric,
  target_value numeric,
  yoy numeric,                          -- 同比
  mom numeric,                          -- 环比
  source text,                          -- 数据来源
  updated_at timestamptz default now()
);

-- 客户（课程后续扩展）
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  enterprise_id uuid references enterprises(id),
  name text,
  segment text,
  owner text
);

-- 项目（课程后续扩展）
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  enterprise_id uuid references enterprises(id),
  name text,
  progress numeric,
  budget_deviation numeric,
  delay_risk numeric,
  owner text
);

-- 组织（课程后续扩展）
create table if not exists orgs (
  id uuid primary key default gen_random_uuid(),
  enterprise_id uuid references enterprises(id),
  name text,
  load numeric,
  key_role_risk numeric
);

-- 风险事件（第 6 篇规则引擎产出）
create table if not exists risk_events (
  id uuid primary key default gen_random_uuid(),
  metric_code text,
  period text,
  level text,                           -- red / yellow / green
  description text,
  owner text,
  suggestion text,
  created_at timestamptz default now()
);

-- 行级权限（第 8 篇）：仅登录用户可访问本企业数据（示例，需配合 auth.uid()）
-- alter table metric_values enable row level security;
-- create policy "own enterprise" on metric_values for select using (...);
