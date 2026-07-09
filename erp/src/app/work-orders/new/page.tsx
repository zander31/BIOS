"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { ChevronLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Job Info" },
  { id: 2, label: "Part & Routing" },
  { id: 3, label: "Scheduling" },
  { id: 4, label: "Review" },
];

export default function NewWorkOrderPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [form, setForm] = useState({
    customer: "",
    partNumber: "",
    quantity: "",
    priority: "Medium",
    dueDate: "",
    startDate: "",
    notes: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/work-orders" className="flex items-center gap-1 text-sm text-ink-400 hover:text-ink-900 mb-4 transition-colors">
        <ChevronLeft size={14} />
        Work Orders
      </Link>

      <PageHeader title="New Work Order" subtitle="Create a new production job" />

      {/* Step indicators */}
      <div className="flex items-center gap-0 mb-6">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center flex-1">
            <button
              onClick={() => step.id < currentStep && setCurrentStep(step.id)}
              className="flex items-center gap-2 group"
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
                  step.id < currentStep
                    ? "bg-brand-500 text-white"
                    : step.id === currentStep
                    ? "bg-brand-500 text-white ring-4 ring-brand-100"
                    : "bg-surface-200 text-ink-400"
                )}
              >
                {step.id < currentStep ? <Check size={12} /> : step.id}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  step.id === currentStep ? "text-ink-900" : "text-ink-400"
                )}
              >
                {step.label}
              </span>
            </button>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-3",
                  step.id < currentStep ? "bg-brand-500" : "bg-surface-200"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      {currentStep === 1 && (
        <SectionCard title="Job Information">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-ink-700 mb-1.5">Customer *</label>
              <input
                value={form.customer}
                onChange={(e) => update("customer", e.target.value)}
                placeholder="Select or type customer name"
                className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => update("priority", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all bg-white"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">Quantity *</label>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) => update("quantity", e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">Start Date *</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">Due Date *</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => update("dueDate", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-ink-700 mb-1.5">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={3}
                placeholder="Any special instructions or notes..."
                className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none"
              />
            </div>
          </div>
        </SectionCard>
      )}

      {currentStep === 2 && (
        <SectionCard title="Part & Routing">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">Part Number *</label>
              <input
                value={form.partNumber}
                onChange={(e) => update("partNumber", e.target.value)}
                placeholder="e.g. MED-4521-A"
                className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">Revision</label>
              <input
                placeholder="A"
                className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-ink-700 mb-1.5">Routing Template</label>
              <select className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all bg-white">
                <option>— Select existing routing —</option>
                <option>Standard 5-op Machined Part</option>
                <option>Turning + Mill + Inspect</option>
                <option>Complex Multi-Axis (7 ops)</option>
              </select>
            </div>
          </div>
          <div className="mt-5 p-4 bg-surface-50 rounded-lg border border-surface-200">
            <p className="text-xs font-semibold text-ink-700 mb-3">Routing Operations</p>
            <div className="space-y-2 text-xs text-ink-500">
              <p>Select a routing template above, or add operations manually after creation.</p>
            </div>
          </div>
        </SectionCard>
      )}

      {currentStep === 3 && (
        <SectionCard title="Scheduling">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">Primary Machine</label>
              <select className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all bg-white">
                <option>Auto-assign</option>
                <option>Haas ST-30</option>
                <option>Haas UMC-500</option>
                <option>Haas VF-4SS</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-700 mb-1.5">Operator</label>
              <select className="w-full px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all bg-white">
                <option>Auto-assign</option>
                <option>M. Chen</option>
                <option>V. Patel</option>
                <option>D. Mills</option>
                <option>A. Foster</option>
              </select>
            </div>
          </div>
          <div className="mt-4 p-4 bg-brand-50 rounded-lg border border-brand-100">
            <p className="text-xs font-semibold text-brand-600 mb-1">Capacity Check</p>
            <p className="text-xs text-brand-500">Haas UMC-500 has available capacity starting March 22. Auto-scheduling will insert this job at the optimal slot.</p>
          </div>
        </SectionCard>
      )}

      {currentStep === 4 && (
        <SectionCard title="Review & Create">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Customer", value: form.customer || "—" },
                { label: "Priority", value: form.priority },
                { label: "Part Number", value: form.partNumber || "—" },
                { label: "Quantity", value: form.quantity || "—" },
                { label: "Start Date", value: form.startDate || "—" },
                { label: "Due Date", value: form.dueDate || "—" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-surface-50 rounded-lg px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-300 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-ink-900">{value}</p>
                </div>
              ))}
            </div>
            {form.notes && (
              <div className="bg-surface-50 rounded-lg px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-300 mb-0.5">Notes</p>
                <p className="text-sm text-ink-700">{form.notes}</p>
              </div>
            )}
            <div className="bg-brand-50 rounded-lg px-4 py-3 border border-brand-100">
              <p className="text-xs text-brand-600">
                A work order number will be auto-generated (e.g. WO-2024-0901) upon creation.
              </p>
            </div>
          </div>
        </SectionCard>
      )}

      {/* Nav buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
          disabled={currentStep === 1}
          className="px-4 py-2 text-sm font-medium border border-surface-200 rounded-lg text-ink-700 hover:bg-surface-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={() => {
            if (currentStep < steps.length) {
              setCurrentStep((s) => s + 1);
            }
          }}
          className="px-4 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
        >
          {currentStep === steps.length ? "Create Work Order" : "Continue"}
        </button>
      </div>
    </div>
  );
}
