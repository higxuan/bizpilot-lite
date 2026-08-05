import { ReactNode } from "react";
import Icon, { IconName } from "@/components/Icon";

// 白色面板：标题（可选图标）+ 可选来源标签 + 内容区。
export default function Panel({
  title,
  icon,
  source,
  action,
  children,
  pad = true,
}: {
  title: string;
  icon?: IconName;
  source?: string;
  action?: ReactNode;
  children: ReactNode;
  pad?: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#e8e6e1] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.03)]">
      <div className="flex items-center justify-between border-b border-[#f0efeb] px-5 py-4">
        <div className="flex items-center gap-2">
          {icon ? <Icon name={icon} size={16} className="text-[#0e7a5a]" /> : null}
          <h2 className="m-0 text-[15px] font-semibold text-[#16181d]">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {action}
          {source ? (
            <span className="rounded-full bg-[#f6f6f3] px-2 py-0.5 text-[11px] font-medium text-[#6b7280]">
              {source}
            </span>
          ) : null}
        </div>
      </div>
      <div className={pad ? "p-5" : ""}>{children}</div>
    </article>
  );
}
