import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { workOrders, workOrderRoutingSteps } from "@/lib/mock-data/work-orders";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Check, Clock, Circle, ChevronLeft, DollarSign, Package, AlertTriangle, FileText, ImageIcon, Wrench, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return workOrders.map((wo) => ({ id: wo.id }));
}

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

      {/* Tab strip */}
      <div className="flex gap-1 mb-4 bg-surface-100 p-1 rounded-xl w-fit">
        {["Routing Operations", "Job Costing", "Work Instructions"].map((tab, i) => (
          <div
            key={tab}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all ${
              i === 0 ? "bg-surface-0 text-ink-900 shadow-sm" : "text-ink-500 hover:text-ink-700"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Routing Steps */}
      <SectionCard title="Routing Operations" subtitle="Production flow for this work order" className="mb-4">
        <div className="relative">
          <div className="absolute left-[17px] top-2 bottom-2 w-0.5 bg-surface-200" />
          <div className="space-y-0">
            {workOrderRoutingSteps.map((step) => {
              const isComplete = step.status === "Complete";
              const isActive = step.status === "In Progress";
              return (
                <div key={step.step} className="flex items-start gap-4 py-3">
                  <div className={cn("relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-colors", isComplete ? "bg-brand-500 border-brand-500" : isActive ? "bg-surface-0 border-brand-500" : "bg-surface-0 border-surface-200")}>
                    {isComplete ? <Check size={14} className="text-white" /> : isActive ? <Clock size={14} className="text-brand-500" /> : <Circle size={14} className="text-surface-300" />}
                  </div>
                  <div className="flex-1 min-w-0 pt-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className={cn("text-sm font-medium", isActive ? "text-brand-500" : isComplete ? "text-ink-900" : "text-ink-400")}>{step.operation}</p>
                        <p className="text-xs text-ink-400 mt-0.5">{step.machine} · {step.hours} hrs</p>
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

      {/* Job Costing */}
      <SectionCard title="Job Costing" subtitle="Estimated vs. actual cost breakdown" className="mb-4">
        <div className="grid grid-cols-2 gap-6">
          {/* Operations cost comparison */}
          <div>
            <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">Operations — Est. vs Actual</p>
            <div className="space-y-2">
              {workOrderRoutingSteps.map((step) => {
                const estCost = step.hours * 95;
                const actualCost = estCost * (0.85 + Math.random() * 0.3);
                const variance = actualCost - estCost;
                return (
                  <div key={step.step} className="flex items-center justify-between text-xs py-2 border-b border-surface-100 last:border-0">
                    <span className="text-ink-700 flex-1">{step.operation}</span>
                    <span className="text-ink-500 w-16 text-right">{formatCurrency(estCost)}</span>
                    <span className="text-ink-900 font-medium w-16 text-right">{formatCurrency(actualCost)}</span>
                    <span className={cn("w-16 text-right font-medium", variance > 0 ? "text-status-red" : "text-status-green")}>
                      {variance > 0 ? "+" : ""}{formatCurrency(variance)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-xs pt-3 border-t border-surface-200 mt-2">
              <span className="font-semibold text-ink-700">Labor Total</span>
              <span className="text-ink-500 w-16 text-right">{formatCurrency(wo.estimatedHours * 95)}</span>
              <span className="font-semibold text-ink-900 w-16 text-right">{formatCurrency(wo.laborCost)}</span>
              <span className={cn("w-16 text-right font-semibold", wo.laborCost > wo.estimatedHours * 95 ? "text-status-red" : "text-status-green")}>
                {formatCurrency(wo.laborCost - wo.estimatedHours * 95)}
              </span>
            </div>
          </div>

          {/* Cost breakdown */}
          <div>
            <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">Cost Breakdown</p>
            <div className="space-y-3">
              {[
                { label: "Material", amount: wo.materialCost, pct: Math.round((wo.materialCost / totalCost) * 100) },
                { label: "Labor", amount: wo.laborCost, pct: Math.round((wo.laborCost / totalCost) * 100) },
                { label: "Outside Processing", amount: wo.materialCost * 0.12, pct: 12 },
                { label: "Overhead", amount: wo.laborCost * 0.4, pct: 8 },
              ].map(({ label, amount, pct }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-700">{label}</span>
                    <span className="font-medium text-ink-900">{formatCurrency(amount)} <span className="text-ink-400">({pct}%)</span></span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-brand-500 opacity-70" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-surface-50 rounded-xl">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-ink-500">Est. Total</span>
                <span className="text-xs text-ink-500">{formatCurrency(estimatedTotal)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-ink-700">Actual To Date</span>
                <span className="text-sm font-semibold text-ink-900">{formatCurrency(totalCost)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-surface-100">
                <span className="text-xs text-ink-500">Est. Margin</span>
                <span className={cn("text-base font-semibold", margin > 0 ? "text-status-green" : "text-status-red")}>{margin.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Work Instructions */}
      <SectionCard title="Work Instructions" subtitle="Step-by-step operator guidance per operation">
        <div className="space-y-4">
          {workOrderRoutingSteps.map((step, idx) => {
            const isComplete = step.status === "Complete";
            return (
              <div key={step.step} className="border border-surface-200 rounded-xl overflow-hidden">
                <div className={cn("flex items-center justify-between px-4 py-3", isComplete ? "bg-green-50" : idx === 1 ? "bg-brand-50" : "bg-surface-50")}>
                  <div className="flex items-center gap-3">
                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold", isComplete ? "bg-status-green text-white" : idx === 1 ? "bg-brand-500 text-white" : "bg-surface-200 text-ink-500")}>
                      {isComplete ? <Check size={12} /> : step.step}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{step.operation}</p>
                      <p className="text-[10px] text-ink-400">{step.machine} · {step.hours} hrs est.</p>
                    </div>
                  </div>
                  <StatusBadge status={step.status} size="sm" />
                </div>
                {idx < 3 && (
                  <div className="px-4 py-4 bg-surface-0">
                    <div className="grid grid-cols-3 gap-4">
                      {/* Instructions */}
                      <div className="col-span-2 space-y-3">
                        <div className="flex items-start gap-2">
                          <FileText size={14} className="text-ink-300 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-ink-700 mb-1">Instructions</p>
                            <p className="text-xs text-ink-500 leading-relaxed">
                              {idx === 0 ? "Load workpiece into vise, zero datum on X/Y using edge finder. Confirm Z zero with gage block. Run setup sheet verification checklist before starting cycle." :
                               idx === 1 ? "Select T-1003 rougher. Run DXF path at 50% override first pass. Monitor chip load — adjust feed if chatter detected. Check wall thickness at midpoint." :
                               "Select T-1001 finisher. Final pass at 100% override. Check Ra with profilometer after completion — must be Ra 32 or better on all surfaces."}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Wrench size={14} className="text-ink-300 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-ink-700 mb-1">Required Tools</p>
                            <div className="flex flex-wrap gap-1">
                              {(idx === 0 ? ["Edge finder", "Gage block", "T-handle hex set"] :
                                idx === 1 ? ["T-1003 Rougher", "T-005 Thread Mill", "Coolant nozzle"] :
                                ["T-1001 Finisher", "T-1002 Ball nose", "Profilometer G-206"]).map((tool) => (
                                <span key={tool} className="text-[10px] bg-surface-100 text-ink-600 px-2 py-0.5 rounded font-medium">{tool}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Photo placeholder + checklist */}
                      <div className="space-y-3">
                        <div className="aspect-video bg-surface-100 rounded-lg flex items-center justify-center border-2 border-dashed border-surface-200">
                          <div className="text-center">
                            <ImageIcon size={20} className="text-ink-200 mx-auto mb-1" />
                            <p className="text-[10px] text-ink-300">Setup photo</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-ink-700 mb-1.5 flex items-center gap-1">
                            <CheckSquare size={12} className="text-ink-300" />
                            Quality Checks
                          </p>
                          {["Datum verified", "Program confirmed", "First part approved"].map((check) => (
                            <label key={check} className="flex items-center gap-2 py-1 cursor-pointer group">
                              <div className={cn("w-4 h-4 rounded border flex items-center justify-center flex-shrink-0", isComplete ? "bg-brand-500 border-brand-500" : "border-surface-300 group-hover:border-brand-300")}>
                                {isComplete && <Check size={10} className="text-white" />}
                              </div>
                              <span className={cn("text-[10px]", isComplete ? "text-ink-400 line-through" : "text-ink-700")}>{check}</span>
                            </label>
                          ))}
                        </div>
                        {isComplete && (
                          <div className="text-[10px] bg-green-50 border border-green-200 rounded-lg p-2">
                            <p className="font-semibold text-green-700">Signed off</p>
                            <p className="text-green-600">M. Chen · Mar 19, 2024</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
