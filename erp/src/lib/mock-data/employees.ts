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
