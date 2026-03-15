import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Mail, Phone, MapPin } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { customers } from "@/lib/mock-data/customers";
import { workOrders } from "@/lib/mock-data/work-orders";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customer = customers.find((c) => c.id === params.id);
  if (!customer) notFound();
  const customerOrders = workOrders.filter((wo) => wo.customer === customer.name);

  return (
    <div>
      <Link href="/customers" className="flex items-center gap-1 text-sm text-ink-400 hover:text-ink-900 mb-4 transition-colors">
        <ChevronLeft size={14} />
        Customers
      </Link>
      <PageHeader
        title={customer.name}
        subtitle={`${customer.industry} · ${customer.city}, ${customer.state}`}
        actions={<StatusBadge status={customer.status} />}
      />

      <div className="grid grid-cols-3 gap-4 mb-4">
        <SectionCard title="Contact Information">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-brand-500">
                  {customer.contact.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-ink-900">{customer.contact}</p>
                <p className="text-xs text-ink-400">Primary Contact</p>
              </div>
            </div>
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs text-ink-700">
                <Mail size={12} className="text-ink-300" />
                {customer.email}
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-700">
                <Phone size={12} className="text-ink-300" />
                {customer.phone}
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-700">
                <MapPin size={12} className="text-ink-300" />
                {customer.city}, {customer.state}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Account Summary">
          <div className="space-y-3">
            {[
              { label: "YTD Revenue", value: formatCurrency(customer.ytdRevenue) },
              { label: "Active Orders", value: customer.activeOrders },
              { label: "Industry", value: customer.industry },
              { label: "Last Order", value: formatDate(customer.lastOrder) },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center border-b border-surface-100 pb-2 last:border-0 last:pb-0">
                <span className="text-xs text-ink-500">{label}</span>
                <span className="text-sm font-semibold text-ink-900">{value}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="bg-surface-0 rounded-xl shadow-card p-5 flex flex-col items-center justify-center text-center">
          <div className="text-3xl font-bold text-ink-900 mb-1">{formatCurrency(customer.ytdRevenue)}</div>
          <p className="text-xs text-ink-400 mb-3">YTD Revenue</p>
          <div className="w-full h-1.5 bg-surface-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-500"
              style={{ width: `${Math.min(100, (customer.ytdRevenue / 320000) * 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-ink-300 mt-1.5">vs. top customer ($315K)</p>
        </div>
      </div>

      <SectionCard title="Work Orders" noPadding>
        {customerOrders.length === 0 ? (
          <div className="text-center py-10 text-sm text-ink-400">No work orders for this customer.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100">
                {["WO #", "Part", "Qty", "Due Date", "Progress", "Status"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {customerOrders.map((wo) => (
                <tr key={wo.id} className="hover:bg-surface-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <Link href={`/work-orders/${wo.id}`} className="text-sm font-medium text-brand-500 hover:text-brand-600">
                      {wo.woNumber}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-ink-900">{wo.partName}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-700">{wo.quantity}</td>
                  <td className="px-5 py-3.5 text-sm text-ink-700">{formatDate(wo.dueDate)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-brand-500" style={{ width: `${wo.progress}%` }} />
                      </div>
                      <span className="text-xs text-ink-400">{wo.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={wo.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SectionCard>
    </div>
  );
}
