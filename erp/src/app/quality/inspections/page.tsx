import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { inspections } from "@/lib/mock-data/quality";
import { formatDate } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function InspectionsPage() {
  return (
    <div>
      <Link href="/quality" className="flex items-center gap-1 text-sm text-ink-400 hover:text-ink-900 mb-4 transition-colors">
        <ChevronLeft size={14} />
        Quality
      </Link>
      <PageHeader title="Inspections" subtitle={`${inspections.length} total inspections`} />
      <SectionCard noPadding>
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              {["Work Order", "Part Number", "Part Name", "Type", "Inspector", "Date", "Dimensions", "Passed", "Result"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {inspections.map((insp) => (
              <tr key={insp.id} className="hover:bg-surface-50 transition-colors">
                <td className="px-5 py-3.5 text-sm font-medium text-brand-500">{insp.workOrder}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{insp.partNumber}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700 max-w-[160px] truncate">{insp.partName}</td>
                <td className="px-5 py-3.5">
                  <span className="text-xs bg-surface-100 text-ink-600 px-2 py-0.5 rounded-full font-medium">{insp.type}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{insp.inspector}</td>
                <td className="px-5 py-3.5 text-sm text-ink-500">{formatDate(insp.date)}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{insp.dimensions}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700">
                  {insp.status !== "Pending" ? (
                    <span className={insp.dimensionsPassed === insp.dimensions ? "text-status-green font-medium" : "text-status-red font-medium"}>
                      {insp.dimensionsPassed}/{insp.dimensions}
                    </span>
                  ) : (
                    <span className="text-ink-300">—</span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={insp.status} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
