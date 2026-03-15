export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  shift: "Day" | "Night" | "Flex";
  status: "Active" | "PTO" | "Training";
  hoursThisWeek: number;
  currentJob: string | null;
  email: string;
  startDate: string;
}

export interface TimeEntry {
  id: string;
  employeeId: string;
  workOrder: string;
  operation: string;
  date: string;
  hours: number;
  type: "Regular" | "Overtime" | "Setup";
}

export const employees: Employee[] = [
  { id: "e-001", name: "Marcus Chen", role: "CNC Machinist III", department: "Machining", shift: "Day", status: "Active", hoursThisWeek: 38, currentJob: "WO-2024-0891", email: "m.chen@biosmedical.com", startDate: "2019-04-15" },
  { id: "e-002", name: "Kevin Torres", role: "Quality Inspector II", department: "Quality", shift: "Day", status: "Active", hoursThisWeek: 40, currentJob: null, email: "k.torres@biosmedical.com", startDate: "2020-08-22" },
  { id: "e-003", name: "Jennifer Williams", role: "Lead Inspector / CMM", department: "Quality", shift: "Day", status: "Active", hoursThisWeek: 36, currentJob: "WO-2024-0893", email: "j.williams@biosmedical.com", startDate: "2017-02-10" },
  { id: "e-004", name: "Vijay Patel", role: "CNC Machinist II", department: "Machining", shift: "Day", status: "Active", hoursThisWeek: 40, currentJob: "WO-2024-0897", email: "v.patel@biosmedical.com", startDate: "2021-11-01" },
  { id: "e-005", name: "Robert Johnson", role: "Purchasing Coordinator", department: "Purchasing", shift: "Flex", status: "Active", hoursThisWeek: 40, currentJob: null, email: "r.johnson@biosmedical.com", startDate: "2018-06-18" },
  { id: "e-006", name: "Angela Foster", role: "CNC Programmer", department: "Engineering", shift: "Day", status: "Active", hoursThisWeek: 42, currentJob: "WO-2024-0895", email: "a.foster@biosmedical.com", startDate: "2016-09-05" },
  { id: "e-007", name: "Derek Mills", role: "CNC Machinist III", department: "Machining", shift: "Night", status: "Active", hoursThisWeek: 40, currentJob: "WO-2024-0892", email: "d.mills@biosmedical.com", startDate: "2020-03-12" },
  { id: "e-008", name: "Priya Sharma", role: "Quality Engineer", department: "Quality", shift: "Day", status: "Training", hoursThisWeek: 32, currentJob: null, email: "p.sharma@biosmedical.com", startDate: "2023-10-30" },
  { id: "e-009", name: "Tom Bradley", role: "Shop Supervisor", department: "Operations", shift: "Day", status: "Active", hoursThisWeek: 44, currentJob: null, email: "t.bradley@biosmedical.com", startDate: "2015-01-20" },
  { id: "e-010", name: "Lisa Chang", role: "CNC Machinist I", department: "Machining", shift: "Day", status: "PTO", hoursThisWeek: 16, currentJob: null, email: "l.chang@biosmedical.com", startDate: "2023-05-08" },
];

export const timeEntries: TimeEntry[] = [
  { id: "te-001", employeeId: "e-001", workOrder: "WO-2024-0891", operation: "CNC Milling — Features", date: "2024-03-18", hours: 8, type: "Regular" },
  { id: "te-002", employeeId: "e-001", workOrder: "WO-2024-0891", operation: "CNC Milling — Features", date: "2024-03-19", hours: 8, type: "Regular" },
  { id: "te-003", employeeId: "e-004", workOrder: "WO-2024-0897", operation: "Final Polishing", date: "2024-03-18", hours: 8, type: "Regular" },
  { id: "te-004", employeeId: "e-007", workOrder: "WO-2024-0892", operation: "CNC Turning", date: "2024-03-18", hours: 8, type: "Regular" },
  { id: "te-005", employeeId: "e-007", workOrder: "WO-2024-0892", operation: "CNC Turning", date: "2024-03-19", hours: 6, type: "Regular" },
  { id: "te-006", employeeId: "e-007", workOrder: "WO-2024-0892", operation: "CNC Turning", date: "2024-03-19", hours: 2, type: "Overtime" },
];

export type TrainingStatus = "Current" | "Expiring Soon" | "Expired";
export type TrainingType = "Equipment" | "Safety" | "Quality" | "Process" | "Certification";

export interface TrainingRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  training: string;
  type: TrainingType;
  provider: string;
  dateCompleted: string;
  expires: string | null;
  status: TrainingStatus;
  notes: string;
}

export interface ClockPunch {
  id: string;
  employeeId: string;
  employeeName: string;
  workOrder: string;
  operation: string;
  operationType: "Setup" | "Run" | "Programming" | "Troubleshooting" | "Inspection";
  clockIn: string;
  clockOut: string | null;
  hours: number | null;
  laborCost: number | null;
  date: string;
}

export const trainingRecords: TrainingRecord[] = [
  { id: "tr-001", employeeId: "e-001", employeeName: "Marcus Chen", training: "Haas VF-3 VMC Operation", type: "Equipment", provider: "Haas Factory Outlet", dateCompleted: "2022-06-15", expires: null, status: "Current", notes: "Certified operator" },
  { id: "tr-002", employeeId: "e-001", employeeName: "Marcus Chen", training: "5-Axis Machining — Haas UMC", type: "Equipment", provider: "Haas Factory Outlet", dateCompleted: "2023-02-10", expires: null, status: "Current", notes: "" },
  { id: "tr-003", employeeId: "e-001", employeeName: "Marcus Chen", training: "Titanium Machining Best Practices", type: "Process", provider: "Kennametal", dateCompleted: "2023-08-20", expires: "2025-08-20", status: "Current", notes: "" },
  { id: "tr-004", employeeId: "e-001", employeeName: "Marcus Chen", training: "OSHA 10-Hour General Industry", type: "Safety", provider: "OSHA Outreach", dateCompleted: "2022-01-15", expires: null, status: "Current", notes: "" },
  { id: "tr-005", employeeId: "e-001", employeeName: "Marcus Chen", training: "ISO 13485 Awareness", type: "Quality", provider: "Internal", dateCompleted: "2024-01-10", expires: "2025-01-10", status: "Current", notes: "" },
  { id: "tr-006", employeeId: "e-002", employeeName: "Kevin Torres", training: "CMM Operation — Zeiss Contura", type: "Equipment", provider: "Zeiss", dateCompleted: "2022-11-01", expires: null, status: "Current", notes: "" },
  { id: "tr-007", employeeId: "e-002", employeeName: "Kevin Torres", training: "GD&T per ASME Y14.5-2018", type: "Quality", provider: "ASME Training", dateCompleted: "2023-03-20", expires: null, status: "Current", notes: "Certified Senior Level" },
  { id: "tr-008", employeeId: "e-002", employeeName: "Kevin Torres", training: "AS9100 Internal Auditor", type: "Quality", provider: "Omnex", dateCompleted: "2022-06-01", expires: "2025-06-01", status: "Current", notes: "" },
  { id: "tr-009", employeeId: "e-003", employeeName: "Jennifer Williams", training: "CMM Programming — Calypso", type: "Equipment", provider: "Zeiss", dateCompleted: "2021-04-15", expires: null, status: "Current", notes: "Advanced programmer" },
  { id: "tr-010", employeeId: "e-003", employeeName: "Jennifer Williams", training: "First Article Inspection (FAI) AS9102", type: "Quality", provider: "SAE International", dateCompleted: "2020-09-10", expires: null, status: "Current", notes: "" },
  { id: "tr-011", employeeId: "e-003", employeeName: "Jennifer Williams", training: "OSHA 30-Hour General Industry", type: "Safety", provider: "OSHA Outreach", dateCompleted: "2020-04-05", expires: null, status: "Current", notes: "" },
  { id: "tr-012", employeeId: "e-004", employeeName: "Vijay Patel", training: "Okuma LB3000 Operation", type: "Equipment", provider: "Okuma", dateCompleted: "2023-01-15", expires: null, status: "Current", notes: "" },
  { id: "tr-013", employeeId: "e-004", employeeName: "Vijay Patel", training: "Medical Device Manufacturing — ISO 13485", type: "Quality", provider: "BSI Group", dateCompleted: "2022-08-20", expires: "2024-08-20", status: "Expiring Soon", notes: "Renewal due Aug 2024" },
  { id: "tr-014", employeeId: "e-004", employeeName: "Vijay Patel", training: "OSHA 10-Hour General Industry", type: "Safety", provider: "OSHA Outreach", dateCompleted: "2021-06-10", expires: null, status: "Current", notes: "" },
  { id: "tr-015", employeeId: "e-005", employeeName: "Robert Johnson", training: "Supplier Auditing Techniques", type: "Quality", provider: "Internal", dateCompleted: "2023-09-15", expires: "2025-09-15", status: "Current", notes: "" },
  { id: "tr-016", employeeId: "e-005", employeeName: "Robert Johnson", training: "Hazardous Materials Handling", type: "Safety", provider: "OSHA Outreach", dateCompleted: "2021-03-01", expires: "2024-03-01", status: "Expired", notes: "Renewal overdue" },
  { id: "tr-017", employeeId: "e-006", employeeName: "Angela Foster", training: "Mastercam Programming — Mill/Turn", type: "Equipment", provider: "CNC Software", dateCompleted: "2022-04-20", expires: null, status: "Current", notes: "Certified instructor" },
  { id: "tr-018", employeeId: "e-006", employeeName: "Angela Foster", training: "GD&T per ASME Y14.5-2018", type: "Quality", provider: "ASME Training", dateCompleted: "2021-11-15", expires: null, status: "Current", notes: "" },
  { id: "tr-019", employeeId: "e-007", employeeName: "Derek Mills", training: "Haas VF-4 Operation", type: "Equipment", provider: "Haas Factory Outlet", dateCompleted: "2021-08-01", expires: null, status: "Current", notes: "" },
  { id: "tr-020", employeeId: "e-007", employeeName: "Derek Mills", training: "OSHA 10-Hour General Industry", type: "Safety", provider: "OSHA Outreach", dateCompleted: "2022-09-10", expires: null, status: "Current", notes: "" },
  { id: "tr-021", employeeId: "e-007", employeeName: "Derek Mills", training: "Night Shift Safety Procedures", type: "Safety", provider: "Internal", dateCompleted: "2020-04-01", expires: "2024-04-01", status: "Expiring Soon", notes: "Annual renewal required" },
  { id: "tr-022", employeeId: "e-008", employeeName: "Priya Sharma", training: "New Employee Quality Orientation", type: "Quality", provider: "Internal", dateCompleted: "2023-11-01", expires: null, status: "Current", notes: "" },
  { id: "tr-023", employeeId: "e-008", employeeName: "Priya Sharma", training: "CMM Operation — Zeiss Contura (In Progress)", type: "Equipment", provider: "Zeiss", dateCompleted: "2024-02-01", expires: null, status: "Current", notes: "Still in training period" },
  { id: "tr-024", employeeId: "e-009", employeeName: "Tom Bradley", training: "Shop Supervisor Leadership", type: "Process", provider: "SME", dateCompleted: "2020-01-15", expires: null, status: "Current", notes: "" },
  { id: "tr-025", employeeId: "e-009", employeeName: "Tom Bradley", training: "OSHA 30-Hour General Industry", type: "Safety", provider: "OSHA Outreach", dateCompleted: "2019-06-10", expires: null, status: "Current", notes: "" },
  { id: "tr-026", employeeId: "e-010", employeeName: "Lisa Chang", training: "Haas VF-3 VMC Operation (Basic)", type: "Equipment", provider: "Internal", dateCompleted: "2023-06-15", expires: null, status: "Current", notes: "In supervised operation period" },
  { id: "tr-027", employeeId: "e-010", employeeName: "Lisa Chang", training: "OSHA 10-Hour General Industry", type: "Safety", provider: "OSHA Outreach", dateCompleted: "2023-05-10", expires: null, status: "Current", notes: "" },
];

export const clockPunches: ClockPunch[] = [
  { id: "cp-001", employeeId: "e-001", employeeName: "Marcus Chen", workOrder: "WO-2024-0891", operation: "5-Axis Mill — Contour", operationType: "Run", clockIn: "06:02", clockOut: null, hours: null, laborCost: null, date: "2024-03-20" },
  { id: "cp-002", employeeId: "e-004", employeeName: "Vijay Patel", workOrder: "WO-2024-0897", operation: "Final Polish & Deburr", operationType: "Run", clockIn: "06:15", clockOut: null, hours: null, laborCost: null, date: "2024-03-20" },
  { id: "cp-003", employeeId: "e-006", employeeName: "Angela Foster", workOrder: "WO-2024-0895", operation: "CAM Programming — Nozzle", operationType: "Programming", clockIn: "07:30", clockOut: null, hours: null, laborCost: null, date: "2024-03-20" },
  { id: "cp-004", employeeId: "e-007", employeeName: "Derek Mills", workOrder: "WO-2024-0892", operation: "CNC Turning — OD Profile", operationType: "Run", clockIn: "06:00", clockOut: "14:00", hours: 8, laborCost: 560, date: "2024-03-20" },
  { id: "cp-005", employeeId: "e-003", employeeName: "Jennifer Williams", workOrder: "WO-2024-0893", operation: "CMM First Article Inspection", operationType: "Inspection", clockIn: "07:00", clockOut: "10:30", hours: 3.5, laborCost: 297.5, date: "2024-03-20" },
  { id: "cp-006", employeeId: "e-002", employeeName: "Kevin Torres", workOrder: "WO-2024-0894", operation: "In-Process Dimensional Check", operationType: "Inspection", clockIn: "08:00", clockOut: "09:00", hours: 1, laborCost: 85, date: "2024-03-20" },
  { id: "cp-007", employeeId: "e-009", employeeName: "Tom Bradley", workOrder: "WO-2024-0891", operation: "Setup Review & Sign-off", operationType: "Setup", clockIn: "06:30", clockOut: "07:15", hours: 0.75, laborCost: 93.75, date: "2024-03-20" },
  { id: "cp-008", employeeId: "e-001", employeeName: "Marcus Chen", workOrder: "WO-2024-0891", operation: "5-Axis Setup", operationType: "Setup", clockIn: "14:00", clockOut: "16:00", hours: 2, laborCost: 190, date: "2024-03-19" },
];
