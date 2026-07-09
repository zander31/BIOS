import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaSparkline } from "@/components/charts/AreaSparkline";

interface KpiCardProps {
  label: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  sparkData?: { value: number }[];
  icon?: ReactNode;
  positive?: boolean;
  accentColor?: string;
}

export function KpiCard({
  label,
  value,
  delta,
  deltaLabel,
  sparkData,
  icon,
  positive = true,
  accentColor,
}: KpiCardProps) {
  const deltaDir = delta === undefined ? "neutral" : delta > 0 ? "up" : delta < 0 ? "down" : "neutral";
  const deltaPositive = positive ? deltaDir === "up" : deltaDir === "down";
  const deltaNegative = positive ? deltaDir === "down" : deltaDir === "up";

  return (
    <div className="bg-surface-0 rounded-xl shadow-card p-5 flex flex-col gap-3 hover:shadow-card-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-ink-500 uppercase tracking-wider">{label}</span>
        {icon && (
          <div className="w-7 h-7 rounded-lg bg-surface-50 flex items-center justify-center text-ink-300">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-2xl font-semibold text-ink-900 leading-none">{value}</div>
          {delta !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 mt-1.5 text-xs font-medium",
                deltaPositive && "text-status-green",
                deltaNegative && "text-status-red",
                !deltaPositive && !deltaNegative && "text-ink-400"
              )}
            >
              {deltaDir === "up" && <TrendingUp size={11} />}
              {deltaDir === "down" && <TrendingDown size={11} />}
              {deltaDir === "neutral" && <Minus size={11} />}
              <span>
                {delta > 0 ? "+" : ""}{delta}
                {deltaLabel ? ` ${deltaLabel}` : ""}
              </span>
            </div>
          )}
        </div>
        {sparkData && sparkData.length > 0 && (
          <div className="flex-shrink-0">
            <AreaSparkline
              data={sparkData}
              color={accentColor}
              positive={positive}
            />
          </div>
        )}
      </div>
    </div>
  );
}
