import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { equipment, calibrationRecords, maintenanceWOs } from "@/lib/mock-data/maintenance";
import { formatDate } from "@/lib/utils";
import { AlertTriangle, CalendarClock, CheckCircle2, Wrench } from "lucide-react";

const pmDueThisMonth = equipment.filter((e) => {
  const next = new Date(e.nextPM);
  return next <= new Date("2024-04-30") && e.status !== "Decommissioned";
}).length;
const calDue = calibrationRecords.filter((c) => c.calStatus === "Due Soon").length;
const overdue = equipment.filter((e) => new Date(e.nextPM) < new Date("2024-03-20") && e.status === "Online").length
  + calibrationRecords.filter((c) => c.calStatus === "Overdue").length;
const completedYTD = maintenanceWOs.filter((w) => w.status === "Complete").length;

const eqStatusColor: Record<string, string> = {
  Online: "bg-green-50 text-green-700 border-green-200",
  Offline: "bg-red-50 text-red-700 border-red-200",
  Maintenance: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Decommissioned: "bg-gray-100 text-gray-600 border-gray-200",
};

const priorityColor: Record<string, string> = {
  Critical: "bg-red-50 text-red-700 border-red-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  Medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Low: "bg-gray-50 text-gray-600 border-gray-200",
};

const calStatusColor: Record<string, string> = {
  OK: "bg-green-50 text-green-700 border-green-200",
  "Due Soon": "bg-yellow-50 text-yellow-700 border-yellow-200",
  Overdue: "bg-red-50 text-red-700 border-red-200",
  "In Lab": "bg-blue-50 text-blue-700 border-blue-200",
};

function Pill({ label, className }: { label: string; className: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      {label}
    </span>
  );
}

export default function MaintenancePage() {
  const upcoming = maintenanceWOs
    .filter((w) => w.status !== "Complete" && w.status !== "Cancelled")
    .sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));

  return (
    <div>
      <PageHeader
        title="Maintenance"
        subtitle="Preventive maintenance, calibration & CMMS"
        actions={
          <div className="flex gap-2">
            <button className="px-3.5 py-2 text-sm font-medium border border-surface-200 rounded-lg text-ink-700 hover:bg-surface-50 transition-colors">
              Export Schedule
            </button>
            <button className="px-3.5 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
              + New Work Order
            </button>
          </div>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "PM Due This Month", value: pmDueThisMonth, icon: CalendarClock, color: "text-brand-500" },
          { label: "Calibrations Due", value: calDue, icon: AlertTriangle, color: "text-status-yellow" },
          { label: "Overdue Items", value: overdue, icon: AlertTriangle, color: "text-status-red" },
          { label: "Completed YTD", value: completedYTD, icon: CheckCircle2, color: "text-status-green" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-surface-0 rounded-xl shadow-card p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-ink-500 uppercase tracking-wider mb-1">{label}</p>
              <p className={`text-2xl font-semibold ${color}`}>{value}</p>
            </div>
            <div className="w-10 h-10 bg-surface-50 rounded-xl flex items-center justify-center">
              <Icon size={18} className={color} />
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Work Orders */}
      <SectionCard title="Upcoming Maintenance" subtitle="Open and scheduled work orders" className="mb-4" noPadding>
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              {["WO #", "Equipment", "Task", "Type", "Priority", "Assigned To", "Scheduled", "Est. Hours", "Status"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {upcoming.map((wo) => {
              const isCritical = wo.priority === "Critical";
              return (
                <tr key={wo.id} className={`hover:bg-surface-50 transition-colors ${isCritical ? "bg-red-50/20" : ""}`}>
                  <td className="px-5 py-3.5 text-sm font-medium text-brand-500 whitespace-nowrap">{wo.woNumber}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-900">{wo.equipmentName}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-700 max-w-[200px]">
                    <p className="truncate">{wo.task}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs bg-surface-100 text-ink-600 px-2 py-0.5 rounded-full font-medium">{wo.type}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Pill label={wo.priority} className={priorityColor[wo.priority] ?? "bg-gray-100 text-gray-600 border-gray-200"} />
                  </td>
                  <td className="px-5 py-3.5 text-sm text-ink-700">{wo.assignedTo}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-500">{formatDate(wo.scheduledDate)}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-700">{wo.estimatedHours}h</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={wo.status} size="sm" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        {/* Equipment */}
        <SectionCard title="Equipment Registry" subtitle={`${equipment.length} machines`} noPadding>
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100">
                {["Equip #", "Name", "Location", "Last PM", "Next PM", "Status"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-4 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {equipment.map((eq) => {
                const isOverduePM = new Date(eq.nextPM) < new Date("2024-03-20") && eq.status === "Online";
                return (
                  <tr key={eq.id} className={`hover:bg-surface-50 transition-colors ${isOverduePM ? "bg-red-50/20" : eq.status === "Maintenance" ? "bg-yellow-50/20" : ""}`}>
                    <td className="px-4 py-3 text-xs font-medium text-brand-500">{eq.equipmentNumber}</td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-medium text-ink-900">{eq.name}</p>
                      <p className="text-[10px] text-ink-400">{eq.make} {eq.model}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-ink-500">{eq.location}</td>
                    <td className="px-4 py-3 text-xs text-ink-500">{formatDate(eq.lastPM)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs ${isOverduePM ? "text-status-red font-medium" : "text-ink-500"}`}>
                        {formatDate(eq.nextPM)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Pill label={eq.status} className={eqStatusColor[eq.status] ?? "bg-gray-100 text-gray-600 border-gray-200"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </SectionCard>

        {/* Calibrations */}
        <SectionCard title="Calibration Status" subtitle={`${calibrationRecords.length} instruments`} noPadding>
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100">
                {["Instrument", "ID #", "Last Cal", "Next Cal", "Cal House", "Status"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-4 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {calibrationRecords.map((cal) => {
                const isOverdue = cal.calStatus === "Overdue";
                return (
                  <tr key={cal.id} className={`hover:bg-surface-50 transition-colors ${isOverdue ? "bg-red-50/20" : ""}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {isOverdue && <AlertTriangle size={11} className="text-status-red flex-shrink-0" />}
                        <p className="text-xs font-medium text-ink-900 truncate max-w-[140px]">{cal.instrumentName}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-ink-500">{cal.idNumber}</td>
                    <td className="px-4 py-3 text-xs text-ink-500">{formatDate(cal.lastCalDate)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs ${isOverdue ? "text-status-red font-medium" : "text-ink-500"}`}>
                        {formatDate(cal.nextCalDate)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-ink-500 truncate max-w-[100px]">{cal.calHouse}</td>
                    <td className="px-4 py-3">
                      <Pill label={cal.calStatus} className={calStatusColor[cal.calStatus] ?? "bg-gray-100 text-gray-600 border-gray-200"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </SectionCard>
      </div>
    </div>
  );
}
