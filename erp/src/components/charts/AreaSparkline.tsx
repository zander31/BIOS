"use client";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface AreaSparklineProps {
  data: { value: number }[];
  color?: string;
  positive?: boolean;
}

export function AreaSparkline({ data, color, positive = true }: AreaSparklineProps) {
  const strokeColor = color || (positive ? "#10B981" : "#EF4444");
  const fillColor = color || (positive ? "#10B981" : "#EF4444");

  return (
    <ResponsiveContainer width={80} height={32}>
      <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
        <defs>
          <linearGradient id={`sparkGrad-${strokeColor.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={fillColor} stopOpacity={0.15} />
            <stop offset="95%" stopColor={fillColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={1.5}
          fill={`url(#sparkGrad-${strokeColor.replace("#", "")})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
