import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";

const steps = [
  { number: 1, label: "Customer & Part" },
  { number: 2, label: "Operations" },
  { number: 3, label: "Materials / BOM" },
  { number: 4, label: "Pricing" },
  { number: 5, label: "Review & Send" },
];

export default function NewQuotePage() {
  return (
    <div className="p-6">
      <PageHeader
        title="New Quote"
        subtitle="Create an estimate and quote"
        actions={
          <Link
            href="/quoting"
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900 transition-colors"
          >
            ← Back to Quoting
          </Link>
        }
      />

      {/* Step Indicator */}
      <div className="flex items-center gap-0 mb-8">
        {steps.map((step, idx) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step.number === 1
                    ? "bg-brand-500 text-white"
                    : "bg-surface-200 text-ink-500"
                }`}
              >
                {step.number}
              </div>
              <span
                className={`mt-1.5 text-xs font-medium whitespace-nowrap ${
                  step.number === 1 ? "text-brand-500" : "text-ink-500"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className="w-16 h-px bg-surface-200 mx-2 mb-5" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 Form */}
      <SectionCard title="Step 1: Customer & Part">
        <div className="grid grid-cols-2 gap-5">
          {/* Customer */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-700 uppercase tracking-wide">
              Customer
            </label>
            <select className="border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option value="">Select customer...</option>
              <option>Aerospace Dynamics</option>
              <option>MedTech Solutions</option>
              <option>Precision Robotics</option>
              <option>Defense Systems Group</option>
              <option>SpaceTech Industries</option>
            </select>
          </div>

          {/* Part Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-700 uppercase tracking-wide">
              Part Number
            </label>
            <input
              type="text"
              placeholder="e.g. AD-7841-C"
              className="border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Part Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-700 uppercase tracking-wide">
              Part Description
            </label>
            <input
              type="text"
              placeholder="e.g. Actuator Housing — Titanium"
              className="border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Revision */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-700 uppercase tracking-wide">
              Revision
            </label>
            <input
              type="text"
              placeholder="e.g. A"
              className="border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Quantities */}
          <div className="col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-700 uppercase tracking-wide">
              Quantities
            </label>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-xs text-ink-500">Qty 1</span>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  className="border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-xs text-ink-500">Qty 2</span>
                <input
                  type="number"
                  placeholder="e.g. 10"
                  className="border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-xs text-ink-500">Qty 3</span>
                <input
                  type="number"
                  placeholder="e.g. 25"
                  className="border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Requested Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-700 uppercase tracking-wide">
              Requested Date
            </label>
            <input
              type="date"
              className="border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Lead Time */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-700 uppercase tracking-wide">
              Lead Time (days)
            </label>
            <input
              type="number"
              placeholder="e.g. 35"
              className="border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Notes */}
          <div className="col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-700 uppercase tracking-wide">
              Notes
            </label>
            <textarea
              rows={4}
              placeholder="Any special requirements, certifications, or notes..."
              className="border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-surface-200">
          <Link
            href="/quoting"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-ink-700 border border-surface-200 rounded-lg hover:bg-surface-50 transition-colors"
          >
            Cancel
          </Link>
          <button className="inline-flex items-center gap-1.5 bg-brand-500 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-brand-600 transition-colors">
            Next Step →
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
