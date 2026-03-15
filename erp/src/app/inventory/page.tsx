"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { materials, tools } from "@/lib/mock-data/inventory";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

const tabs = ["Materials", "Tooling", "Finished Goods"];

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState(0);

  const lowStockMaterials = materials.filter((m) => m.onHand <= m.minStock);
  const lowStockTools = tools.filter((t) => t.quantity <= t.minQty);

  return (
    <div>
      <PageHeader
        title="Inventory"
        subtitle="Stock levels, materials, and tooling"
        actions={
          <button className="px-3.5 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
            Receive Inventory
          </button>
        }
      />

      {/* Low stock alerts */}
      {(lowStockMaterials.length > 0 || lowStockTools.length > 0) && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
          <AlertTriangle size={15} className="text-status-red flex-shrink-0" />
          <p className="text-sm text-red-700 font-medium">
            {lowStockMaterials.length} material{lowStockMaterials.length !== 1 ? "s" : ""} and{" "}
            {lowStockTools.length} tool{lowStockTools.length !== 1 ? "s" : ""} below minimum stock level.
          </p>
          <button className="ml-auto text-xs font-medium text-status-red hover:underline">
            View all
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-surface-200 mb-5">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === i
                ? "border-brand-500 text-brand-500"
                : "border-transparent text-ink-500 hover:text-ink-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 && (
        <SectionCard title="Raw Materials" noPadding>
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100">
                {["Part #", "Description", "Type", "On Hand", "Min Stock", "Unit Cost", "Supplier", "Location", "Last Received"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {materials.map((m) => {
                const lowStock = m.onHand <= m.minStock;
                return (
                  <tr key={m.id} className={cn("hover:bg-surface-50 transition-colors", lowStock && "bg-red-50/50")}>
                    <td className="px-5 py-3.5 text-sm font-medium text-ink-900 whitespace-nowrap">{m.partNumber}</td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-ink-900 max-w-[200px] truncate">{m.description}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs bg-surface-100 text-ink-600 px-2 py-0.5 rounded-full font-medium">{m.type}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("text-sm font-semibold", lowStock ? "text-status-red" : "text-ink-900")}>
                        {m.onHand} {m.unit}
                      </span>
                      {lowStock && <AlertTriangle size={11} className="inline ml-1 text-status-red" />}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-ink-500">{m.minStock} {m.unit}</td>
                    <td className="px-5 py-3.5 text-sm text-ink-700">{formatCurrency(m.unitCost)}</td>
                    <td className="px-5 py-3.5 text-sm text-ink-700 whitespace-nowrap">{m.supplier}</td>
                    <td className="px-5 py-3.5 text-sm text-ink-500">{m.location}</td>
                    <td className="px-5 py-3.5 text-sm text-ink-500 whitespace-nowrap">{formatDate(m.lastReceived)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </SectionCard>
      )}

      {activeTab === 1 && (
        <SectionCard title="Tooling Inventory" noPadding>
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100">
                {["Tool #", "Description", "Diameter", "Material", "Qty", "Min Qty", "Location", "Last Used", "Life Remaining"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {tools.map((t) => {
                const lowStock = t.quantity <= t.minQty;
                return (
                  <tr key={t.id} className={cn("hover:bg-surface-50 transition-colors", lowStock && "bg-red-50/50")}>
                    <td className="px-5 py-3.5 text-sm font-medium text-ink-900">{t.toolNumber}</td>
                    <td className="px-5 py-3.5 text-sm text-ink-900 max-w-[200px] truncate">{t.description}</td>
                    <td className="px-5 py-3.5 text-sm text-ink-700">{t.diameter}</td>
                    <td className="px-5 py-3.5 text-sm text-ink-700">{t.material}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("text-sm font-semibold", lowStock ? "text-status-red" : "text-ink-900")}>
                        {t.quantity}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-ink-500">{t.minQty}</td>
                    <td className="px-5 py-3.5 text-sm text-ink-700">{t.location}</td>
                    <td className="px-5 py-3.5 text-sm text-ink-500 whitespace-nowrap">{formatDate(t.lastUsed)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              t.lifeRemaining > 60 ? "bg-status-green" :
                              t.lifeRemaining > 30 ? "bg-status-yellow" : "bg-status-red"
                            )}
                            style={{ width: `${t.lifeRemaining}%` }}
                          />
                        </div>
                        <span className="text-xs text-ink-500">{t.lifeRemaining}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </SectionCard>
      )}

      {activeTab === 2 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-12 h-12 bg-surface-100 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-2xl">📦</span>
          </div>
          <p className="text-sm font-medium text-ink-900 mb-1">No finished goods tracked</p>
          <p className="text-sm text-ink-400">Parts are shipped directly upon completion.</p>
        </div>
      )}
    </div>
  );
}
