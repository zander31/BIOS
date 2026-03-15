import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { capas } from "@/lib/mock-data/quality";

const today = "2024-03-20";

export default function CAPAPage() {
  const openCount = capas.filter((c) => c.status !== "Closed").length;
  const closedCount = capas.filter((c) => c.status === "Closed").length;

  const firstOpenCapa = capas.find((c) => c.status === "Open");

  return (
    <div className="p-6">
      {/* Back link */}
      <div className="mb-4">
        <Link href="/quality" className="text-sm text-ink-500 hover:text-ink-900 transition-colors">
          ← Back to Quality
        </Link>
      </div>

      <PageHeader
        title="Corrective & Preventive Actions"
        subtitle={`${openCount} open · ${closedCount} closed`}
        actions={
          <button className="inline-flex items-center gap-1.5 bg-brand-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors">
            + Open CAPA
          </button>
        }
      />

      {/* Status Filter Tabs */}
      <div className="flex gap-1 mb-4">
        <button className="bg-brand-500 text-white rounded-lg px-3 py-1.5 text-sm font-medium">All</button>
        <button className="text-ink-700 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-surface-100">Open</button>
        <button className="text-ink-700 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-surface-100">In Review</button>
        <button className="text-ink-700 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-surface-100">Pending Verification</button>
        <button className="text-ink-700 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-surface-100">Closed</button>
      </div>

      {/* CAPAs Table */}
      <SectionCard noPadding className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-200">
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">CAPA #</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Source</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Description</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Linked NCR</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Assigned To</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Due Date</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {capas.map((capa) => {
                const isPastDue = capa.status !== "Closed" && capa.dueDate < today;
                return (
                  <tr key={capa.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-5 py-3">
                      <span className="text-brand-500 font-medium">{capa.capaNumber}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-100 text-ink-700">
                        {capa.source}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-ink-700 max-w-[260px] truncate">{capa.description}</td>
                    <td className="px-5 py-3 text-ink-500">{capa.linkedNcr ?? "—"}</td>
                    <td className="px-5 py-3 text-ink-700">{capa.assignedTo}</td>
                    <td className={`px-5 py-3 font-medium ${isPastDue ? "text-status-red" : "text-ink-700"}`}>
                      {capa.dueDate}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={capa.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* 5-Why Analysis for first open CAPA */}
      {firstOpenCapa && (
        <SectionCard title="5-Why Analysis">
          <div className="mb-4">
            <p className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-0.5">{firstOpenCapa.capaNumber}</p>
            <p className="text-sm font-medium text-ink-900">{firstOpenCapa.description}</p>
          </div>
          <div className="space-y-3">
            {[
              { label: "Why 1:", text: firstOpenCapa.whyOne },
              { label: "Why 2:", text: firstOpenCapa.whyTwo },
              { label: "Why 3:", text: firstOpenCapa.whyThree },
              { label: "Why 4:", text: firstOpenCapa.whyFour },
              { label: "Why 5:", text: firstOpenCapa.whyFive },
            ].map(({ label, text }) => (
              <div key={label} className="flex gap-3">
                <span className="text-xs font-semibold text-ink-500 whitespace-nowrap pt-0.5 w-12">{label}</span>
                <div className="flex-1 border-l-2 border-brand-100 pl-3 py-0.5">
                  <p className="text-sm text-ink-700">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
