import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { employees, clockPunches } from "@/lib/mock-data/employees";
import { formatCurrency } from "@/lib/utils";

const operationTypeStyle: Record<string, string> = {
  Setup: "bg-blue-100 text-blue-700",
  Run: "bg-green-100 text-green-700",
  Programming: "bg-purple-100 text-purple-700",
  Inspection: "bg-yellow-100 text-yellow-700",
  Troubleshooting: "bg-orange-100 text-orange-700",
};

export default function ShopFloorPage() {
  const activePunches = clockPunches.filter((p) => p.clockOut === null);
  const completedPunches = clockPunches.filter((p) => p.clockOut !== null);

  const activeOperatorsCount = activePunches.length;
  const totalHoursToday = completedPunches.reduce((sum, p) => sum + (p.hours ?? 0), 0);
  const avgHoursPerOperator =
    completedPunches.length > 0 ? totalHoursToday / completedPunches.length : 0;
  const laborCostToday = completedPunches.reduce((sum, p) => sum + (p.laborCost ?? 0), 0);

  return (
    <div className="p-6">
      <PageHeader
        title="Shop Floor"
        subtitle="Live time clock & operator activity"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs text-ink-500 font-medium uppercase tracking-wide mb-1">Active Operators</p>
          <p className="text-3xl font-semibold text-status-green">{activeOperatorsCount}</p>
        </div>
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs text-ink-500 font-medium uppercase tracking-wide mb-1">Total Hours Today</p>
          <p className="text-3xl font-semibold text-ink-900">{totalHoursToday.toFixed(1)}</p>
        </div>
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs text-ink-500 font-medium uppercase tracking-wide mb-1">Avg Hours / Operator</p>
          <p className="text-3xl font-semibold text-ink-900">{avgHoursPerOperator.toFixed(1)}</p>
        </div>
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs text-ink-500 font-medium uppercase tracking-wide mb-1">Labor Cost Today</p>
          <p className="text-3xl font-semibold text-ink-900">{formatCurrency(laborCostToday)}</p>
        </div>
      </div>

      {/* Currently Clocked In */}
      <SectionCard
        title="Currently Clocked In"
        subtitle={`${activeOperatorsCount} operators active`}
        className="mb-6"
      >
        <div className="grid grid-cols-3 gap-4">
          {activePunches.map((punch) => (
            <div
              key={punch.id}
              className="bg-surface-50 rounded-xl p-4 border border-surface-200"
            >
              <p className="font-semibold text-ink-900 text-sm">{punch.employeeName}</p>
              <p className="text-sm text-ink-500 mt-0.5">{punch.workOrder}</p>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    operationTypeStyle[punch.operationType] ?? "bg-surface-100 text-ink-500"
                  }`}
                >
                  {punch.operationType}
                </span>
              </div>
              <p className="text-xs text-ink-400 mt-2">Clocked in: {punch.clockIn}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Today's Time Log */}
      <SectionCard title="Today's Time Log" noPadding className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-200">
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Employee</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">WO #</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Operation</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Clock In</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Clock Out</th>
                <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Hours</th>
                <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Est. Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {clockPunches.map((punch) => (
                <tr key={punch.id} className="hover:bg-surface-50 transition-colors">
                  <td className="px-5 py-3 text-ink-900 font-medium">{punch.employeeName}</td>
                  <td className="px-5 py-3 text-ink-700 font-mono text-xs">{punch.workOrder}</td>
                  <td className="px-5 py-3 text-ink-700 max-w-[180px] truncate">{punch.operation}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        operationTypeStyle[punch.operationType] ?? "bg-surface-100 text-ink-500"
                      }`}
                    >
                      {punch.operationType}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink-700">{punch.clockIn}</td>
                  <td className="px-5 py-3">
                    {punch.clockOut === null ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="text-ink-700">{punch.clockOut}</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right text-ink-700">
                    {punch.hours !== null ? punch.hours.toFixed(1) : "—"}
                  </td>
                  <td className="px-5 py-3 text-right text-ink-700">
                    {punch.laborCost !== null ? formatCurrency(punch.laborCost) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Quick Clock In */}
      <SectionCard
        title="Quick Clock In"
        actions={
          <span className="flex items-center gap-1.5 text-xs font-medium text-status-green">
            <span className="w-2 h-2 rounded-full bg-status-green inline-block" />
            Live
          </span>
        }
      >
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-700 uppercase tracking-wide">Employee</label>
            <select className="border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option value="">Select employee...</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-700 uppercase tracking-wide">Work Order</label>
            <select className="border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option value="">Select work order...</option>
              <option>WO-2024-0891</option>
              <option>WO-2024-0892</option>
              <option>WO-2024-0893</option>
              <option>WO-2024-0895</option>
              <option>WO-2024-0897</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-700 uppercase tracking-wide">Operation Type</label>
            <select className="border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option value="">Select type...</option>
              <option>Setup</option>
              <option>Run</option>
              <option>Programming</option>
              <option>Inspection</option>
              <option>Troubleshooting</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-700 uppercase tracking-wide">Machine</label>
            <select className="border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option value="">Select machine...</option>
              <option>Haas VF-3</option>
              <option>Haas VF-4</option>
              <option>Haas UMC-750</option>
              <option>Okuma LB3000</option>
              <option>Zeiss CMM</option>
            </select>
          </div>
        </div>
        <button className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-lg text-sm transition-colors">
          Clock In
        </button>
      </SectionCard>
    </div>
  );
}
