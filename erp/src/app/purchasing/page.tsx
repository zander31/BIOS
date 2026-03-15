import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { purchaseOrders, suppliers } from "@/lib/mock-data/purchasing";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Plus, AlertTriangle, ShoppingCart, TrendingUp, Star } from "lucide-react";

const total = purchaseOrders.reduce((sum, po) => sum + po.total, 0);
const openPOs = purchaseOrders.filter((po) => !["Complete", "Cancelled"].includes(po.status));
const latePOs = purchaseOrders.filter((po) => {
  return !["Complete", "Cancelled"].includes(po.status) && new Date(po.expectedDate) < new Date("2024-03-20");
});

// Live requirements derived from active work orders (mock)
const liveRequirements = [
  { part: "Ti-6Al-4V Bar 2.5\" Sq", description: "WO-2024-0891 — Actuator Housing", qtyNeeded: 2, needDate: "2024-03-25", onHand: 0, shortage: 2, supplier: "Titanium Industries" },
  { part: "Inconel 625 Bar 3\" Dia", description: "WO-2024-0895 — Thruster Nozzle", qtyNeeded: 3, needDate: "2024-04-05", onHand: 1, shortage: 2, supplier: "Service Center East" },
  { part: "17-4 PH SS Bar 1.5\" Dia", description: "WO-2024-0892 — Implant Trial × 50", qtyNeeded: 12, needDate: "2024-03-28", onHand: 8, shortage: 4, supplier: "Metals Direct" },
  { part: "Invar 36 Block 6×6×4\"", description: "WO-2024-0893 — Optical Mount", qtyNeeded: 1, needDate: "2024-04-10", onHand: 0, shortage: 1, supplier: "Industrial Steel Supply" },
  { part: "A380 Aluminum Cast Blank", description: "WO-2024-0897 — Valve Body × 100", qtyNeeded: 25, needDate: "2024-04-01", onHand: 22, shortage: 3, supplier: "Metals Direct" },
  { part: "TiAlN Endmill 1/2\" 4-Flute", description: "Tool replenishment — below min qty", qtyNeeded: 4, needDate: "2024-03-22", onHand: 1, shortage: 3, supplier: "Kennametal" },
];

// Shopping cart mock
const cartItems = [
  { part: "Ti-6Al-4V Bar 2.5\" Sq", qty: 2, unitCost: 420, total: 840, supplier: "Titanium Industries" },
  { part: "Inconel 625 Bar 3\" Dia", qty: 2, unitCost: 980, total: 1960, supplier: "Service Center East" },
];

export default function PurchasingPage() {
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

      {/* Tab strip */}
      <div className="flex gap-1 mb-4 bg-surface-100 p-1 rounded-xl w-fit">
        {["Purchase Orders", "Purchasing Dashboard"].map((tab, i) => (
          <div
            key={tab}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all ${
              i === 0 ? "bg-surface-0 text-ink-900 shadow-sm" : "text-ink-500 hover:text-ink-700"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* PO List */}
      <SectionCard noPadding className="mb-6">
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
            {purchaseOrders.map((po) => {
              const isLate = !["Complete", "Cancelled"].includes(po.status) && new Date(po.expectedDate) < new Date("2024-03-20");
              return (
                <tr key={po.id} className={`hover:bg-surface-50 transition-colors ${isLate ? "bg-red-50/20" : ""}`}>
                  <td className="px-5 py-3.5">
                    <Link href={`/purchasing/${po.id}`} className="text-sm font-medium text-brand-500 hover:text-brand-600">
                      {po.poNumber}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-ink-900">{po.supplier}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-500">{formatDate(po.orderDate)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm ${isLate ? "text-status-red font-medium" : "text-ink-700"}`}>
                      {isLate && <AlertTriangle size={11} className="inline mr-1" />}
                      {formatDate(po.expectedDate)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-ink-700">{po.lineItems}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-ink-900">{formatCurrency(po.total)}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-500 max-w-[200px]">
                    <p className="truncate" title={po.notes}>{po.notes || "—"}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={po.status} size="sm" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </SectionCard>

      {/* Purchasing Dashboard Section */}
      <div className="pt-2 border-t border-surface-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-ink-900">Purchasing Dashboard</h2>
            <p className="text-sm text-ink-500">Live requirements from active work orders</p>
          </div>
          {latePOs.length > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle size={14} className="text-status-red" />
              <span className="text-xs font-medium text-red-700">{latePOs.length} late PO{latePOs.length > 1 ? "s" : ""}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Live Requirements — 2/3 width */}
          <div className="col-span-2 space-y-4">
            <SectionCard title="Live Material Requirements" subtitle="Shortages across active work orders" noPadding>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-100">
                    {["Part / Description", "Need Date", "On Hand", "Shortage", "Suggested Supplier", "Action"].map((h) => (
                      <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {liveRequirements.map((req) => (
                    <tr key={req.part} className="hover:bg-surface-50 transition-colors">
                      <td className="px-5 py-3">
                        <p className="text-sm font-medium text-ink-900">{req.part}</p>
                        <p className="text-[10px] text-ink-400">{req.description}</p>
                      </td>
                      <td className="px-5 py-3 text-sm text-ink-700">{formatDate(req.needDate)}</td>
                      <td className="px-5 py-3 text-sm text-ink-900">{req.onHand}</td>
                      <td className="px-5 py-3">
                        <span className="text-sm font-semibold text-status-red">{req.shortage}</span>
                      </td>
                      <td className="px-5 py-3 text-sm text-ink-700">{req.supplier}</td>
                      <td className="px-5 py-3">
                        <button className="text-xs text-brand-500 font-medium border border-brand-200 rounded px-2 py-1 hover:bg-brand-50 transition-colors flex items-center gap-1">
                          <ShoppingCart size={11} />
                          Add to Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SectionCard>

            {/* Supplier Performance */}
            <SectionCard title="Supplier Performance" noPadding>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-100">
                    {["Supplier", "On-Time Rate", "Quality Rating", "Lead Time", "Open POs"].map((h) => (
                      <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {suppliers.map((s) => {
                    const openCount = purchaseOrders.filter((po) => po.supplier === s.name && !["Complete", "Cancelled"].includes(po.status)).length;
                    return (
                      <tr key={s.id} className="hover:bg-surface-50 transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="text-sm font-medium text-ink-900">{s.name}</p>
                          <p className="text-[10px] text-ink-400">{s.contact}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${s.onTimeRate >= 95 ? "bg-status-green" : s.onTimeRate >= 85 ? "bg-status-yellow" : "bg-status-red"}`}
                                style={{ width: `${s.onTimeRate}%` }}
                              />
                            </div>
                            <span className={`text-xs font-medium ${s.onTimeRate >= 95 ? "text-status-green" : s.onTimeRate >= 85 ? "text-status-yellow" : "text-status-red"}`}>
                              {s.onTimeRate}%
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1">
                            <Star size={11} className="text-status-yellow fill-status-yellow" />
                            <span className="text-sm text-ink-900">{s.rating}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-sm text-ink-700">{s.leadTime}</td>
                        <td className="px-5 py-3.5 text-sm text-ink-700">{openCount || "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </SectionCard>
          </div>

          {/* Shopping Cart — 1/3 width */}
          <div>
            <SectionCard title="Shopping Cart" subtitle={`${cartItems.length} items staged`}>
              <div className="space-y-3 mb-4">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 py-2 border-b border-surface-100 last:border-0 last:pb-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-ink-900 truncate">{item.part}</p>
                      <p className="text-[10px] text-ink-400">{item.supplier}</p>
                      <p className="text-[10px] text-ink-500 mt-0.5">Qty: {item.qty} × {formatCurrency(item.unitCost)}</p>
                    </div>
                    <p className="text-xs font-semibold text-ink-900 flex-shrink-0">{formatCurrency(item.total)}</p>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-surface-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-ink-500">Est. Total</span>
                  <span className="text-sm font-semibold text-ink-900">
                    {formatCurrency(cartItems.reduce((s, i) => s + i.total, 0))}
                  </span>
                </div>
                <button className="w-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <TrendingUp size={14} />
                  Issue POs
                </button>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
