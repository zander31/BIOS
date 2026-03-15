import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { audits } from "@/lib/mock-data/quality";

const auditTypeBadge: Record<string, string> = {
  Internal: "bg-blue-100 text-blue-700",
  External: "bg-purple-100 text-purple-700",
  Customer: "bg-green-100 text-green-700",
  Supplier: "bg-yellow-100 text-yellow-700",
};

export default function AuditsPage() {
  const scheduledAudits = audits.filter((a) => a.status === "Scheduled");
  const completedAudits = audits.filter((a) => a.status === "Complete");

  const scheduledCount = scheduledAudits.length;
  const completeCount = completedAudits.length;
  const totalFindings = audits.reduce((sum, a) => sum + a.findings, 0);
  const majorFindings = audits.reduce((sum, a) => sum + a.majorFindings, 0);

  return (
    <div className="p-6">
      {/* Back link */}
      <div className="mb-4">
        <Link href="/quality" className="text-sm text-ink-500 hover:text-ink-900 transition-colors">
          ← Back to Quality
        </Link>
      </div>

      <PageHeader
        title="Audits"
        subtitle="Internal, external, customer and supplier audits"
        actions={
          <button className="inline-flex items-center gap-1.5 bg-brand-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors">
            + Schedule Audit
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs text-ink-500 font-medium uppercase tracking-wide mb-1">Scheduled</p>
          <p className="text-3xl font-semibold text-status-blue">{scheduledCount}</p>
        </div>
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs text-ink-500 font-medium uppercase tracking-wide mb-1">Complete</p>
          <p className="text-3xl font-semibold text-status-green">{completeCount}</p>
        </div>
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs text-ink-500 font-medium uppercase tracking-wide mb-1">Total Findings</p>
          <p className="text-3xl font-semibold text-ink-900">{totalFindings}</p>
        </div>
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs text-ink-500 font-medium uppercase tracking-wide mb-1">Major Findings</p>
          <p className="text-3xl font-semibold text-status-red">{majorFindings}</p>
        </div>
      </div>

      {/* Upcoming & Active */}
      <SectionCard title="Upcoming & Active" noPadding className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-200">
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Audit #</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Scope</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Lead Auditor</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Scheduled Date</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {scheduledAudits.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-ink-400">
                    No scheduled audits.
                  </td>
                </tr>
              ) : (
                scheduledAudits.map((audit) => (
                  <tr key={audit.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-5 py-3">
                      <span className="text-brand-500 font-medium">{audit.auditNumber}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          auditTypeBadge[audit.type] ?? "bg-surface-100 text-ink-700"
                        }`}
                      >
                        {audit.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-ink-700 max-w-[240px] truncate">{audit.scope}</td>
                    <td className="px-5 py-3 text-ink-700">{audit.leadAuditor}</td>
                    <td className="px-5 py-3 text-ink-700">{audit.scheduledDate}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={audit.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Completed Audits */}
      <SectionCard title="Completed Audits" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-200">
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Audit #</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Scope</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Lead Auditor</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Scheduled Date</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Findings</th>
                <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Major</th>
                <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Minor</th>
                <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Observations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {completedAudits.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-5 py-8 text-center text-sm text-ink-400">
                    No completed audits.
                  </td>
                </tr>
              ) : (
                completedAudits.map((audit) => (
                  <tr key={audit.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-5 py-3">
                      <span className="text-brand-500 font-medium">{audit.auditNumber}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          auditTypeBadge[audit.type] ?? "bg-surface-100 text-ink-700"
                        }`}
                      >
                        {audit.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-ink-700 max-w-[240px] truncate">{audit.scope}</td>
                    <td className="px-5 py-3 text-ink-700">{audit.leadAuditor}</td>
                    <td className="px-5 py-3 text-ink-700">{audit.scheduledDate}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={audit.status} />
                    </td>
                    <td className="px-5 py-3 text-right text-ink-700">{audit.findings}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={audit.majorFindings > 0 ? "text-status-red font-semibold" : "text-ink-500"}>
                        {audit.majorFindings}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-ink-700">{audit.minorFindings}</td>
                    <td className="px-5 py-3 text-right text-ink-500">{audit.observations}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
