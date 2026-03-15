"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { workOrders, WorkOrderStatus } from "@/lib/mock-data/work-orders";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Search, Plus, ArrowUpDown, Filter } from "lucide-react";

const statusFilters: (WorkOrderStatus | "All")[] = [
  "All", "Open", "In Progress", "On Hold", "Overdue", "Complete",
];

const priorityColor: Record<string, string> = {
  Low: "text-ink-400",
  Medium: "text-status-yellow",
  High: "text-orange-500",
  Critical: "text-status-red",
};

export default function WorkOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<WorkOrderStatus | "All">("All");
  const [sortField, setSortField] = useState<string>("dueDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = workOrders
    .filter((wo) => {
      const matchSearch =
        wo.woNumber.toLowerCase().includes(search.toLowerCase()) ||
        wo.partName.toLowerCase().includes(search.toLowerCase()) ||
        wo.customer.toLowerCase().includes(search.toLowerCase()) ||
        wo.partNumber.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || wo.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      const av = a[sortField as keyof typeof a] as string | number;
      const bv = b[sortField as keyof typeof b] as string | number;
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }: { field: string }) => (
    <ArrowUpDown
      size={11}
      className={sortField === field ? "text-brand-500" : "text-ink-300"}
    />
  );

  return (
    <div>
      <PageHeader
        title="Work Orders"
        subtitle={`${filtered.length} of ${workOrders.length} orders`}
        actions={
          <Link
            href="/work-orders/new"
            className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors duration-150"
          >
            <Plus size={15} />
            New Work Order
          </Link>
        }
      />

      <SectionCard noPadding>
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-surface-200">
          {/* Search */}
          <div className="flex items-center gap-2 bg-surface-50 border border-surface-200 rounded-lg px-3 py-1.5 flex-1 max-w-xs">
            <Search size={13} className="text-ink-300 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="bg-transparent text-sm text-ink-900 placeholder-ink-300 outline-none flex-1 min-w-0"
            />
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="text-ink-300" />
            {statusFilters.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors duration-150 ${
                  statusFilter === s
                    ? "bg-brand-500 text-white"
                    : "text-ink-500 hover:bg-surface-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100">
                {[
                  { label: "WO #", field: "woNumber" },
                  { label: "Part", field: "partName" },
                  { label: "Customer", field: "customer" },
                  { label: "Qty", field: "quantity" },
                  { label: "Priority", field: "priority" },
                  { label: "Due Date", field: "dueDate" },
                  { label: "Progress", field: "progress" },
                  { label: "Status", field: "status" },
                  { label: "Value", field: "materialCost" },
                ].map(({ label, field }) => (
                  <th
                    key={field}
                    onClick={() => toggleSort(field)}
                    className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 cursor-pointer hover:text-ink-500 transition-colors whitespace-nowrap"
                  >
                    <span className="flex items-center gap-1">
                      {label} <SortIcon field={field} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-16 text-sm text-ink-400">
                    No work orders match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((wo) => (
                  <tr
                    key={wo.id}
                    className="hover:bg-surface-50 transition-colors cursor-pointer group"
                  >
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/work-orders/${wo.id}`}
                        className="text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors"
                      >
                        {wo.woNumber}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="text-sm text-ink-900 leading-snug truncate max-w-[200px]">
                          {wo.partName}
                        </p>
                        <p className="text-xs text-ink-400">{wo.partNumber}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-ink-700 whitespace-nowrap">{wo.customer}</td>
                    <td className="px-5 py-3.5 text-sm text-ink-700">{wo.quantity}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold ${priorityColor[wo.priority]}`}>
                        {wo.priority}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-ink-700 whitespace-nowrap">{formatDate(wo.dueDate)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 min-w-[80px]">
                        <div className="flex-1 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-brand-500"
                            style={{ width: `${wo.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-ink-400 w-7 text-right">{wo.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={wo.status} size="sm" />
                    </td>
                    <td className="px-5 py-3.5 text-sm text-ink-700 whitespace-nowrap text-right">
                      {formatCurrency(wo.materialCost + wo.laborCost)}
                    </td>
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
