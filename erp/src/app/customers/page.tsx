import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { customers } from "@/lib/mock-data/customers";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function CustomersPage() {
  const totalRevenue = customers.reduce((sum, c) => sum + c.ytdRevenue, 0);

  return (
    <div>
      <PageHeader
        title="Customers"
        subtitle={`${customers.length} accounts · ${formatCurrency(totalRevenue)} YTD revenue`}
        actions={
          <button className="px-3.5 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
            Add Customer
          </button>
        }
      />

      <SectionCard noPadding>
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              {["Company", "Contact", "Location", "Industry", "Active Orders", "YTD Revenue", "Last Order", "Status"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {customers
              .sort((a, b) => b.ytdRevenue - a.ytdRevenue)
              .map((c) => (
                <tr key={c.id} className="hover:bg-surface-50 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5">
                    <Link href={`/customers/${c.id}`} className="text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors">
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-ink-900">{c.contact}</p>
                    <p className="text-xs text-ink-400">{c.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-ink-700 whitespace-nowrap">{c.city}, {c.state}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs bg-surface-100 text-ink-600 px-2 py-0.5 rounded-full font-medium">{c.industry}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-ink-900 font-medium">{c.activeOrders}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-ink-900">{formatCurrency(c.ytdRevenue)}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-500 whitespace-nowrap">{formatDate(c.lastOrder)}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={c.status} size="sm" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
