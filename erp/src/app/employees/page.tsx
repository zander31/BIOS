import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { employees, timeEntries, trainingRecords, clockPunches } from "@/lib/mock-data/employees";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const totalHours = employees.reduce((sum, e) => sum + e.hoursThisWeek, 0);
const activeCount = employees.filter((e) => e.status === "Active").length;

const trainingStatusColor: Record<string, string> = {
  Current: "bg-green-50 text-green-700 border-green-200",
  "Expiring Soon": "bg-yellow-50 text-yellow-700 border-yellow-200",
  Expired: "bg-red-50 text-red-700 border-red-200",
};

const trainingTypeColor: Record<string, string> = {
  Equipment: "bg-blue-50 text-blue-700",
  Safety: "bg-orange-50 text-orange-700",
  Quality: "bg-purple-50 text-purple-700",
  Process: "bg-teal-50 text-teal-700",
  Certification: "bg-brand-50 text-brand-700",
};

function Pill({ label, className }: { label: string; className: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      {label}
    </span>
  );
}

export default function EmployeesPage() {
  const expiredCount = trainingRecords.filter((t) => t.status === "Expired").length;
  const expiringSoonCount = trainingRecords.filter((t) => t.status === "Expiring Soon").length;
  const activeClocks = clockPunches.filter((p) => p.clockOut === null).length;

  return (
    <div>
      <PageHeader
        title="Employees"
        subtitle={`${employees.length} employees · ${totalHours} hours this week`}
        actions={
          <button className="px-3.5 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
            Add Employee
          </button>
        }
      />

      {/* Summary row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active", value: activeCount },
          { label: "On PTO", value: employees.filter((e) => e.status === "PTO").length },
          { label: "In Training", value: employees.filter((e) => e.status === "Training").length },
          { label: "Total Hours (Week)", value: totalHours },
        ].map(({ label, value }) => (
          <div key={label} className="bg-surface-0 rounded-xl shadow-card p-5">
            <p className="text-xs font-medium text-ink-500 uppercase tracking-wider mb-2">{label}</p>
            <p className="text-2xl font-semibold text-ink-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Tab strip */}
      <div className="flex gap-1 mb-6 bg-surface-100 p-1 rounded-xl w-fit">
        {["Directory", "Training Records", "Time Clock"].map((tab, i) => (
          <div
            key={tab}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all ${
              i === 0 ? "bg-surface-0 text-ink-900 shadow-sm" : "text-ink-500 hover:text-ink-700"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* === DIRECTORY === */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Employee directory */}
        <div className="col-span-2">
          <SectionCard noPadding>
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-100">
                  {["Name", "Role", "Dept", "Shift", "Current Job", "Hrs This Week", "Status"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] font-semibold">
                            {emp.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-ink-900">{emp.name}</p>
                          <p className="text-[10px] text-ink-400">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-ink-700">{emp.role}</td>
                    <td className="px-5 py-3.5 text-sm text-ink-700">{emp.department}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs bg-surface-100 text-ink-600 px-2 py-0.5 rounded-full font-medium">{emp.shift}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-ink-500 font-medium">{emp.currentJob || "—"}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-brand-500"
                            style={{ width: `${Math.min(100, (emp.hoursThisWeek / 40) * 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-ink-700">{emp.hoursThisWeek}h</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={emp.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>
        </div>

        {/* Recent Time Entries */}
        <SectionCard title="Recent Time Entries">
          <div className="space-y-3">
            {timeEntries.map((entry) => {
              const emp = employees.find((e) => e.id === entry.employeeId);
              return (
                <div key={entry.id} className="flex items-start gap-2.5 py-2 border-b border-surface-100 last:border-0 last:pb-0">
                  <div className="w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-semibold text-brand-500">
                      {emp?.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-ink-900">{emp?.name}</p>
                    <p className="text-[10px] text-ink-500">{entry.workOrder} · {entry.operation}</p>
                    <p className="text-[10px] text-ink-300">{new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs font-semibold text-ink-900">{entry.hours}h</p>
                    {entry.type !== "Regular" && (
                      <p className="text-[9px] font-medium text-status-yellow">{entry.type}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      {/* === TRAINING RECORDS === */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-ink-900">Training Records</h2>
            <p className="text-sm text-ink-500">{trainingRecords.length} records · {expiredCount} expired · {expiringSoonCount} expiring soon</p>
          </div>
          <div className="flex items-center gap-3">
            {expiredCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle size={13} className="text-status-red" />
                <span className="text-xs font-medium text-red-700">{expiredCount} expired</span>
              </div>
            )}
            {expiringSoonCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle size={13} className="text-status-yellow" />
                <span className="text-xs font-medium text-yellow-700">{expiringSoonCount} expiring soon</span>
              </div>
            )}
          </div>
        </div>

        <SectionCard noPadding>
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100">
                {["Employee", "Training / Certification", "Type", "Provider", "Date Completed", "Expires", "Status"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {trainingRecords.map((rec) => {
                const isExpired = rec.status === "Expired";
                return (
                  <tr key={rec.id} className={`hover:bg-surface-50 transition-colors ${isExpired ? "bg-red-50/20" : ""}`}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
                          <span className="text-[9px] font-semibold text-brand-500">
                            {rec.employeeName.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-ink-900">{rec.employeeName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-ink-900 max-w-[220px]">
                      <p className="truncate">{rec.training}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${trainingTypeColor[rec.type] ?? "bg-gray-100 text-gray-600"}`}>
                        {rec.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-ink-700">{rec.provider}</td>
                    <td className="px-5 py-3 text-xs text-ink-500">{new Date(rec.dateCompleted).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td className="px-5 py-3">
                      {rec.expires ? (
                        <span className={`text-xs ${isExpired ? "text-status-red font-medium" : rec.status === "Expiring Soon" ? "text-status-yellow font-medium" : "text-ink-500"}`}>
                          {new Date(rec.expires).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      ) : (
                        <span className="text-xs text-ink-300">No expiry</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <Pill label={rec.status} className={trainingStatusColor[rec.status] ?? "bg-gray-100 text-gray-600 border-gray-200"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </SectionCard>
      </div>

      {/* === TIME CLOCK === */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold text-ink-900">Time Clock</h2>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-status-green animate-pulse" />
            <span className="text-xs text-ink-500">{activeClocks} currently clocked in</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Active punches */}
          <SectionCard title="Currently Active" noPadding>
            <div className="divide-y divide-surface-100">
              {clockPunches.filter((p) => p.clockOut === null).map((punch) => (
                <div key={punch.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-surface-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center">
                        <span className="text-white text-[10px] font-semibold">
                          {punch.employeeName.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-status-green rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink-900">{punch.employeeName}</p>
                      <p className="text-[10px] text-ink-500">{punch.workOrder} · {punch.operation}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      punch.operationType === "Run" ? "bg-green-50 text-green-700" :
                      punch.operationType === "Setup" ? "bg-blue-50 text-blue-700" :
                      punch.operationType === "Programming" ? "bg-purple-50 text-purple-700" :
                      punch.operationType === "Inspection" ? "bg-yellow-50 text-yellow-700" :
                      "bg-gray-50 text-gray-600"
                    }`}>
                      {punch.operationType}
                    </div>
                    <p className="text-[10px] text-ink-400 mt-1 flex items-center gap-1 justify-end">
                      <Clock size={10} />
                      Since {punch.clockIn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Today's completed punches */}
          <SectionCard title="Today's Log" noPadding>
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-100">
                  {["Employee", "WO #", "Type", "In", "Out", "Hours"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {clockPunches.map((punch) => (
                  <tr key={punch.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-medium text-ink-900">{punch.employeeName.split(" ")[0]}</td>
                    <td className="px-4 py-3 text-xs text-brand-500 font-medium">{punch.workOrder}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] bg-surface-100 text-ink-600 px-1.5 py-0.5 rounded-full font-medium">{punch.operationType}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-ink-700">{punch.clockIn}</td>
                    <td className="px-4 py-3 text-xs">
                      {punch.clockOut ? (
                        <span className="text-ink-700">{punch.clockOut}</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-status-green">
                          <span className="w-1.5 h-1.5 rounded-full bg-status-green" />
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs font-medium text-ink-900">
                      {punch.hours ? `${punch.hours}h` : <CheckCircle2 size={12} className="text-ink-300" />}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-surface-200 bg-surface-50">
                  <td colSpan={5} className="px-4 py-2.5 text-xs font-semibold text-ink-500 text-right">Total Hours Today</td>
                  <td className="px-4 py-2.5 text-xs font-semibold text-ink-900">
                    {clockPunches.filter((p) => p.hours).reduce((s, p) => s + (p.hours ?? 0), 0).toFixed(1)}h
                  </td>
                </tr>
              </tfoot>
            </table>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
