import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { workOrders, workOrderRoutingSteps } from "@/lib/mock-data/work-orders";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Check, Clock, Circle, ChevronLeft, DollarSign, Package, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WorkOrderDetailPage({ params }: { params: { id: string } }) {
  const wo = workOrders.find((w) => w.id === params.id);
  if (!wo) notFound();

  const totalCost = wo.materialCost + wo.laborCost;
  const estimatedTotal = wo.materialCost + wo.estimatedHours * 80;
  const margin = ((estimatedTotal - totalCost) / estimatedTotal) * 100;

  return (
    <div>
      {/* Back link */}
      <Link
        href="/work-orders"
        className="flex items-center gap-1 text-sm text-ink-400 hover:text-ink-900 mb-4 transition-colors"
      >
        <ChevronLeft size={14} />
        Work Orders
      </Link>

      <PageHeader
        title={wo.woNumber}
        subtitle={`${wo.partName} · ${wo.customer}`}
        actions={
          <div className="flex items-center gap-2">
            <StatusBadge status={wo.status} />
            <button className="px-3.5 py-2 text-sm font-medium border border-surface-200 rounded-lg hover:bg-surface-50 text-ink-700 transition-colors">
              Edit
            </button>
            <button className="px-3.5 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
              Update Status
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Details */}
        <SectionCard title="Job Details" className="col-span-2">
          <div className="grid grid-cols-3 gap-5">
            {[
              { label: "Part Number", value: wo.partNumber },
              { label: "Revision", value: "C" },
              { label: "Quantity", value: `${wo.quantity} pcs` },
              { label: "Priority", value: wo.priority },
              { label: "Start Date", value: formatDate(wo.startDate) },
              { label: "Due Date", value: formatDate(wo.dueDate) },
              { label: "Material", value: "Ti-6Al-4V" },
              { label: "Est. Hours", value: `${wo.estimatedHours} hrs` },
              { label: "Actual Hours", value: `${wo.laborHours} hrs` },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-300 mb-0.5">{label}</p>
                <p className="text-sm font-medium text-ink-900">{value}</p>
              </div>
            ))}
          </div>
          {wo.notes && (
            <div className="mt-5 pt-4 border-t border-surface-100">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-300 mb-1">Notes</p>
              <p className="text-sm text-ink-700">{wo.notes}</p>
            </div>
          )}
        </SectionCard>

        {/* Cost Summary */}
        <div className="space-y-4">
          <SectionCard title="Cost Summary">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-ink-500 flex items-center gap-1.5">
                  <Package size={12} className="text-ink-300" />
                  Material
                </span>
                <span className="text-sm font-medium text-ink-900">{formatCurrency(wo.materialCost)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-ink-500 flex items-center gap-1.5">
                  <Clock size={12} className="text-ink-300" />
                  Labor ({wo.laborHours} hrs)
                </span>
                <span className="text-sm font-medium text-ink-900">{formatCurrency(wo.laborCost)}</span>
              </div>
              <div className="border-t border-surface-100 pt-3 flex justify-between items-center">
                <span className="text-xs font-semibold text-ink-700 flex items-center gap-1.5">
                  <DollarSign size={12} className="text-ink-500" />
                  Total to Date
                </span>
                <span className="text-sm font-semibold text-ink-900">{formatCurrency(totalCost)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-ink-500">Est. Total</span>
                <span className="text-sm text-ink-500">{formatCurrency(estimatedTotal)}</span>
              </div>
              <div className="bg-surface-50 rounded-lg p-3">
                <p className="text-[10px] text-ink-400 mb-0.5">Est. Margin</p>
                <p className={cn("text-lg font-semibold", margin > 0 ? "text-status-green" : "text-status-red")}>
                  {margin.toFixed(1)}%
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Progress">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-ink-500">Completion</span>
                <span className="font-medium text-ink-900">{wo.progress}%</span>
              </div>
              <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all"
                  style={{ width: `${wo.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-ink-400 mt-1">
                <span>{formatDate(wo.startDate)}</span>
                <span>{formatDate(wo.dueDate)}</span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Routing Steps */}
      <SectionCard title="Routing Operations" subtitle="Production flow for this work order">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[17px] top-2 bottom-2 w-0.5 bg-surface-200" />

          <div className="space-y-0">
            {workOrderRoutingSteps.map((step, idx) => {
              const isComplete = step.status === "Complete";
              const isActive = step.status === "In Progress";
              return (
                <div key={step.step} className="flex items-start gap-4 py-3">
                  {/* Step indicator */}
                  <div
                    className={cn(
                      "relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-colors",
                      isComplete
                        ? "bg-brand-500 border-brand-500"
                        : isActive
                        ? "bg-surface-0 border-brand-500"
                        : "bg-surface-0 border-surface-200"
                    )}
                  >
                    {isComplete ? (
                      <Check size={14} className="text-white" />
                    ) : isActive ? (
                      <Clock size={14} className="text-brand-500" />
                    ) : (
                      <Circle size={14} className="text-surface-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p
                          className={cn(
                            "text-sm font-medium",
                            isActive ? "text-brand-500" : isComplete ? "text-ink-900" : "text-ink-400"
                          )}
                        >
                          {step.operation}
                        </p>
                        <p className="text-xs text-ink-400 mt-0.5">
                          {step.machine} · {step.hours} hrs
                        </p>
                      </div>
                      <StatusBadge status={step.status} size="sm" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
