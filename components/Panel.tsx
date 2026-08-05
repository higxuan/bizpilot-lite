import { ReactNode } from "react";

// 白色面板：标题 + 可选 source-pill + 内容区（对齐 BizPilot 的 panel 样式）。
export default function Panel({
  title,
  source,
  children,
}: {
  title: string;
  source?: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-lg border border-[#e8edf3] bg-white p-[18px] shadow-[0_8px_24px_rgba(23,32,51,0.04)]">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-base font-semibold text-[#101828]">{title}</h2>
        {source ? (
          <span className="rounded-full bg-[rgba(18,169,135,0.1)] px-2 py-[3px] text-xs font-bold text-[#0f936f]">
            {source}
          </span>
        ) : null}
      </div>
      {children}
    </article>
  );
}
