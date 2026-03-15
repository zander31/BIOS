import { cn } from "@/lib/utils";

type Status =
  | "Open"
  | "In Progress"
  | "Complete"
  | "Overdue"
  | "On Hold"
  | "Pass"
  | "Fail"
  | "Pending"
  | "Waiver"
  | "Active"
  | "Inactive"
  | "Draft"
  | "Sent"
  | "Acknowledged"
  | "Partial"
  | "Cancelled"
  | "Scheduled"
  | "Delayed"
  | "Closed"
  | "Voided"
  | "In Review"
  | "Corrective Action"
  | "Under Review"
  | "PTO"
  | "Training"
  | string;

const statusConfig: Record<string, { dot: string; bg: string; text: string }> = {
  "Open":               { dot: "bg-status-blue",   bg: "bg-blue-50",   text: "text-blue-700" },
  "In Progress":        { dot: "bg-status-yellow",  bg: "bg-yellow-50", text: "text-yellow-700" },
  "Complete":           { dot: "bg-status-green",   bg: "bg-emerald-50",text: "text-emerald-700" },
  "Overdue":            { dot: "bg-status-red",     bg: "bg-red-50",    text: "text-red-700" },
  "On Hold":            { dot: "bg-status-gray",    bg: "bg-gray-100",  text: "text-gray-600" },
  "Pass":               { dot: "bg-status-green",   bg: "bg-emerald-50",text: "text-emerald-700" },
  "Fail":               { dot: "bg-status-red",     bg: "bg-red-50",    text: "text-red-700" },
  "Pending":            { dot: "bg-status-gray",    bg: "bg-gray-100",  text: "text-gray-600" },
  "Waiver":             { dot: "bg-status-yellow",  bg: "bg-yellow-50", text: "text-yellow-700" },
  "Active":             { dot: "bg-status-green",   bg: "bg-emerald-50",text: "text-emerald-700" },
  "Inactive":           { dot: "bg-status-gray",    bg: "bg-gray-100",  text: "text-gray-600" },
  "Draft":              { dot: "bg-status-gray",    bg: "bg-gray-100",  text: "text-gray-600" },
  "Sent":               { dot: "bg-status-blue",    bg: "bg-blue-50",   text: "text-blue-700" },
  "Acknowledged":       { dot: "bg-status-blue",    bg: "bg-blue-50",   text: "text-blue-700" },
  "Partial":            { dot: "bg-status-yellow",  bg: "bg-yellow-50", text: "text-yellow-700" },
  "Cancelled":          { dot: "bg-status-red",     bg: "bg-red-50",    text: "text-red-700" },
  "Scheduled":          { dot: "bg-status-gray",    bg: "bg-gray-100",  text: "text-gray-600" },
  "Delayed":            { dot: "bg-status-red",     bg: "bg-red-50",    text: "text-red-700" },
  "Closed":             { dot: "bg-status-green",   bg: "bg-emerald-50",text: "text-emerald-700" },
  "Voided":             { dot: "bg-status-gray",    bg: "bg-gray-100",  text: "text-gray-500" },
  "In Review":          { dot: "bg-status-yellow",  bg: "bg-yellow-50", text: "text-yellow-700" },
  "Corrective Action":  { dot: "bg-status-yellow",  bg: "bg-orange-50", text: "text-orange-700" },
  "Under Review":       { dot: "bg-status-yellow",  bg: "bg-yellow-50", text: "text-yellow-700" },
  "PTO":                { dot: "bg-status-yellow",  bg: "bg-yellow-50", text: "text-yellow-700" },
  "Training":           { dot: "bg-status-blue",    bg: "bg-blue-50",   text: "text-blue-700" },
};

const fallback = { dot: "bg-status-gray", bg: "bg-gray-100", text: "text-gray-600" };

interface StatusBadgeProps {
  status: Status;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status] || fallback;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        config.bg,
        config.text,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
      )}
    >
      <span className={cn("rounded-full flex-shrink-0", config.dot, size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5")} />
      {status}
    </span>
  );
}
