import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { quotes } from "@/lib/mock-data/quoting";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return quotes.map((q) => ({ id: q.id }));
}

export default function QuoteDetailPage({ params }: { params: { id: string } }) {
  const quote = quotes.find((q) => q.id === params.id);

  if (!quote) {
    return (
      <div className="p-6">
        <p className="text-sm text-ink-500">Quote not found.</p>
      </div>
    );
  }

  const totalCost =
    quote.totalMaterial +
    quote.totalLabor +
    quote.totalOutside +
    quote.totalOverhead +
    quote.nreCost;

  const marginColor =
    quote.margin > 25
      ? "text-status-green"
      : quote.margin >= 15
      ? "text-status-yellow"
      : "text-status-red";

  const bomTotal = quote.bom.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="p-6">
      {/* Back link */}
      <div className="mb-4">
        <Link href="/quoting" className="text-sm text-ink-500 hover:text-ink-900 transition-colors">
          ← Back to Quoting
        </Link>
      </div>

      <PageHeader
        title={quote.quoteNumber}
        subtitle={`${quote.customer} · ${quote.partDescription}`}
        actions={
          <>
            <StatusBadge status={quote.status} />
            <button className="inline-flex items-center px-3.5 py-2 text-sm font-medium text-ink-700 border border-surface-200 rounded-lg hover:bg-surface-50 transition-colors">
              Download PDF
            </button>
            <button className="inline-flex items-center px-3.5 py-2 text-sm font-medium bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors">
              Convert to Work Order
            </button>
          </>
        }
      />

      {/* 4 Metadata cards in 2-col grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Card 1: Quote Details */}
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-ink-900 mb-4">Quote Details</h3>
          <dl className="space-y-2.5">
            <div className="flex justify-between text-sm">
              <dt className="text-ink-500">Part Number</dt>
              <dd className="text-ink-900 font-mono text-xs font-medium">{quote.partNumber}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-ink-500">Revision</dt>
              <dd className="text-ink-900 font-medium">{quote.revision}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-ink-500">Lead Time</dt>
              <dd className="text-ink-900 font-medium">{quote.leadTimeDays} days</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-ink-500">Expires Date</dt>
              <dd className="text-ink-900 font-medium">{quote.expiresDate}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-ink-500">Requested Date</dt>
              <dd className="text-ink-900 font-medium">{quote.requestedDate}</dd>
            </div>
          </dl>
        </div>

        {/* Card 2: Cost Summary */}
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-ink-900 mb-4">Cost Summary</h3>
          <dl className="space-y-2.5">
            <div className="flex justify-between text-sm">
              <dt className="text-ink-500">Material</dt>
              <dd className="text-ink-900">{formatCurrency(quote.totalMaterial)}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-ink-500">Labor</dt>
              <dd className="text-ink-900">{formatCurrency(quote.totalLabor)}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-ink-500">Outside Processing</dt>
              <dd className="text-ink-900">{formatCurrency(quote.totalOutside)}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-ink-500">Overhead</dt>
              <dd className="text-ink-900">{formatCurrency(quote.totalOverhead)}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-ink-500">NRE</dt>
              <dd className="text-ink-900">{formatCurrency(quote.nreCost)}</dd>
            </div>
            <div className="flex justify-between text-sm font-semibold border-t border-surface-200 pt-2.5">
              <dt className="text-ink-900">Total</dt>
              <dd className="text-ink-900">{formatCurrency(totalCost)}</dd>
            </div>
          </dl>
        </div>

        {/* Card 3: Margin */}
        <div className="bg-surface-0 rounded-xl shadow-card p-5 flex flex-col items-center justify-center text-center">
          <p className={`text-3xl font-semibold ${marginColor}`}>{quote.margin.toFixed(1)}%</p>
          <p className="text-sm text-ink-500 mt-1">Estimated Margin</p>
        </div>

        {/* Card 4: Customer */}
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-ink-900 mb-4">Customer</h3>
          <dl className="space-y-2.5">
            <div className="flex justify-between text-sm">
              <dt className="text-ink-500">Contact</dt>
              <dd className="text-ink-900 font-medium">{quote.contact}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-ink-500">Company</dt>
              <dd className="text-ink-900 font-medium">{quote.customer}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Tab strip (visual only — all sections shown stacked) */}
      <div className="flex gap-1 mb-4">
        <button className="bg-brand-500 text-white rounded-lg px-4 py-1.5 text-sm font-medium">Quote</button>
        <button className="text-ink-700 rounded-lg px-4 py-1.5 text-sm font-medium hover:bg-surface-100">BOM</button>
        <button className="text-ink-700 rounded-lg px-4 py-1.5 text-sm font-medium hover:bg-surface-100">Notes</button>
        <button className="text-ink-700 rounded-lg px-4 py-1.5 text-sm font-medium hover:bg-surface-100">History</button>
      </div>

      {/* Quote tab: Line Items */}
      <div className="mb-6">
        <SectionCard title="Line Items" noPadding>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200">
                  <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Operation</th>
                  <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Description</th>
                  <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Est. Hours</th>
                  <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Labor Rate</th>
                  <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Overhead</th>
                  <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Outside Processing</th>
                  <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {quote.lineItems.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-5 py-3 text-ink-900 font-medium">{item.operation}</td>
                    <td className="px-5 py-3 text-ink-700">{item.description}</td>
                    <td className="px-5 py-3 text-ink-700 text-right">{item.estHours > 0 ? item.estHours.toFixed(1) : "—"}</td>
                    <td className="px-5 py-3 text-ink-700 text-right">{item.laborRate > 0 ? formatCurrency(item.laborRate) : "—"}</td>
                    <td className="px-5 py-3 text-ink-700 text-right">{item.overhead > 0 ? formatCurrency(item.overhead) : "—"}</td>
                    <td className="px-5 py-3 text-ink-700 text-right">{item.outsideProcessing > 0 ? formatCurrency(item.outsideProcessing) : "—"}</td>
                    <td className="px-5 py-3 text-ink-900 font-medium text-right">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      {/* BOM tab */}
      <div className="mb-6">
        <SectionCard title="Bill of Materials" noPadding>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200">
                  <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Part Number</th>
                  <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Description</th>
                  <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Material</th>
                  <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Qty</th>
                  <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Unit Cost</th>
                  <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {quote.bom.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-5 py-3 text-ink-900 font-mono text-xs font-medium">{item.partNumber}</td>
                    <td className="px-5 py-3 text-ink-700">{item.description}</td>
                    <td className="px-5 py-3 text-ink-500">{item.material}</td>
                    <td className="px-5 py-3 text-ink-700 text-right">{item.qty}</td>
                    <td className="px-5 py-3 text-ink-700 text-right">{formatCurrency(item.unitCost)}</td>
                    <td className="px-5 py-3 text-ink-900 font-medium text-right">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-surface-200 bg-surface-50">
                  <td colSpan={5} className="px-5 py-3 text-sm font-semibold text-ink-900">Total</td>
                  <td className="px-5 py-3 text-sm font-semibold text-ink-900 text-right">{formatCurrency(bomTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      {/* Notes tab */}
      <div className="mb-6">
        <SectionCard title="Notes">
          <p className="text-sm text-ink-700 leading-relaxed">{quote.notes}</p>
        </SectionCard>
      </div>

      {/* History tab */}
      <div className="mb-6">
        <SectionCard title="History">
          <ul className="space-y-3">
            {quote.history.map((entry, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm">
                <span className="text-ink-400 whitespace-nowrap">{entry.date}</span>
                <span className="text-ink-500 whitespace-nowrap">{entry.user}</span>
                <span className="text-ink-700">{entry.action}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
