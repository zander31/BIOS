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

      {/* Gantt Chart */}
      <SectionCard title="Machine Schedule" noPadding>
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

      {/* Job List */}
      <SectionCard title="All Scheduled Jobs" className="mt-4" noPadding>
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              {["WO #", "Part", "Operation", "Machine", "Operator", "Start", "End", "Status"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {scheduledJobs.map((job) => (
              <tr key={job.id} className="hover:bg-surface-50 transition-colors">
                <td className="px-5 py-3 text-sm font-medium text-brand-500">{job.woNumber}</td>
                <td className="px-5 py-3 text-sm text-ink-700 max-w-[160px] truncate">{job.partName}</td>
                <td className="px-5 py-3 text-sm text-ink-700">{job.operation}</td>
                <td className="px-5 py-3 text-sm text-ink-700">{job.machine}</td>
                <td className="px-5 py-3 text-sm text-ink-700">{job.operator}</td>
                <td className="px-5 py-3 text-sm text-ink-500">{new Date(job.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                <td className="px-5 py-3 text-sm text-ink-500">{new Date(job.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
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
