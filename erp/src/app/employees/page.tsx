import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { employees, timeEntries } from "@/lib/mock-data/employees";
import { formatCurrency } from "@/lib/utils";

export default function EmployeesPage() {
  const totalHours = employees.reduce((sum, e) => sum + e.hoursThisWeek, 0);
  const activeCount = employees.filter((e) => e.status === "Active").length;

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

      <div className="grid grid-cols-3 gap-4">
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
    </div>
  );
}
