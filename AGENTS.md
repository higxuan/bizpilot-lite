# BizPilot Lite · AI 协作规则（课程第 1 篇产出）

本文件定义与 AI Coding 工具（Cursor / Codex / Claude Code）协作本项目的规则，确保每篇课程的改动都可被读者复现。

## 技术栈
- 前端：Next.js 14（App Router）+ TypeScript + Tailwind CSS
- 后端/数据库：Supabase（Postgres + Auth + RLS）
- 图表：自研轻量 SVG 组件（components/TrendChart.tsx），不引入重型图表库
- 部署：Vercel

## 协作约定
1. **先模型，后页面**：任何新指标必须先进入 `lib/metrics.ts` 的统一结构，再渲染到页面。
2. **模拟数据先行**：未配置 Supabase 时，页面必须能仅凭 `MOCK_METRICS` 跑通（见 lib/supabase.ts 的 null 回退）。
3. **统一指标契约**：指标字段严格遵循 lib/metrics.ts 的 `Metric` 类型（编码/名称/口径/当前值/目标值/同比/环比/来源/负责人）。
4. **每篇对应一个分支**：`lite/01-intro` … `lite/08-deploy`，便于读者对照。
5. **不暴露内部信息**：本仓库是脱敏的教学版，不得引入真实 OAuth、真实渠道账号或真实业务数据。
6. **改动可运行**：每次让 AI 改动后，必须确认 `npm run dev` 能启动、首页能渲染。
7. **中文界面**：所有用户可见文案使用简体中文。
