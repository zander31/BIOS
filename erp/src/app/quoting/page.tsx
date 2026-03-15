import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { quotes } from "@/lib/mock-data/quoting";
import { formatCurrency } from "@/lib/utils";

export default function QuotingPage() {
  const draftCount = quotes.filter((q) => q.status === "Draft").length;
  const sentCount = quotes.filter((q) => q.status === "Sent").length;
  const wonCount = quotes.filter((q) => q.status === "Won").length;
  const lostCount = quotes.filter((q) => q.status === "Lost").length;

  return (
    <div className="p-6">
      <PageHeader
        title="Quoting"
        subtitle="Estimates & customer quotes"
        actions={
          <Link
            href="/quoting/new"
            className="inline-flex items-center gap-1.5 bg-brand-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors"
          >
            + New Quote
          </Link>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs text-ink-500 font-medium uppercase tracking-wide mb-1">Draft</p>
          <p className="text-3xl font-semibold text-blue-600">{draftCount}</p>
        </div>
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs text-ink-500 font-medium uppercase tracking-wide mb-1">Sent</p>
          <p className="text-3xl font-semibold text-yellow-600">{sentCount}</p>
        </div>
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs text-ink-500 font-medium uppercase tracking-wide mb-1">Won</p>
          <p className="text-3xl font-semibold text-emerald-600">{wonCount}</p>
        </div>
        <div className="bg-surface-0 rounded-xl shadow-card p-5">
          <p className="text-xs text-ink-500 font-medium uppercase tracking-wide mb-1">Lost</p>
          <p className="text-3xl font-semibold text-red-600">{lostCount}</p>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-1 mb-4">
        <button className="bg-brand-500 text-white rounded-lg px-3 py-1.5 text-sm font-medium">All</button>
        <button className="text-ink-700 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-surface-100">Draft</button>
        <button className="text-ink-700 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-surface-100">Sent</button>
        <button className="text-ink-700 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-surface-100">Won</button>
        <button className="text-ink-700 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-surface-100">Lost</button>
        <button className="text-ink-700 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-surface-100">Expired</button>
      </div>

      {/* Quotes Table */}
      <SectionCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-200">
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Quote #</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Customer</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Part Number</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Description</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Quantities</th>
                <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Est. Total</th>
                <th className="text-right text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Margin %</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Rev Date</th>
                <th className="text-left text-xs font-semibold text-ink-500 uppercase tracking-wide px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {quotes.map((quote) => {
                const estTotal =
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

                return (
                  <tr key={quote.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-5 py-3">
                      <Link
                        href={`/quoting/${quote.id}`}
                        className="text-brand-500 font-medium hover:underline"
                      >
                        {quote.quoteNumber}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-ink-700">{quote.customer}</td>
                    <td className="px-5 py-3 text-ink-700 font-mono text-xs">{quote.partNumber}</td>
                    <td className="px-5 py-3 text-ink-700 max-w-[200px] truncate">{quote.partDescription}</td>
                    <td className="px-5 py-3 text-ink-500">{quote.quantities.join(" / ")}</td>
                    <td className="px-5 py-3 text-ink-700 text-right">{formatCurrency(estTotal)}</td>
                    <td className={`px-5 py-3 text-right font-medium ${marginColor}`}>
                      {quote.margin.toFixed(1)}%
                    </td>
                    <td className="px-5 py-3 text-ink-500">{quote.requestedDate}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={quote.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
