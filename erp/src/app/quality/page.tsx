import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ncrs, inspections } from "@/lib/mock-data/quality";
import { formatDate } from "@/lib/utils";
import { ArrowRight, ShieldCheck, AlertTriangle, FileCheck, BookOpen, ClipboardCheck, CalendarCheck } from "lucide-react";
import { capas, audits } from "@/lib/mock-data/quality";

const openNCRs = ncrs.filter((n) => n.status !== "Closed" && n.status !== "Voided");
const passRate = Math.round(
  (inspections.filter((i) => i.status === "Pass").length / inspections.filter((i) => i.status !== "Pending").length) * 100
);

export default function QualityPage() {
  return (
    <div>
      <PageHeader
        title="Quality Management"
        subtitle="ISO 13485 · ITAR · AS9100 compliance"
      />

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs font-medium text-ink-500 uppercase tracking-wider mb-3">Open NCRs</p>
          <p className="text-2xl font-semibold text-ink-900">{openNCRs.length}</p>
          <p className="text-xs text-ink-400 mt-1">Non-conformances requiring action</p>
        </div>
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs font-medium text-ink-500 uppercase tracking-wider mb-3">Inspection Pass Rate</p>
          <p className={`text-2xl font-semibold ${passRate >= 90 ? "text-status-green" : "text-status-yellow"}`}>{passRate}%</p>
          <p className="text-xs text-ink-400 mt-1">This month, all inspection types</p>
        </div>
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs font-medium text-ink-500 uppercase tracking-wider mb-3">Pending Inspections</p>
          <p className="text-2xl font-semibold text-ink-900">{inspections.filter((i) => i.status === "Pending").length}</p>
          <p className="text-xs text-ink-400 mt-1">Awaiting inspector review</p>
        </div>
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs font-medium text-ink-500 uppercase tracking-wider mb-3">Docs Under Review</p>
          <p className="text-2xl font-semibold text-ink-900">2</p>
          <p className="text-xs text-ink-400 mt-1">Awaiting approval to publish</p>
        </div>
      </div>

      {/* Module cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { href: "/quality/ncr", icon: AlertTriangle, label: "Non-Conformances", count: `${openNCRs.length} open`, desc: "Track, investigate, and resolve quality escapes" },
          { href: "/quality/inspections", icon: FileCheck, label: "Inspections", count: `${inspections.length} total`, desc: "First article, in-process, final, and receiving" },
          { href: "/quality/documents", icon: BookOpen, label: "Documents", count: "8 docs", desc: "Procedures, work instructions, forms, specs" },
          { href: "/quality/capa", icon: ClipboardCheck, label: "CAPA", count: `${capas.filter((c) => c.status !== "Closed").length} open`, desc: "Corrective & preventive actions — 5-Why root cause analysis" },
          { href: "/quality/audits", icon: CalendarCheck, label: "Audits", count: `${audits.filter((a) => a.status === "Scheduled").length} scheduled`, desc: "Internal, external, customer and supplier audits" },
          { href: "#", icon: ShieldCheck, label: "Certifications", count: "ISO 13485 · AS9100", desc: "Current certifications and renewal tracking" },
        ].map(({ href, icon: Icon, label, count, desc }) => (
          <Link key={label} href={href} className="bg-surface-0 rounded-xl shadow-card p-5 flex items-start gap-4 hover:shadow-card-md transition-shadow group">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon size={18} className="text-brand-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <h3 className="text-sm font-semibold text-ink-900">{label}</h3>
                <ArrowRight size={14} className="text-ink-300 group-hover:text-brand-500 transition-colors" />
              </div>
              <p className="text-xs font-medium text-brand-500 mb-1">{count}</p>
              <p className="text-xs text-ink-500">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent NCRs */}
      <SectionCard
        title="Recent Non-Conformances"
        actions={
          <Link href="/quality/ncr" className="text-xs text-brand-500 font-medium flex items-center gap-1">
            View all <ArrowRight size={11} />
          </Link>
        }
        noPadding
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              {["NCR #", "Work Order", "Part", "Category", "Disposition", "Assigned To", "Opened", "Status"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {ncrs.slice(0, 5).map((ncr) => (
              <tr key={ncr.id} className="hover:bg-surface-50 transition-colors">
                <td className="px-5 py-3.5 text-sm font-medium text-brand-500">{ncr.ncrNumber}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{ncr.workOrder}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{ncr.partNumber}</td>
                <td className="px-5 py-3.5">
                  <span className="text-xs bg-surface-100 text-ink-600 px-2 py-0.5 rounded-full font-medium">{ncr.category}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{ncr.disposition}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{ncr.assignedTo}</td>
                <td className="px-5 py-3.5 text-sm text-ink-500">{formatDate(ncr.dateOpened)}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={ncr.status} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
