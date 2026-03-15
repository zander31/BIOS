export interface ScheduledJob {
  id: string;
  woNumber: string;
  partName: string;
  operation: string;
  machine: string;
  operator: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: "Scheduled" | "In Progress" | "Complete" | "Delayed";
  color: string;
}

export const machines = [
  "Haas ST-30",
  "Haas UMC-500",
  "Haas VF-4SS",
  "Zeiss CMM",
  "Manual Station 2",
  "Chem Tank B",
  "Packaging Station",
];

export const scheduledJobs: ScheduledJob[] = [
  { id: "sj-001", woNumber: "WO-2024-0891", partName: "Hip Implant — Left", operation: "CNC Milling", machine: "Haas UMC-500", operator: "M. Chen", startDate: "2024-03-18", endDate: "2024-03-22", progress: 65, status: "In Progress", color: "#0066FF" },
  { id: "sj-002", woNumber: "WO-2024-0892", partName: "Surgical Clamp Handle", operation: "CNC Turning", machine: "Haas ST-30", operator: "D. Mills", startDate: "2024-03-10", endDate: "2024-03-25", progress: 40, status: "Delayed", color: "#EF4444" },
  { id: "sj-003", woNumber: "WO-2024-0897", partName: "Endoscope Distal Tip", operation: "Final Polishing", machine: "Manual Station 2", operator: "V. Patel", startDate: "2024-03-19", endDate: "2024-03-23", progress: 75, status: "In Progress", color: "#0066FF" },
  { id: "sj-004", woNumber: "WO-2024-0895", partName: "Neuro Electrode Array", operation: "CNC Milling", machine: "Haas VF-4SS", operator: "A. Foster", startDate: "2024-03-20", endDate: "2024-03-29", progress: 30, status: "In Progress", color: "#0066FF" },
  { id: "sj-005", woNumber: "WO-2024-0899", partName: "Vascular Stent Mold", operation: "CNC Turning", machine: "Haas ST-30", operator: "D. Mills", startDate: "2024-03-25", endDate: "2024-03-29", progress: 0, status: "Scheduled", color: "#9CA3AF" },
  { id: "sj-006", woNumber: "WO-2024-0893", partName: "Cardiac Device Housing", operation: "CMM Inspection", machine: "Zeiss CMM", operator: "J. Williams", startDate: "2024-03-26", endDate: "2024-03-27", progress: 0, status: "Scheduled", color: "#9CA3AF" },
  { id: "sj-007", woNumber: "WO-2024-0891", partName: "Hip Implant — Left", operation: "Passivation", machine: "Chem Tank B", operator: "M. Chen", startDate: "2024-03-23", endDate: "2024-03-24", progress: 0, status: "Scheduled", color: "#9CA3AF" },
  { id: "sj-008", woNumber: "WO-2024-0894", partName: "Knee Brace Bracket", operation: "Final Inspection", machine: "Zeiss CMM", operator: "V. Patel", startDate: "2024-03-15", endDate: "2024-03-19", progress: 100, status: "Complete", color: "#10B981" },
];
