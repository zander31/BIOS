import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ncrs } from "@/lib/mock-data/quality";
import { formatDate } from "@/lib/utils";
import { Plus, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NCRPage() {
  return (
    <div>
      <Link href="/quality" className="flex items-center gap-1 text-sm text-ink-400 hover:text-ink-900 mb-4 transition-colors">
        <ChevronLeft size={14} />
        Quality
      </Link>
      <PageHeader
        title="Non-Conformance Reports"
        subtitle={`${ncrs.filter((n) => n.status !== "Closed").length} open · ${ncrs.filter((n) => n.status === "Closed").length} closed`}
        actions={
          <button className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors">
            <Plus size={15} />
            Open NCR
          </button>
        }
      />

      <SectionCard noPadding>
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              {["NCR #", "Work Order", "Part Number", "Description", "Category", "Qty", "Disposition", "Assigned To", "Opened", "Status"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {ncrs.map((ncr) => (
              <tr key={ncr.id} className="hover:bg-surface-50 transition-colors cursor-pointer">
                <td className="px-5 py-3.5 text-sm font-medium text-brand-500 whitespace-nowrap">{ncr.ncrNumber}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700 whitespace-nowrap">{ncr.workOrder}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{ncr.partNumber}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700 max-w-[220px]">
                  <p className="truncate" title={ncr.description}>{ncr.description}</p>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-xs bg-surface-100 text-ink-600 px-2 py-0.5 rounded-full font-medium">{ncr.category}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{ncr.qty}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700 whitespace-nowrap">{ncr.disposition}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{ncr.assignedTo}</td>
                <td className="px-5 py-3.5 text-sm text-ink-500 whitespace-nowrap">{formatDate(ncr.dateOpened)}</td>
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
