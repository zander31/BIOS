"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  data: { label: string; value: number; [key: string]: string | number }[];
  dataKey?: string;
  color?: string;
  formatValue?: (value: number) => string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  formatValue,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  formatValue?: (v: number) => string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-0 border border-surface-200 rounded-lg shadow-card-md px-3 py-2">
        <p className="text-xs text-ink-500 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-ink-900">
          {formatValue ? formatValue(payload[0].value) : payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export function BarChart({ data, dataKey = "value", color = "#0066FF", formatValue }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <RechartsBarChart data={data} margin={{ top: 4, right: 0, left: -20, bottom: 0 }} barSize={24}>
        <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="0" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "#9CA3AF" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#9CA3AF" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={formatValue}
        />
        <Tooltip content={<CustomTooltip formatValue={formatValue} />} cursor={{ fill: "#F3F4F6" }} />
        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
