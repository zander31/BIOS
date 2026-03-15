"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { KpiCard } from "@/components/shared/KpiCard";
import { BarChart } from "@/components/charts/BarChart";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Download } from "lucide-react";

const reportTypes = ["Production", "Financial", "Quality", "Inventory"];

const productionData = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 51 },
  { label: "Mar", value: 38 },
  { label: "Apr", value: 60 },
  { label: "May", value: 55 },
  { label: "Jun", value: 67 },
  { label: "Jul", value: 72 },
];

const revenueData = [
  { label: "Jan", value: 88000 },
  { label: "Feb", value: 102000 },
  { label: "Mar", value: 94000 },
  { label: "Apr", value: 118000 },
  { label: "May", value: 110000 },
  { label: "Jun", value: 132000 },
  { label: "Jul", value: 121000 },
];

const qualityData = [
  { label: "Jan", value: 96 },
  { label: "Feb", value: 94 },
  { label: "Mar", value: 97 },
  { label: "Apr", value: 98 },
  { label: "May", value: 95 },
  { label: "Jun", value: 99 },
  { label: "Jul", value: 94 },
];

const productionJobsData = [
  { woNumber: "WO-2024-0891", part: "Titanium Hip Implant", customer: "Stryker", days: 14, status: "In Progress" },
  { woNumber: "WO-2024-0892", part: "Surgical Clamp Handle", customer: "Medtronic", days: 18, status: "Overdue" },
  { woNumber: "WO-2024-0894", part: "Knee Brace Bracket", customer: "Zimmer Biomet", days: 19, status: "Complete" },
  { woNumber: "WO-2024-0897", part: "Endoscope Distal Tip", customer: "Karl Storz", days: 13, status: "In Progress" },
  { woNumber: "WO-2024-0895", part: "Neuro Electrode Array", customer: "Boston Scientific", days: 17, status: "In Progress" },
];

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState(0);

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Production, financial, quality, and inventory insights"
        actions={
          <div className="flex items-center gap-2">
            <select className="px-3 py-1.5 text-sm border border-surface-200 rounded-lg text-ink-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20">
              <option>Last 7 months</option>
              <option>Last 30 days</option>
              <option>This quarter</option>
              <option>This year</option>
            </select>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium border border-surface-200 rounded-lg text-ink-700 hover:bg-surface-50 transition-colors">
              <Download size={14} />
              Export
            </button>
          </div>
        }
      />

      {/* Report tabs */}
      <div className="flex border-b border-surface-200 mb-6">
        {reportTypes.map((report, i) => (
          <button
            key={report}
            onClick={() => setActiveReport(i)}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeReport === i
                ? "border-brand-500 text-brand-500"
                : "border-transparent text-ink-500 hover:text-ink-900"
            }`}
          >
            {report}
          </button>
        ))}
      </div>

      {activeReport === 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <KpiCard label="Jobs Completed" value="385" delta={12} deltaLabel="vs last period" sparkData={productionData.map((d) => ({ value: d.value }))} />
            <KpiCard label="On-Time Delivery" value="94%" delta={2.1} sparkData={qualityData.map((d) => ({ value: d.value }))} />
            <KpiCard label="Avg Lead Time" value="14.2 days" delta={-1.8} deltaLabel="days" sparkData={[{value:16},{value:15},{value:15},{value:14},{value:14},{value:15},{value:14}]} />
            <KpiCard label="Utilization" value="87%" delta={3} sparkData={[{value:82},{value:84},{value:85},{value:86},{value:85},{value:88},{value:87}]} />
          </div>
          <SectionCard title="Jobs Completed per Month" subtitle="All work order completions">
            <BarChart data={productionData} color="#0066FF" />
          </SectionCard>
          <SectionCard title="Jobs Summary" noPadding>
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-100">
                  {["WO #", "Part", "Customer", "Lead Time (days)", "Status"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {productionJobsData.map((row) => (
                  <tr key={row.woNumber} className="hover:bg-surface-50 transition-colors">
                    <td className="px-5 py-3 text-sm font-medium text-brand-500">{row.woNumber}</td>
                    <td className="px-5 py-3 text-sm text-ink-900">{row.part}</td>
                    <td className="px-5 py-3 text-sm text-ink-700">{row.customer}</td>
                    <td className="px-5 py-3 text-sm text-ink-700">{row.days}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium ${row.status === "Complete" ? "text-status-green" : row.status === "Overdue" ? "text-status-red" : "text-status-yellow"}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>
        </div>
      )}

      {activeReport === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <KpiCard label="Revenue MTD" value="$121K" delta={18} deltaLabel="% vs LM" sparkData={revenueData.slice(-4).map((d) => ({ value: d.value }))} />
            <KpiCard label="Gross Margin" value="38.4%" delta={2.2} sparkData={[{value:35},{value:36},{value:37},{value:36},{value:38},{value:39},{value:38}]} />
            <KpiCard label="Open Receivables" value="$284K" delta={-5} deltaLabel="% vs LM" positive={false} sparkData={[{value:310},{value:295},{value:305},{value:290},{value:285},{value:292},{value:284}]} />
            <KpiCard label="Avg Job Value" value="$5,280" delta={8} sparkData={[{value:4800},{value:5000},{value:4900},{value:5100},{value:5200},{value:5300},{value:5280}]} />
          </div>
          <SectionCard title="Monthly Revenue" subtitle="Invoiced revenue by month">
            <BarChart data={revenueData} color="#0066FF" formatValue={(v) => `$${(v / 1000).toFixed(0)}K`} />
          </SectionCard>
        </div>
      )}

      {activeReport === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <KpiCard label="Inspection Pass Rate" value="94%" delta={2} sparkData={qualityData.map((d) => ({ value: d.value }))} />
            <KpiCard label="NCRs This Month" value="4" delta={-2} positive={false} sparkData={[{value:8},{value:6},{value:7},{value:5},{value:4},{value:6},{value:4}]} accentColor="#EF4444" />
            <KpiCard label="Scrap Rate" value="1.2%" delta={-0.3} deltaLabel="%" sparkData={[{value:2},{value:1.8},{value:1.5},{value:1.4},{value:1.3},{value:1.5},{value:1.2}]} />
            <KpiCard label="Corrective Actions" value="2" delta={0} sparkData={[{value:3},{value:2},{value:3},{value:2},{value:1},{value:2},{value:2}]} />
          </div>
          <SectionCard title="Monthly Inspection Pass Rate (%)" subtitle="All inspection types combined">
            <BarChart data={qualityData} color="#10B981" formatValue={(v) => `${v}%`} />
          </SectionCard>
        </div>
      )}

      {activeReport === 3 && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <KpiCard label="Inventory Value" value="$142K" delta={5} sparkData={[{value:130},{value:135},{value:138},{value:136},{value:140},{value:143},{value:142}]} />
            <KpiCard label="Low Stock Items" value="5" delta={2} positive={false} sparkData={[{value:3},{value:3},{value:4},{value:3},{value:4},{value:3},{value:5}]} accentColor="#EF4444" />
            <KpiCard label="Turns This Quarter" value="4.2x" delta={0.4} sparkData={[{value:3.5},{value:3.7},{value:3.8},{value:3.9},{value:4},{value:4.1},{value:4.2}]} />
            <KpiCard label="PO Spend MTD" value="$38K" delta={-12} deltaLabel="% vs LM" sparkData={[{value:45},{value:42},{value:40},{value:43},{value:41},{value:40},{value:38}]} />
          </div>
          <div className="bg-surface-0 rounded-xl shadow-card p-8 text-center text-ink-400">
            <p className="text-sm">Inventory trend charts and movement analysis coming soon.</p>
          </div>
        </div>
      )}
    </div>
  );
}
