import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { parts } from "@/lib/mock-data/parts";
import { workOrderRoutingSteps } from "@/lib/mock-data/work-orders";
import { formatDate, formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return parts.map((p) => ({ id: p.id }));
}

export default function PartDetailPage({ params }: { params: { id: string } }) {
  const part = parts.find((p) => p.id === params.id);
  if (!part) notFound();

  return (
    <div>
      <Link href="/parts" className="flex items-center gap-1 text-sm text-ink-400 hover:text-ink-900 mb-4 transition-colors">
        <ChevronLeft size={14} />
        Parts & Routings
      </Link>

      <PageHeader
        title={part.partNumber}
        subtitle={`${part.name} · Rev ${part.revision}`}
        actions={
          <div className="flex gap-2">
            <button className="px-3.5 py-2 text-sm font-medium border border-surface-200 rounded-lg hover:bg-surface-50 text-ink-700 transition-colors">
              Edit Part
            </button>
            <button className="px-3.5 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
              Create Work Order
            </button>
          </div>
        }
      />

      {/* Tabs placeholder */}
      <div className="flex border-b border-surface-200 mb-5">
        {["Overview", "Routing", "Documents", "Run History"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              i === 0
                ? "border-brand-500 text-brand-500"
                : "border-transparent text-ink-500 hover:text-ink-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <SectionCard title="Part Information" className="col-span-2">
          <div className="grid grid-cols-3 gap-5">
            {[
              { label: "Part Number", value: part.partNumber },
              { label: "Revision", value: part.revision },
              { label: "Category", value: part.category },
              { label: "Material", value: part.material },
              { label: "Customer", value: part.customer },
              { label: "Cycle Time", value: `${part.cycleTime} min` },
              { label: "Unit Cost", value: formatCurrency(part.unitCost) },
              { label: "Routing Steps", value: `${part.routingSteps} ops` },
              { label: "Total Runs", value: part.timesRun },
              { label: "Last Run", value: formatDate(part.lastRun) },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-300 mb-0.5">{label}</p>
                <p className="text-sm font-medium text-ink-900">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-surface-100">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-300 mb-1">Description</p>
            <p className="text-sm text-ink-700">{part.description}</p>
          </div>
        </SectionCard>

        <SectionCard title="Quick Stats">
          <div className="space-y-4">
            {[
              { label: "Avg Cycle Time", value: `${part.cycleTime} min` },
              { label: "Unit Cost", value: formatCurrency(part.unitCost) },
              { label: "Total Production Runs", value: part.timesRun },
              { label: "Active Work Orders", value: "1" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-surface-100 last:border-0">
                <span className="text-xs text-ink-500">{label}</span>
                <span className="text-sm font-semibold text-ink-900">{value}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Routing Operations" className="mt-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              {["Step", "Operation", "Machine", "Est. Hours", "Status"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 py-2 pr-6">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {workOrderRoutingSteps.map((step) => (
              <tr key={step.step}>
                <td className="py-3 pr-6 text-sm font-medium text-ink-400">
                  {String(step.step).padStart(2, "0")}
                </td>
                <td className="py-3 pr-6 text-sm text-ink-900">{step.operation}</td>
                <td className="py-3 pr-6 text-sm text-ink-700">{step.machine}</td>
                <td className="py-3 pr-6 text-sm text-ink-700">{step.hours} hrs</td>
                <td className="py-3">
                  <span className="text-xs text-ink-400 bg-surface-50 px-2 py-0.5 rounded-full">{step.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
