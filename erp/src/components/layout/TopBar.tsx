"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, Plus } from "lucide-react";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/work-orders": "Work Orders",
  "/work-orders/new": "New Work Order",
  "/scheduling": "Scheduling",
  "/parts": "Parts & Routings",
  "/inventory": "Inventory",
  "/quality": "Quality",
  "/quality/ncr": "Non-Conformance Reports",
  "/quality/inspections": "Inspections",
  "/quality/documents": "Documents",
  "/purchasing": "Purchasing",
  "/customers": "Customers",
  "/employees": "Employees",
  "/reports": "Reports",
};

function getBreadcrumb(pathname: string): { parent: string | null; current: string } {
  if (breadcrumbMap[pathname]) {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length > 1) {
      const parentPath = "/" + parts.slice(0, -1).join("/");
      return {
        parent: breadcrumbMap[parentPath] || null,
        current: breadcrumbMap[pathname],
      };
    }
    return { parent: null, current: breadcrumbMap[pathname] };
  }
  // Dynamic routes
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 2) {
    const parentPath = "/" + parts[0];
    return {
      parent: breadcrumbMap[parentPath] || null,
      current: `#${parts[1].toUpperCase()}`,
    };
  }
  return { parent: null, current: "Page" };
}

export function TopBar() {
  const pathname = usePathname();
  const { parent, current } = getBreadcrumb(pathname);

  return (
    <header className="fixed top-0 left-60 right-0 h-14 bg-surface-0 border-b border-surface-200 flex items-center justify-between px-6 z-30">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm">
        {parent && (
          <>
            <span className="text-ink-300">{parent}</span>
            <span className="text-ink-300">/</span>
          </>
        )}
        <span className="font-medium text-ink-900">{current}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="flex items-center gap-2 bg-surface-50 border border-surface-200 rounded-lg px-3 py-1.5 w-56 cursor-text hover:border-surface-300 transition-colors duration-150">
          <Search size={14} className="text-ink-300 flex-shrink-0" />
          <span className="text-sm text-ink-300">Search...</span>
          <span className="ml-auto text-[10px] text-ink-300 bg-surface-200 px-1 py-0.5 rounded font-mono">⌘K</span>
        </div>

        {/* New button */}
        <button className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-150">
          <Plus size={15} />
          New
        </button>

        {/* Bell */}
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-50 text-ink-500 transition-colors duration-150">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-status-red rounded-full" />
        </button>
      </div>
    </header>
  );
}
