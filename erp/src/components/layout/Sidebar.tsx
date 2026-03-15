"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Package,
  Boxes,
  ShieldCheck,
  ShoppingCart,
  Users,
  Clock,
  BarChart3,
  Settings,
  ChevronRight,
  FileText,
  MonitorSpeaker,
  Wrench,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Production",
    items: [
      { label: "Work Orders", href: "/work-orders", icon: ClipboardList },
      { label: "Scheduling", href: "/scheduling", icon: Calendar },
      { label: "Parts & Routings", href: "/parts", icon: Package },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Inventory", href: "/inventory", icon: Boxes },
      { label: "Quality", href: "/quality", icon: ShieldCheck },
      { label: "Purchasing", href: "/purchasing", icon: ShoppingCart },
    ],
  },
  {
    label: "Shop Floor",
    items: [
      { label: "Quoting", href: "/quoting", icon: FileText },
      { label: "Shop Floor", href: "/shop-floor", icon: MonitorSpeaker },
      { label: "Tooling", href: "/tooling", icon: Wrench },
      { label: "Maintenance", href: "/maintenance", icon: Activity },
    ],
  },
  {
    label: "People & Finance",
    items: [
      { label: "Customers", href: "/customers", icon: Users },
      { label: "Employees", href: "/employees", icon: Clock },
      { label: "Reports", href: "/reports", icon: BarChart3 },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-surface-0 border-r border-surface-200 flex flex-col z-40">
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b border-surface-200">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">B</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-ink-900">BIOS</span>
            <span className="text-sm font-normal text-ink-500"> ERP</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-300 px-2 mb-1.5">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150",
                        active
                          ? "bg-brand-50 text-brand-500 font-medium"
                          : "text-ink-500 hover:bg-surface-50 hover:text-ink-900"
                      )}
                    >
                      <Icon
                        size={16}
                        className={active ? "text-brand-500" : "text-ink-300"}
                      />
                      {item.label}
                      {active && (
                        <ChevronRight
                          size={12}
                          className="ml-auto text-brand-500 opacity-60"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-surface-200 px-3 py-3">
        <Link
          href="/settings"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-ink-500 hover:bg-surface-50 hover:text-ink-900 transition-all duration-150"
        >
          <Settings size={16} className="text-ink-300" />
          Settings
        </Link>
        <div className="flex items-center gap-2.5 px-2.5 py-2 mt-1">
          <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">CB</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-ink-900 truncate">Carey Bryant</p>
            <p className="text-[10px] text-ink-300 truncate">CEO</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
