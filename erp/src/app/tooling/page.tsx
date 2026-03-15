import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { cuttingTools, fixtures, gauges } from "@/lib/mock-data/tooling";
import { formatDate } from "@/lib/utils";
import { AlertTriangle, Wrench, CheckCircle, XCircle } from "lucide-react";

const totalTools = cuttingTools.length + fixtures.length + gauges.length;
const inUse = cuttingTools.filter((t) => t.status === "In Use").length;
const dueForService = cuttingTools.filter((t) => t.status === "Worn" || t.status === "In Grind").length
  + gauges.filter((g) => g.calStatus === "Due Soon" || g.calStatus === "Overdue").length;
const outOfService = cuttingTools.filter((t) => t.status === "Retired").length
  + fixtures.filter((f) => f.condition === "Out of Service").length
  + gauges.filter((g) => g.calStatus === "Overdue").length;

const statusColor: Record<string, string> = {
  Active: "bg-green-50 text-green-700 border-green-200",
  "In Use": "bg-blue-50 text-blue-700 border-blue-200",
  Worn: "bg-red-50 text-red-700 border-red-200",
  "In Grind": "bg-yellow-50 text-yellow-700 border-yellow-200",
  Retired: "bg-gray-100 text-gray-600 border-gray-200",
};

const conditionColor: Record<string, string> = {
  Excellent: "bg-green-50 text-green-700 border-green-200",
  Good: "bg-blue-50 text-blue-700 border-blue-200",
  Fair: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Poor: "bg-red-50 text-red-700 border-red-200",
  "Out of Service": "bg-gray-100 text-gray-600 border-gray-200",
};

const calStatusColor: Record<string, string> = {
  OK: "bg-green-50 text-green-700 border-green-200",
  "Due Soon": "bg-yellow-50 text-yellow-700 border-yellow-200",
  Overdue: "bg-red-50 text-red-700 border-red-200",
  "In Calibration": "bg-blue-50 text-blue-700 border-blue-200",
};

function StatusPill({ label, className }: { label: string; className: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      {label}
    </span>
  );
}

export default function ToolingPage() {
  return (
    <div>
      <PageHeader
        title="Tooling"
        subtitle="Cutting tools, fixtures & gauges"
        actions={
          <button className="px-3.5 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
            + Add Tool
          </button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Tools", value: totalTools, icon: Wrench, color: "text-ink-900" },
          { label: "In Use", value: inUse, icon: CheckCircle, color: "text-brand-500" },
          { label: "Due for Service", value: dueForService, icon: AlertTriangle, color: "text-status-yellow" },
          { label: "Out of Service", value: outOfService, icon: XCircle, color: "text-status-red" },
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

      {/* Section tabs (visual only) */}
      <div className="flex gap-1 mb-6 bg-surface-100 p-1 rounded-xl w-fit">
        {["Cutting Tools", "Fixtures", "Gauges"].map((tab, i) => (
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

      {/* Cutting Tools Table */}
      <SectionCard title="Cutting Tools" subtitle={`${cuttingTools.length} tools`} className="mb-4" noPadding>
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              {["Tool #", "Description", "Type", "Coating", "Crib", "On Hand", "In Use", "Usage", "Next Service", "Status"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {cuttingTools.map((tool) => {
              const usagePct = Math.min(100, (tool.usageCycles / tool.maxCycles) * 100);
              const isWorn = tool.status === "Worn" || tool.status === "In Grind";
              return (
                <tr key={tool.id} className={`hover:bg-surface-50 transition-colors ${isWorn ? "bg-red-50/30" : ""}`}>
                  <td className="px-5 py-3.5 text-sm font-medium text-brand-500">{tool.toolNumber}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-900 max-w-[200px]">
                    <p className="truncate">{tool.description}</p>
                    <p className="text-[10px] text-ink-400">{tool.manufacturer} · {tool.diameter}</p>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-ink-700">{tool.type}</td>
                  <td className="px-5 py-3.5 text-xs text-ink-700">{tool.coating}</td>
                  <td className="px-5 py-3.5 text-xs text-ink-500 font-medium">{tool.crib}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-900">
                    <div className="flex items-center gap-1">
                      {tool.qtyOnHand < tool.minQty && <AlertTriangle size={12} className="text-status-red flex-shrink-0" />}
                      <span className={tool.qtyOnHand < tool.minQty ? "text-status-red font-medium" : ""}>{tool.qtyOnHand}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-ink-700">{tool.qtyInUse}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${usagePct > 85 ? "bg-status-red" : usagePct > 60 ? "bg-status-yellow" : "bg-brand-500"}`}
                          style={{ width: `${usagePct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-ink-400">{tool.usageCycles}/{tool.maxCycles}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-ink-500">{tool.nextGrind}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill label={tool.status} className={statusColor[tool.status] ?? "bg-gray-100 text-gray-600 border-gray-200"} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </SectionCard>

      {/* Fixtures Table */}
      <SectionCard title="Fixtures" subtitle={`${fixtures.length} fixtures`} className="mb-4" noPadding>
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              {["Fixture #", "Name", "Parts", "Machine", "Location", "Last Inspection", "Next Inspection", "Condition"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {fixtures.map((fix) => {
              const isPoor = fix.condition === "Poor" || fix.condition === "Out of Service";
              return (
                <tr key={fix.id} className={`hover:bg-surface-50 transition-colors ${isPoor ? "bg-red-50/30" : ""}`}>
                  <td className="px-5 py-3.5 text-sm font-medium text-brand-500">{fix.fixtureNumber}</td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-ink-900">{fix.name}</p>
                    <p className="text-[10px] text-ink-400 max-w-[180px] truncate">{fix.description}</p>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-ink-700 max-w-[120px]">
                    {fix.parts.length > 0 ? fix.parts.join(", ") : <span className="text-ink-300">General</span>}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-ink-700">{fix.machine}</td>
                  <td className="px-5 py-3.5 text-xs text-ink-500">{fix.location}</td>
                  <td className="px-5 py-3.5 text-xs text-ink-500">{formatDate(fix.lastInspection)}</td>
                  <td className="px-5 py-3.5 text-xs text-ink-500">{formatDate(fix.nextInspection)}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill label={fix.condition} className={conditionColor[fix.condition] ?? "bg-gray-100 text-gray-600 border-gray-200"} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </SectionCard>

      {/* Gauges Table */}
      <SectionCard title="Gauges & Inspection Equipment" subtitle={`${gauges.length} instruments`} noPadding>
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              {["Gauge #", "Description", "Type", "Range", "Location", "Last Cal", "Next Cal", "Cal House", "Certificate #", "Status"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {gauges.map((gauge) => {
              const isOverdue = gauge.calStatus === "Overdue";
              return (
                <tr key={gauge.id} className={`hover:bg-surface-50 transition-colors ${isOverdue ? "bg-red-50/30" : ""}`}>
                  <td className="px-5 py-3.5 text-sm font-medium text-brand-500 whitespace-nowrap">{gauge.gaugeNumber}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      {isOverdue && <AlertTriangle size={12} className="text-status-red flex-shrink-0" />}
                      <p className="text-sm text-ink-900">{gauge.description}</p>
                    </div>
                    <p className="text-[10px] text-ink-400">{gauge.manufacturer} · S/N {gauge.serialNumber}</p>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-ink-700">{gauge.type}</td>
                  <td className="px-5 py-3.5 text-xs text-ink-700">{gauge.range}</td>
                  <td className="px-5 py-3.5 text-xs text-ink-500">{gauge.location}</td>
                  <td className="px-5 py-3.5 text-xs text-ink-500">{formatDate(gauge.lastCalDate)}</td>
                  <td className="px-5 py-3.5 text-xs text-ink-500">{formatDate(gauge.nextCalDate)}</td>
                  <td className="px-5 py-3.5 text-xs text-ink-700">{gauge.calHouse}</td>
                  <td className="px-5 py-3.5 text-xs text-ink-500 font-medium">{gauge.certificateNumber}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill label={gauge.calStatus} className={calStatusColor[gauge.calStatus] ?? "bg-gray-100 text-gray-600 border-gray-200"} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
