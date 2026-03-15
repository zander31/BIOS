import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function SectionCard({
  title,
  subtitle,
  actions,
  children,
  className,
  noPadding,
}: SectionCardProps) {
  return (
    <div className={cn("bg-surface-0 rounded-xl shadow-card", className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-200">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-ink-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={noPadding ? "" : "p-5"}>{children}</div>
    </div>
  );
}
