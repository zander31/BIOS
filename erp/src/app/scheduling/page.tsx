import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { scheduledJobs, machines } from "@/lib/mock-data/scheduling";
import { cn } from "@/lib/utils";

// Date range: Mar 18 - Apr 5, 2024 (19 days)
const START_DATE = new Date("2024-03-18");
const END_DATE = new Date("2024-04-05");
const TOTAL_DAYS = Math.ceil((END_DATE.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24));

function getBarPosition(startStr: string, endStr: string) {
  const start = new Date(startStr);
  const end = new Date(endStr);
  const startDays = Math.max(0, (start.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24));
  const endDays = Math.min(TOTAL_DAYS, (end.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24));
  const left = (startDays / TOTAL_DAYS) * 100;
  const width = Math.max(2, ((endDays - startDays) / TOTAL_DAYS) * 100);
  return { left: `${left}%`, width: `${width}%` };
}

// Generate date labels for the header
const dateLabels: string[] = [];
for (let i = 0; i < TOTAL_DAYS; i += 3) {
  const d = new Date(START_DATE);
  d.setDate(d.getDate() + i);
  dateLabels.push(
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  );
}

const jobsByMachine = machines.map((machine) => ({
  machine,
  jobs: scheduledJobs.filter((j) => j.machine === machine),
}));

// Capacity data: scheduled vs available hours per machine per week
const weeks = ["Mar 18–22", "Mar 25–29", "Apr 1–5"];
const capacityData = [
  { machine: "Haas ST-30",         available: [40, 40, 40], scheduled: [32, 38, 24], outsideOp: null },
  { machine: "Haas UMC-500",       available: [40, 40, 40], scheduled: [36, 28, 40], outsideOp: null },
  { machine: "Haas VF-4SS",        available: [40, 40, 40], scheduled: [28, 36, 32], outsideOp: null },
  { machine: "Zeiss CMM",          available: [32, 32, 32], scheduled: [8, 6, 12],   outsideOp: null },
  { machine: "Manual Station 2",   available: [40, 40, 40], scheduled: [24, 20, 16], outsideOp: null },
  { machine: "Chem Tank B",        available: [24, 24, 24], scheduled: [4, 6, 8],    outsideOp: "Mar 23" },
  { machine: "Packaging Station",  available: [40, 40, 40], scheduled: [12, 16, 20], outsideOp: null },
];

// Jobs with "Must Leave By" date for outside processing operations
const jobsWithMustLeave = [
  ...scheduledJobs,
  // annotate the passivation job with a "must leave by" field (simulated)
].map((j) => ({
  ...j,
  mustLeaveBy: j.machine === "Chem Tank B" ? "Mar 22" : null,
}));

export default function SchedulingPage() {
  return (
    <div>
      <PageHeader
        title="Scheduling"
        subtitle="Production schedule — Mar 18 to Apr 5, 2024"
        actions={
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium border border-surface-200 rounded-lg text-ink-700 hover:bg-surface-50 transition-colors">
              Today
            </button>
            <button className="px-3 py-1.5 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
              Add Job
            </button>
          </div>
        }
      />

      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Scheduled", value: scheduledJobs.filter((j) => j.status === "Scheduled").length, color: "text-ink-900" },
          { label: "In Progress", value: scheduledJobs.filter((j) => j.status === "In Progress").length, color: "text-brand-500" },
          { label: "Delayed", value: scheduledJobs.filter((j) => j.status === "Delayed").length, color: "text-status-red" },
          { label: "Complete", value: scheduledJobs.filter((j) => j.status === "Complete").length, color: "text-status-green" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-surface-0 rounded-xl shadow-card p-4 flex items-center justify-between">
            <span className="text-xs text-ink-500">{label}</span>
            <span className={`text-2xl font-semibold ${color}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* Tab strip */}
      <div className="flex gap-1 mb-4 bg-surface-100 p-1 rounded-xl w-fit">
        {["Gantt", "Capacity"].map((tab, i) => (
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

      {/* Gantt Chart */}
      <SectionCard title="Machine Schedule" noPadding className="mb-4">
        <div className="overflow-x-auto">
          {/* Header row */}
          <div className="flex border-b border-surface-200">
            <div className="w-48 flex-shrink-0 px-5 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-300">Machine</span>
            </div>
            <div className="flex-1 relative py-3 pr-5">
              <div className="flex">
                {dateLabels.map((label) => (
                  <div
                    key={label}
                    className="text-[10px] font-medium text-ink-400"
                    style={{ width: `${(3 / TOTAL_DAYS) * 100}%`, minWidth: 0 }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Machine rows */}
          {jobsByMachine.map(({ machine, jobs }) => (
            <div key={machine} className="flex border-b border-surface-100 hover:bg-surface-50 transition-colors">
              <div className="w-48 flex-shrink-0 px-5 py-3.5 flex items-center">
                <span className="text-xs font-medium text-ink-700">{machine}</span>
              </div>
              <div className="flex-1 relative py-2 pr-5 min-h-[52px]">
                {/* Background grid lines */}
                <div className="absolute inset-0 flex pointer-events-none">
                  {Array.from({ length: Math.floor(TOTAL_DAYS / 3) }).map((_, i) => (
                    <div
                      key={i}
                      className="border-l border-surface-100"
                      style={{ width: `${(3 / TOTAL_DAYS) * 100}%` }}
                    />
                  ))}
                </div>

                {/* Today line */}
                <div
                  className="absolute top-0 bottom-0 w-px bg-brand-500/40 pointer-events-none z-10"
                  style={{ left: `${(2 / TOTAL_DAYS) * 100}%` }}
                />

                {/* Job bars */}
                {jobs.map((job) => {
                  const pos = getBarPosition(job.startDate, job.endDate);
                  return (
                    <div
                      key={job.id}
                      className="absolute top-2 h-8 rounded-md flex items-center px-2 overflow-hidden cursor-pointer hover:brightness-90 transition-all group"
                      style={{
                        left: pos.left,
                        width: pos.width,
                        backgroundColor: job.color + "20",
                        borderLeft: `3px solid ${job.color}`,
                      }}
                      title={`${job.woNumber} — ${job.operation}`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-semibold truncate" style={{ color: job.color }}>
                          {job.woNumber}
                        </p>
                        <p className="text-[9px] text-ink-500 truncate">{job.operation}</p>
                      </div>
                      {job.progress > 0 && (
                        <div
                          className="absolute bottom-0 left-0 h-0.5 rounded-b"
                          style={{
                            width: `${job.progress}%`,
                            backgroundColor: job.color,
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Capacity Planning View */}
      <div className="border-t border-surface-200 pt-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-ink-900">Capacity Planning</h2>
            <p className="text-sm text-ink-500">Scheduled vs available hours by machine — next 3 weeks</p>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4">
            {[
              { label: "< 70% — Available", color: "bg-status-green" },
              { label: "70–90% — Near Capacity", color: "bg-status-yellow" },
              { label: "> 90% — Overloaded", color: "bg-status-red" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
                <span className="text-[11px] text-ink-500">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <SectionCard noPadding>
          {/* Header */}
          <div className="flex border-b border-surface-100">
            <div className="w-44 flex-shrink-0 px-5 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-300">Machine</span>
            </div>
            {weeks.map((week) => (
              <div key={week} className="flex-1 px-4 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-300">{week}</span>
              </div>
            ))}
            <div className="w-28 px-4 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-300">Must Leave By</span>
            </div>
          </div>

          {/* Machine rows */}
          {capacityData.map((row) => (
            <div key={row.machine} className="flex items-center border-b border-surface-100 last:border-0 hover:bg-surface-50 transition-colors">
              <div className="w-44 flex-shrink-0 px-5 py-4">
                <span className="text-xs font-medium text-ink-700">{row.machine}</span>
              </div>
              {weeks.map((week, wi) => {
                const util = row.scheduled[wi] / row.available[wi];
                const pct = Math.round(util * 100);
                const barColor = util < 0.7 ? "bg-status-green" : util < 0.9 ? "bg-status-yellow" : "bg-status-red";
                const textColor = util < 0.7 ? "text-status-green" : util < 0.9 ? "text-status-yellow" : "text-status-red";
                return (
                  <div key={week} className="flex-1 px-4 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold ${textColor}`}>{pct}%</span>
                      <span className="text-[10px] text-ink-400">{row.scheduled[wi]}h / {row.available[wi]}h</span>
                    </div>
                    <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${barColor}`}
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="w-28 px-4 py-4">
                {row.outsideOp ? (
                  <span className="text-xs font-medium text-status-red">{row.outsideOp}</span>
                ) : (
                  <span className="text-xs text-ink-300">—</span>
                )}
              </div>
            </div>
          ))}
        </SectionCard>
      </div>

      {/* Job List */}
      <SectionCard title="All Scheduled Jobs" noPadding>
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              {["WO #", "Part", "Operation", "Machine", "Operator", "Start", "End", "Must Leave By", "Status"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {jobsWithMustLeave.map((job) => (
              <tr key={job.id} className="hover:bg-surface-50 transition-colors">
                <td className="px-5 py-3 text-sm font-medium text-brand-500">{job.woNumber}</td>
                <td className="px-5 py-3 text-sm text-ink-700 max-w-[160px] truncate">{job.partName}</td>
                <td className="px-5 py-3 text-sm text-ink-700">{job.operation}</td>
                <td className="px-5 py-3 text-sm text-ink-700">{job.machine}</td>
                <td className="px-5 py-3 text-sm text-ink-700">{job.operator}</td>
                <td className="px-5 py-3 text-sm text-ink-500">{new Date(job.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                <td className="px-5 py-3 text-sm text-ink-500">{new Date(job.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                <td className="px-5 py-3">
                  {job.mustLeaveBy ? (
                    <span className="text-xs font-medium text-status-red">{job.mustLeaveBy}</span>
                  ) : (
                    <span className="text-xs text-ink-300">—</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={job.status} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
