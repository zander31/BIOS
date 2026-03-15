import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { qualityDocuments } from "@/lib/mock-data/quality";
import { formatDate } from "@/lib/utils";
import { ChevronLeft, Plus, FileText } from "lucide-react";
import Link from "next/link";

const docTypes = ["All", "Procedure", "Work Instruction", "Form", "Policy", "Specification"];

export default function DocumentsPage() {
  const typeCount = (type: string) =>
    qualityDocuments.filter((d) => type === "All" || d.type === type).length;

  return (
    <div>
      <Link href="/quality" className="flex items-center gap-1 text-sm text-ink-400 hover:text-ink-900 mb-4 transition-colors">
        <ChevronLeft size={14} />
        Quality
      </Link>
      <PageHeader
        title="Document Control"
        subtitle={`${qualityDocuments.length} controlled documents`}
        actions={
          <button className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors">
            <Plus size={15} />
            New Document
          </button>
        }
      />

      {/* Type breakdown */}
      <div className="grid grid-cols-5 gap-3 mb-5">
        {docTypes.filter((t) => t !== "All").map((type) => (
          <div key={type} className="bg-surface-0 rounded-xl shadow-card p-4 text-center">
            <p className="text-lg font-semibold text-ink-900">{typeCount(type)}</p>
            <p className="text-xs text-ink-500 mt-0.5">{type}</p>
          </div>
        ))}
      </div>

      <SectionCard noPadding>
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              {["", "Doc #", "Title", "Type", "Revision", "Owner", "Last Revised", "Next Review", "Status"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap first:px-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {qualityDocuments.map((doc) => (
              <tr key={doc.id} className="hover:bg-surface-50 transition-colors cursor-pointer">
                <td className="px-3 py-3.5">
                  <div className="w-7 h-7 bg-brand-50 rounded-lg flex items-center justify-center">
                    <FileText size={13} className="text-brand-500" />
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm font-medium text-brand-500">{doc.docNumber}</td>
                <td className="px-5 py-3.5 text-sm text-ink-900 max-w-[200px] truncate" title={doc.title}>{doc.title}</td>
                <td className="px-5 py-3.5">
                  <span className="text-xs bg-surface-100 text-ink-600 px-2 py-0.5 rounded-full font-medium">{doc.type}</span>
                </td>
                <td className="px-5 py-3.5 text-sm font-medium text-ink-700">{doc.revision}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{doc.owner}</td>
                <td className="px-5 py-3.5 text-sm text-ink-500 whitespace-nowrap">{formatDate(doc.lastRevised)}</td>
                <td className="px-5 py-3.5 text-sm text-ink-500 whitespace-nowrap">{formatDate(doc.nextReview)}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={doc.status} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
