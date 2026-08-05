import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 未配置环境变量时返回 null，应用自动回退到本地模拟数据（见 lib/metrics.ts）。
export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;
