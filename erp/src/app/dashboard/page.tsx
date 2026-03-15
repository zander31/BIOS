import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { BarChart } from "@/components/charts/BarChart";
import { workOrders } from "@/lib/mock-data/work-orders";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  ClipboardList,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  ArrowRight,
  Clock,
  AlertCircle,
  Gauge,
  FileText,
  Package,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

const weeklyCompletions = [
  { label: "Mon", value: 3 },
  { label: "Tue", value: 5 },
  { label: "Wed", value: 2 },
  { label: "Thu", value: 7 },
  { label: "Fri", value: 4 },
  { label: "Sat", value: 1 },
  { label: "Sun", value: 0 },
];

const otdData = [
  { label: "W1", value: 88 },
  { label: "W2", value: 91 },
  { label: "W3", value: 85 },
  { label: "W4", value: 93 },
  { label: "W5", value: 90 },
  { label: "W6", value: 87 },
  { label: "W7", value: 94 },
  { label: "W8", value: 92 },
  { label: "W9", value: 96 },
  { label: "W10", value: 91 },
  { label: "W11", value: 93 },
  { label: "W12", value: 94 },
];

const activeJobsSparkData = [
  { value: 18 }, { value: 20 }, { value: 17 }, { value: 22 }, { value: 19 }, { value: 21 }, { value: 24 },
];
const onTimeSparkData = [
  { value: 88 }, { value: 91 }, { value: 89 }, { value: 93 }, { value: 90 }, { value: 92 }, { value: 94 },
];
const ncrSparkData = [
  { value: 8 }, { value: 6 }, { value: 7 }, { value: 5 }, { value: 4 }, { value: 6 }, { value: 4 },
];
const revenueSparkData = [
  { value: 82000 }, { value: 95000 }, { value: 88000 }, { value: 102000 }, { value: 97000 }, { value: 114000 }, { value: 121000 },
];
const utilizationSparkData = [
  { value: 72 }, { value: 75 }, { value: 71 }, { value: 78 }, { value: 82 }, { value: 79 }, { value: 77 },
];
const quotesSparkData = [
  { value: 4 }, { value: 6 }, { value: 5 }, { value: 8 }, { value: 7 }, { value: 9 }, { value: 7 },
];

const recentActivity = [
  { id: 1, type: "ncr", message: "NCR-2024-0044 opened for WO-2024-0897", time: "12 min ago", color: "text-status-red", Icon: AlertCircle },
  { id: 2, type: "complete", message: "WO-2024-0894 marked Complete — shipped to Zimmer Biomet", time: "1 hr ago", color: "text-status-green", Icon: CheckCircle },
  { id: 3, type: "po", message: "PO-2024-0315 sent to Ensinger Plastics ($8,500)", time: "2 hr ago", color: "text-brand-500", Icon: ClipboardList },
  { id: 4, type: "overdue", message: "WO-2024-0892 is now 2 days overdue — attention required", time: "3 hr ago", color: "text-status-red", Icon: AlertTriangle },
  { id: 5, type: "schedule", message: "Scheduling updated for Haas UMC-500 — 3 jobs reshuffled", time: "Yesterday", color: "text-ink-400", Icon: Clock },
];

const alerts = [
  { id: 1, type: "overdue-wo", message: "WO-2024-0892 — 2 days overdue", sub: "Surgical Clamp Handle · Haas ST-30", color: "border-l-status-red bg-red-50/40", dotColor: "bg-status-red", href: "/work-orders" },
  { id: 2, type: "overdue-wo", message: "WO-2024-0889 — 5 days overdue", sub: "Spinal Cage Set × 12", color: "border-l-status-red bg-red-50/40", dotColor: "bg-status-red", href: "/work-orders" },
  { id: 3, type: "late-po", message: "PO-2024-0311 — expected Mar 15, not received", sub: "Titanium Industries · Ti-6Al-4V Bar", color: "border-l-orange-400 bg-orange-50/40", dotColor: "bg-orange-400", href: "/purchasing" },
  { id: 4, type: "ncr-aging", message: "NCR-2024-0040 open 18 days — no disposition", sub: "Assigned: J. Williams", color: "border-l-status-yellow bg-yellow-50/40", dotColor: "bg-status-yellow", href: "/quality/ncr" },
  { id: 5, type: "low-stock", message: "Ti-6Al-4V Bar 2.5\" — 0 on hand", sub: "Needed by Mar 25 for WO-2024-0891", color: "border-l-brand-500 bg-brand-50/40", dotColor: "bg-brand-500", href: "/inventory" },
  { id: 6, type: "low-stock", message: "TiAlN Endmill 1/2\" — 1 remaining (min: 3)", sub: "Tool crib replenishment required", color: "border-l-brand-500 bg-brand-50/40", dotColor: "bg-brand-500", href: "/inventory" },
];

const activeOrders = workOrders.filter(
  (wo) => wo.status === "In Progress" || wo.status === "Overdue"
);

const upcomingDue = workOrders
  .filter((wo) => wo.status !== "Complete")
  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  .slice(0, 5);

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Good morning — here's your production overview for today."
      />

      {/* KPI Row — 6 cards in 2 rows of 3 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <KpiCard
          label="Active Jobs"
          value="24"
          delta={3}
          deltaLabel="this week"
          sparkData={activeJobsSparkData}
          icon={<ClipboardList size={15} />}
        />
        <KpiCard
          label="On-Time Rate"
          value="94%"
          delta={2.1}
          deltaLabel="vs last week"
          sparkData={onTimeSparkData}
          icon={<CheckCircle size={15} />}
        />
        <KpiCard
          label="Open NCRs"
          value="4"
          delta={-2}
          deltaLabel="vs last week"
          sparkData={ncrSparkData}
          positive={false}
          icon={<AlertTriangle size={15} />}
          accentColor="#EF4444"
        />
        <KpiCard
          label="Revenue MTD"
          value="$121K"
          delta={18}
          deltaLabel="% vs last month"
          sparkData={revenueSparkData}
          icon={<DollarSign size={15} />}
        />
        <KpiCard
          label="Machine Utilization"
          value="77%"
          delta={-1.4}
          deltaLabel="vs last week"
          sparkData={utilizationSparkData}
          icon={<Gauge size={15} />}
        />
        <KpiCard
          label="Open Quotes"
          value="7"
          delta={2}
          deltaLabel="this week"
          sparkData={quotesSparkData}
          icon={<FileText size={15} />}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Weekly Completions Chart */}
        <SectionCard
          title="Jobs Completed This Week"
          subtitle="By day — current week"
          actions={
            <span className="text-xs text-ink-400">Mar 18–24, 2024</span>
          }
        >
          <BarChart data={weeklyCompletions} color="#0066FF" />
        </SectionCard>

        {/* On-Time Delivery Trend */}
        <SectionCard
          title="On-Time Delivery"
          subtitle="12-week rolling trend"
          actions={
            <span className="text-xs text-ink-400">Jan – Mar 2024</span>
          }
        >
          <BarChart data={otdData} color="#10B981" />
        </SectionCard>
      </div>

      {/* Bottom grid: active jobs + due dates + alerts */}
      <div className="grid grid-cols-3 gap-4">
        {/* Active Jobs */}
        <SectionCard
          title="Active Jobs"
          actions={
            <Link href="/work-orders" className="text-xs text-brand-500 font-medium flex items-center gap-1 hover:gap-1.5 transition-all">
              View all <ArrowRight size={11} />
            </Link>
          }
        >
          <div className="space-y-3">
            {activeOrders.slice(0, 5).map((wo) => (
              <Link
                key={wo.id}
                href={`/work-orders/${wo.id}`}
                className="flex items-center gap-3 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-ink-900 truncate group-hover:text-brand-500 transition-colors">
                      {wo.woNumber}
                    </span>
                    <StatusBadge status={wo.status} size="sm" />
                  </div>
                  <p className="text-xs text-ink-500 truncate">{wo.partName}</p>
                  {/* Progress bar */}
                  <div className="mt-1.5 w-full h-1 bg-surface-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-all"
                      style={{ width: `${wo.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-xs font-medium text-ink-900">{wo.progress}%</p>
                  <p className="text-[10px] text-ink-400">{formatDate(wo.dueDate)}</p>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>

        {/* Upcoming Due Dates */}
        <SectionCard
          title="Upcoming Due Dates"
          actions={
            <Link href="/scheduling" className="text-xs text-brand-500 font-medium flex items-center gap-1 hover:gap-1.5 transition-all">
              Schedule <ArrowRight size={11} />
            </Link>
          }
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100">
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 pb-2">Job</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 pb-2">Customer</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 pb-2">Due</th>
                <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-ink-300 pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {upcomingDue.map((wo) => (
                <tr key={wo.id} className="hover:bg-surface-50 transition-colors">
                  <td className="py-2.5 pr-2">
                    <Link href={`/work-orders/${wo.id}`} className="text-xs font-medium text-ink-900 hover:text-brand-500 transition-colors">
                      {wo.woNumber}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-2">
                    <span className="text-xs text-ink-500 truncate">{wo.customer.split(" ")[0]}</span>
                  </td>
                  <td className="py-2.5 pr-2">
                    <span className="text-xs text-ink-700">{formatDate(wo.dueDate)}</span>
                  </td>
                  <td className="py-2.5 text-right">
                    <StatusBadge status={wo.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>

        {/* Alerts Panel */}
        <SectionCard
          title="Alerts"
          subtitle="Items requiring attention"
          actions={
            <span className="text-xs font-semibold text-status-red">{alerts.length} active</span>
          }
        >
          <div className="space-y-2">
            {alerts.map((alert) => (
              <Link
                key={alert.id}
                href={alert.href}
                className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg border-l-2 transition-colors hover:brightness-95 ${alert.color}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 ${alert.dotColor}`} />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-ink-800 leading-snug">{alert.message}</p>
                  <p className="text-[10px] text-ink-400 mt-0.5">{alert.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
