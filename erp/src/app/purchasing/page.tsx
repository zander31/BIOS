import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { purchaseOrders } from "@/lib/mock-data/purchasing";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function PurchasingPage() {
  const total = purchaseOrders.reduce((sum, po) => sum + po.total, 0);
  const openPOs = purchaseOrders.filter((po) => !["Complete", "Cancelled"].includes(po.status));

  return (
    <div>
      <PageHeader
        title="Purchasing"
        subtitle={`${openPOs.length} open · ${formatCurrency(total)} total`}
        actions={
          <button className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors">
            <Plus size={15} />
            Create PO
          </button>
        }
      />

      {/* Status summary */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {(["Draft", "Sent", "Acknowledged", "Partial", "Complete"] as const).map((status) => {
          const count = purchaseOrders.filter((po) => po.status === status).length;
          return (
            <div key={status} className="bg-surface-0 rounded-xl shadow-card p-4">
              <p className="text-lg font-semibold text-ink-900">{count}</p>
              <StatusBadge status={status} size="sm" />
            </div>
          );
        })}
      </div>

      <SectionCard noPadding>
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              {["PO #", "Supplier", "Order Date", "Expected", "Line Items", "Total", "Notes", "Status"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {purchaseOrders.map((po) => (
              <tr key={po.id} className="hover:bg-surface-50 transition-colors">
                <td className="px-5 py-3.5">
                  <Link href={`/purchasing/${po.id}`} className="text-sm font-medium text-brand-500 hover:text-brand-600">
                    {po.poNumber}
                  </Link>
                </td>
                <td className="px-5 py-3.5 text-sm text-ink-900">{po.supplier}</td>
                <td className="px-5 py-3.5 text-sm text-ink-500">{formatDate(po.orderDate)}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{formatDate(po.expectedDate)}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{po.lineItems}</td>
                <td className="px-5 py-3.5 text-sm font-medium text-ink-900">{formatCurrency(po.total)}</td>
                <td className="px-5 py-3.5 text-sm text-ink-500 max-w-[200px]">
                  <p className="truncate" title={po.notes}>{po.notes || "—"}</p>
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={po.status} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
