import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { purchaseOrders, poLineItems, suppliers } from "@/lib/mock-data/purchasing";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function PODetailPage({ params }: { params: { id: string } }) {
  const po = purchaseOrders.find((p) => p.id === params.id);
  if (!po) notFound();
  const supplier = suppliers.find((s) => s.name === po.supplier);
  const lineItems = poLineItems.filter((li) => li.poId === po.id);

  return (
    <div>
      <Link href="/purchasing" className="flex items-center gap-1 text-sm text-ink-400 hover:text-ink-900 mb-4 transition-colors">
        <ChevronLeft size={14} />
        Purchasing
      </Link>
      <PageHeader
        title={po.poNumber}
        subtitle={`${po.supplier} · ${formatDate(po.orderDate)}`}
        actions={
          <div className="flex gap-2">
            <StatusBadge status={po.status} />
            <button className="px-3.5 py-2 text-sm font-medium border border-surface-200 rounded-lg hover:bg-surface-50 text-ink-700 transition-colors">
              Print PO
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-3 gap-4 mb-4">
        <SectionCard title="PO Details" className="col-span-2">
          <div className="grid grid-cols-3 gap-5">
            {[
              { label: "PO Number", value: po.poNumber },
              { label: "Order Date", value: formatDate(po.orderDate) },
              { label: "Expected", value: formatDate(po.expectedDate) },
              { label: "Supplier", value: po.supplier },
              { label: "Line Items", value: po.lineItems },
              { label: "Total", value: formatCurrency(po.total) },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-300 mb-0.5">{label}</p>
                <p className="text-sm font-medium text-ink-900">{value}</p>
              </div>
            ))}
          </div>
          {po.notes && (
            <div className="mt-4 pt-4 border-t border-surface-100">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-300 mb-1">Notes</p>
              <p className="text-sm text-ink-700">{po.notes}</p>
            </div>
          )}
        </SectionCard>

        <SectionCard title="Supplier Info">
          {supplier ? (
            <div className="space-y-3">
              {[
                { label: "Contact", value: supplier.contact },
                { label: "Email", value: supplier.email },
                { label: "Phone", value: supplier.phone },
                { label: "Lead Time", value: supplier.leadTime },
                { label: "On-Time Rate", value: `${supplier.onTimeRate}%` },
                { label: "Rating", value: `${supplier.rating} / 5.0` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center border-b border-surface-100 pb-2 last:border-0 last:pb-0">
                  <span className="text-xs text-ink-500">{label}</span>
                  <span className="text-xs font-medium text-ink-900">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-400">No supplier profile.</p>
          )}
        </SectionCard>
      </div>

      {lineItems.length > 0 && (
        <SectionCard title="Line Items" noPadding>
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100">
                {["Part Number", "Description", "Qty Ordered", "Qty Received", "Unit Cost", "Total", "Status"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {lineItems.map((li) => (
                <tr key={li.id} className="hover:bg-surface-50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-ink-900">{li.partNumber}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-700">{li.description}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-700">{li.quantity}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-700">{li.received}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-700">{formatCurrency(li.unitCost)}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-ink-900">{formatCurrency(li.quantity * li.unitCost)}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={li.status} size="sm" />
                  </td>
                </tr>
              ))}
              {/* Total row */}
              <tr className="bg-surface-50">
                <td colSpan={5} className="px-5 py-3 text-right text-xs font-semibold text-ink-500">PO Total</td>
                <td className="px-5 py-3 text-sm font-semibold text-ink-900">{formatCurrency(po.total)}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </SectionCard>
      )}
    </div>
  );
}
