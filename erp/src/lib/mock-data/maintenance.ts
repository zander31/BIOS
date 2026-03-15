export type EquipmentStatus = "Online" | "Offline" | "Maintenance" | "Decommissioned";
export type PMStatus = "Scheduled" | "In Progress" | "Complete" | "Overdue" | "Cancelled";
export type PMType = "Preventive" | "Corrective" | "Predictive" | "Calibration" | "Inspection";

export interface Equipment {
  id: string;
  equipmentNumber: string;
  name: string;
  category: string;
  make: string;
  model: string;
  serialNumber: string;
  location: string;
  installDate: string;
  lastPM: string;
  nextPM: string;
  pmIntervalDays: number;
  status: EquipmentStatus;
  notes: string;
}

export interface CalibrationRecord {
  id: string;
  instrumentId: string;
  instrumentName: string;
  idNumber: string;
  range: string;
  location: string;
  lastCalDate: string;
  nextCalDate: string;
  calIntervalDays: number;
  calHouse: string;
  certificateNumber: string;
  result: "Pass" | "Fail" | "Adjusted & Pass";
  calStatus: "OK" | "Due Soon" | "Overdue" | "In Lab";
}

export interface MaintenanceWO {
  id: string;
  woNumber: string;
  equipmentId: string;
  equipmentName: string;
  task: string;
  type: PMType;
  priority: "Critical" | "High" | "Medium" | "Low";
  assignedTo: string;
  scheduledDate: string;
  completedDate?: string;
  estimatedHours: number;
  actualHours?: number;
  status: PMStatus;
  notes: string;
}

export const equipment: Equipment[] = [
  { id: "eq-001", equipmentNumber: "EQ-101", name: "Haas VF-3 VMC", category: "CNC Machining Center", make: "Haas", model: "VF-3", serialNumber: "1084219", location: "Bay 1", installDate: "2018-06-15", lastPM: "2024-01-15", nextPM: "2024-04-15", pmIntervalDays: 90, status: "Online", notes: "Annual Haas service March 2024." },
  { id: "eq-002", equipmentNumber: "EQ-102", name: "Haas VF-5/40T VMC", category: "CNC Machining Center", make: "Haas", model: "VF-5/40T", serialNumber: "1091044", location: "Bay 2", installDate: "2020-03-10", lastPM: "2024-02-20", nextPM: "2024-05-20", pmIntervalDays: 90, status: "Online", notes: "" },
  { id: "eq-003", equipmentNumber: "EQ-103", name: "Haas UMC-750 5-Axis", category: "5-Axis Machining Center", make: "Haas", model: "UMC-750", serialNumber: "1102884", location: "Bay 3", installDate: "2022-11-01", lastPM: "2024-03-01", nextPM: "2024-06-01", pmIntervalDays: 90, status: "Online", notes: "Trunnion calibration required at next PM." },
  { id: "eq-004", equipmentNumber: "EQ-104", name: "Okuma LB3000 CNC Lathe", category: "CNC Lathe", make: "Okuma", model: "LB3000", serialNumber: "OK-29810", location: "Bay 4", installDate: "2017-09-20", lastPM: "2023-12-10", nextPM: "2024-03-10", pmIntervalDays: 90, status: "Maintenance", notes: "Spindle bearing replacement scheduled." },
  { id: "eq-005", equipmentNumber: "EQ-105", name: "Studer S31 CNC Grinder", category: "CNC Grinder", make: "Studer", model: "S31", serialNumber: "STU-08821", location: "Bay 5", installDate: "2019-04-15", lastPM: "2024-02-10", nextPM: "2024-05-10", pmIntervalDays: 90, status: "Online", notes: "" },
  { id: "eq-006", equipmentNumber: "EQ-106", name: "Zeiss Contura CMM", category: "Coordinate Measuring Machine", make: "Zeiss", model: "Contura G2", serialNumber: "ZEI-40189", location: "Inspection Room", installDate: "2021-07-20", lastPM: "2024-01-20", nextPM: "2024-07-20", pmIntervalDays: 180, status: "Online", notes: "Annual Zeiss certification Jan 2024." },
  { id: "eq-007", equipmentNumber: "EQ-107", name: "Sodick Wire EDM", category: "EDM", make: "Sodick", model: "AQ600L", serialNumber: "SOD-18841", location: "Bay 6", installDate: "2020-08-05", lastPM: "2024-02-28", nextPM: "2024-05-28", pmIntervalDays: 90, status: "Online", notes: "Replace wire guide at next PM." },
  { id: "eq-008", equipmentNumber: "EQ-108", name: "Aqueous Parts Washer", category: "Cleaning Equipment", make: "Better Engineering", model: "T-60", serialNumber: "BE-09912", location: "Cleaning Station", installDate: "2016-03-01", lastPM: "2024-01-05", nextPM: "2024-04-05", pmIntervalDays: 90, status: "Online", notes: "Filter replacement monthly." },
  { id: "eq-009", equipmentNumber: "EQ-109", name: "Overhead Crane — 2 Ton", category: "Material Handling", make: "Konecranes", model: "CXT 2000", serialNumber: "KON-28841", location: "Shop Floor", installDate: "2015-01-10", lastPM: "2024-03-15", nextPM: "2024-06-15", pmIntervalDays: 90, status: "Online", notes: "OSHA inspection certificate current." },
  { id: "eq-010", equipmentNumber: "EQ-110", name: "Portable CMM — Faro Arm", category: "Metrology", make: "Faro", model: "Quantum S Max", serialNumber: "FAR-04481", location: "Portable", installDate: "2023-01-15", lastPM: "2024-01-15", nextPM: "2024-07-15", pmIntervalDays: 180, status: "Online", notes: "" },
  { id: "eq-011", equipmentNumber: "EQ-111", name: "Haas VF-4 VMC", category: "CNC Machining Center", make: "Haas", model: "VF-4", serialNumber: "1088321", location: "Bay 7", installDate: "2019-11-20", lastPM: "2024-01-10", nextPM: "2024-04-10", pmIntervalDays: 90, status: "Online", notes: "" },
  { id: "eq-012", equipmentNumber: "EQ-112", name: "Bandsaw — DoAll 18\"", category: "Saw", make: "DoAll", model: "C-18", serialNumber: "DA-18-0091", location: "Material Staging", installDate: "2014-06-01", lastPM: "2023-11-15", nextPM: "2024-02-15", pmIntervalDays: 90, status: "Offline", notes: "Blade broke. Waiting on replacement blade." },
  { id: "eq-013", equipmentNumber: "EQ-113", name: "Air Compressor — 80 Gal", category: "Compressed Air", make: "Quincy", model: "QGV-50", serialNumber: "QNC-018821", location: "Utility Room", installDate: "2016-09-10", lastPM: "2024-03-01", nextPM: "2024-06-01", pmIntervalDays: 90, status: "Online", notes: "Oil change and belt inspection at last PM." },
  { id: "eq-014", equipmentNumber: "EQ-114", name: "Heat Treat Oven — Box", category: "Heat Treatment", make: "Thermcraft", model: "LB-14-12-12", serialNumber: "TC-081942", location: "Heat Treat Area", installDate: "2018-02-20", lastPM: "2024-02-20", nextPM: "2024-05-20", pmIntervalDays: 90, status: "Online", notes: "Thermocouple survey annual — due Aug 2024." },
  { id: "eq-015", equipmentNumber: "EQ-115", name: "Surface Grinder — Okamoto", category: "Surface Grinder", make: "Okamoto", model: "ACC-618DX", serialNumber: "OKA-12841", location: "Bay 8", installDate: "2021-04-10", lastPM: "2024-03-10", nextPM: "2024-06-10", pmIntervalDays: 90, status: "Online", notes: "" },
];

export const calibrationRecords: CalibrationRecord[] = [
  { id: "cal-001", instrumentId: "eq-006", instrumentName: "Zeiss Contura CMM", idNumber: "ZEI-40189", range: "1200×700×700 mm", location: "Inspection Room", lastCalDate: "2024-01-20", nextCalDate: "2025-01-20", calIntervalDays: 365, calHouse: "Zeiss Service", certificateNumber: "ZEI-CAL-2024-001", result: "Pass", calStatus: "OK" },
  { id: "cal-002", instrumentId: "eq-010", instrumentName: "Faro Quantum Arm", idNumber: "FAR-04481", range: "3.7m spherical", location: "Portable", lastCalDate: "2024-01-15", nextCalDate: "2025-01-15", calIntervalDays: 365, calHouse: "Faro Technologies", certificateNumber: "FAR-CAL-2024-001", result: "Pass", calStatus: "OK" },
  { id: "cal-003", instrumentId: "g-001", instrumentName: "Mitutoyo Micrometer 0-1\"", idNumber: "SN-291847", range: "0-1.000\"", location: "Inspection Room", lastCalDate: "2024-01-15", nextCalDate: "2024-07-15", calIntervalDays: 180, calHouse: "NIST Cal Lab", certificateNumber: "NIST-2024-0041", result: "Pass", calStatus: "OK" },
  { id: "cal-004", instrumentId: "g-005", instrumentName: "Starrett Dial Indicator", idNumber: "SN-019482", range: "0-1.000\"", location: "Shop Floor", lastCalDate: "2023-09-15", nextCalDate: "2024-03-15", calIntervalDays: 180, calHouse: "Internal", certificateNumber: "INT-2023-009", result: "Pass", calStatus: "Overdue" },
  { id: "cal-005", instrumentId: "g-008", instrumentName: "Thread Ring Gauge 1/4-20", idNumber: "TRG-0281", range: "1/4-20 UNC", location: "Inspection Room", lastCalDate: "2023-08-10", nextCalDate: "2024-02-10", calIntervalDays: 180, calHouse: "Internal", certificateNumber: "INT-2023-008", result: "Pass", calStatus: "Overdue" },
  { id: "cal-006", instrumentId: "g-003", instrumentName: "Starrett Height Gauge 12\"", idNumber: "SN-884211", range: "0-12.000\"", location: "Inspection Room", lastCalDate: "2023-12-10", nextCalDate: "2024-06-10", calIntervalDays: 180, calHouse: "NIST Cal Lab", certificateNumber: "NIST-2023-088", result: "Pass", calStatus: "Due Soon" },
  { id: "cal-007", instrumentId: "g-007", instrumentName: "Pin Gauge Set Vermont", idNumber: "SET-VG-0041", range: "0.061-0.250\"", location: "Inspection Room", lastCalDate: "2023-10-20", nextCalDate: "2024-04-20", calIntervalDays: 180, calHouse: "Internal", certificateNumber: "INT-2023-012", result: "Pass", calStatus: "Due Soon" },
  { id: "cal-008", instrumentId: "g-012", instrumentName: "Mitutoyo Bore Gauge", idNumber: "BG-SN-0284", range: "1.000-2.000\"", location: "Shop Floor", lastCalDate: "2023-11-01", nextCalDate: "2024-05-01", calIntervalDays: 180, calHouse: "NIST Cal Lab", certificateNumber: "NIST-2023-109", result: "Pass", calStatus: "Due Soon" },
  { id: "cal-009", instrumentId: "eq-014", instrumentName: "Heat Treat Oven Thermocouple", idNumber: "TC-081942-TC1", range: "0-2200°F", location: "Heat Treat Area", lastCalDate: "2023-08-15", nextCalDate: "2024-08-15", calIntervalDays: 365, calHouse: "NIST Cal Lab", certificateNumber: "NIST-2023-082", result: "Pass", calStatus: "OK" },
  { id: "cal-010", instrumentId: "g-004", instrumentName: "Renishaw CMM Probe PH10", idNumber: "PH10-4821", range: "N/A", location: "Zeiss CMM", lastCalDate: "2024-02-01", nextCalDate: "2024-08-01", calIntervalDays: 180, calHouse: "Renishaw Service", certificateNumber: "RSW-2024-014", result: "Pass", calStatus: "OK" },
  { id: "cal-011", instrumentId: "g-009", instrumentName: "Starrett Optical Comparator", idNumber: "OC-14-0042", range: "14\" screen", location: "Inspection Room", lastCalDate: "2024-01-20", nextCalDate: "2025-01-20", calIntervalDays: 365, calHouse: "Starrett Service", certificateNumber: "STR-2024-002", result: "Adjusted & Pass", calStatus: "OK" },
  { id: "cal-012", instrumentId: "g-011", instrumentName: "Wilson Rockwell Hardness Tester", idNumber: "HT-WL-0091", range: "HRA/B/C", location: "Inspection Room", lastCalDate: "2024-03-10", nextCalDate: "2024-09-10", calIntervalDays: 180, calHouse: "Wilson Service", certificateNumber: "WLS-2024-011", result: "Pass", calStatus: "OK" },
  { id: "cal-013", instrumentId: "g-002", instrumentName: "Mitutoyo Micrometer 1-2\"", idNumber: "SN-291848", range: "1-2.000\"", location: "Inspection Room", lastCalDate: "2024-01-15", nextCalDate: "2024-07-15", calIntervalDays: 180, calHouse: "NIST Cal Lab", certificateNumber: "NIST-2024-0042", result: "Pass", calStatus: "OK" },
  { id: "cal-014", instrumentId: "g-010", instrumentName: "Snap-on Torque Wrench", idNumber: "TW-SN-1842", range: "0-100 ft-lbs", location: "Assembly", lastCalDate: "2024-02-15", nextCalDate: "2024-08-15", calIntervalDays: 180, calHouse: "Internal", certificateNumber: "INT-2024-003", result: "Pass", calStatus: "OK" },
  { id: "cal-015", instrumentId: "g-006", instrumentName: "Mitutoyo Profilometer", idNumber: "SJ-SN-0182", range: "Ra 0.01-100 μm", location: "Inspection Room", lastCalDate: "2024-03-01", nextCalDate: "2025-03-01", calIntervalDays: 365, calHouse: "Mitutoyo Service", certificateNumber: "MIT-2024-0089", result: "Pass", calStatus: "OK" },
  { id: "cal-016", instrumentId: "g-005-dup", instrumentName: "Back-up Dial Indicator", idNumber: "SN-019483", range: "0-1.000\"", location: "Shop Floor", lastCalDate: "2024-01-10", nextCalDate: "2024-07-10", calIntervalDays: 180, calHouse: "Internal", certificateNumber: "INT-2024-002", result: "Pass", calStatus: "OK" },
  { id: "cal-017", instrumentId: "pressure-001", instrumentName: "Coolant Pressure Gauge", idNumber: "PG-018", range: "0-200 PSI", location: "Bay 1", lastCalDate: "2023-10-01", nextCalDate: "2024-04-01", calIntervalDays: 180, calHouse: "Internal", certificateNumber: "INT-2023-015", result: "Pass", calStatus: "Due Soon" },
  { id: "cal-018", instrumentId: "temp-001", instrumentName: "Digital Thermometer — Cleanroom", idNumber: "TEMP-CR-01", range: "-50 to 300°C", location: "Cleanroom", lastCalDate: "2024-02-28", nextCalDate: "2024-08-28", calIntervalDays: 180, calHouse: "Internal", certificateNumber: "INT-2024-004", result: "Pass", calStatus: "OK" },
  { id: "cal-019", instrumentId: "scale-001", instrumentName: "Precision Scale — 0-200g", idNumber: "SC-001", range: "0-200g", location: "Inspection Room", lastCalDate: "2024-03-15", nextCalDate: "2025-03-15", calIntervalDays: 365, calHouse: "NIST Cal Lab", certificateNumber: "NIST-2024-019", result: "Pass", calStatus: "OK" },
  { id: "cal-020", instrumentId: "light-001", instrumentName: "UV Light — Penetrant Testing", idNumber: "UV-PT-01", range: "365nm", location: "Inspection Room", lastCalDate: "2023-07-01", nextCalDate: "2024-01-01", calIntervalDays: 180, calHouse: "Internal", certificateNumber: "INT-2023-020", result: "Pass", calStatus: "Overdue" },
];

export const maintenanceWOs: MaintenanceWO[] = [
  { id: "mw-001", woNumber: "MW-2024-001", equipmentId: "eq-004", equipmentName: "Okuma LB3000 CNC Lathe", task: "Spindle Bearing Replacement", type: "Corrective", priority: "Critical", assignedTo: "Mike Chen", scheduledDate: "2024-03-20", estimatedHours: 8, actualHours: undefined, status: "In Progress", notes: "Bearings on order. ETA 3/19." },
  { id: "mw-002", woNumber: "MW-2024-002", equipmentId: "eq-001", equipmentName: "Haas VF-3 VMC", task: "90-Day PM — Lube, Inspect, Adjust", type: "Preventive", priority: "Medium", assignedTo: "Tom Vance", scheduledDate: "2024-04-15", estimatedHours: 3, actualHours: undefined, status: "Scheduled", notes: "" },
  { id: "mw-003", woNumber: "MW-2024-003", equipmentId: "eq-012", equipmentName: "DoAll Bandsaw", task: "Blade Replacement", type: "Corrective", priority: "High", assignedTo: "Mike Chen", scheduledDate: "2024-03-22", estimatedHours: 1, actualHours: undefined, status: "Scheduled", notes: "New blade PN: DAB-18-0041. Ordered." },
  { id: "mw-004", woNumber: "MW-2024-004", equipmentId: "eq-007", equipmentName: "Sodick Wire EDM", task: "Wire Guide Replacement + 90-Day PM", type: "Preventive", priority: "Medium", assignedTo: "Jake Morrison", scheduledDate: "2024-05-28", estimatedHours: 4, actualHours: undefined, status: "Scheduled", notes: "Order wire guide 1 week before PM." },
  { id: "mw-005", woNumber: "MW-2024-005", equipmentId: "eq-003", equipmentName: "Haas UMC-750 5-Axis", task: "Trunnion Calibration + 90-Day PM", type: "Preventive", priority: "High", assignedTo: "Tom Vance", scheduledDate: "2024-06-01", estimatedHours: 5, actualHours: undefined, status: "Scheduled", notes: "Requires Haas service tech for trunnion." },
  { id: "mw-006", woNumber: "MW-2024-006", equipmentId: "eq-008", equipmentName: "Aqueous Parts Washer", task: "Filter Replacement + Solution Change", type: "Preventive", priority: "Low", assignedTo: "Mike Chen", scheduledDate: "2024-04-05", estimatedHours: 2, actualHours: undefined, status: "Scheduled", notes: "" },
  { id: "mw-007", woNumber: "MW-2024-007", equipmentId: "eq-011", equipmentName: "Haas VF-4 VMC", task: "90-Day PM", type: "Preventive", priority: "Medium", assignedTo: "Tom Vance", scheduledDate: "2024-04-10", estimatedHours: 3, actualHours: undefined, status: "Scheduled", notes: "" },
  { id: "mw-008", woNumber: "MW-2024-008", equipmentId: "eq-002", equipmentName: "Haas VF-5/40T VMC", task: "90-Day PM", type: "Preventive", priority: "Medium", assignedTo: "Jake Morrison", scheduledDate: "2024-05-20", estimatedHours: 3, actualHours: 3.5, status: "Complete", notes: "Completed 2/20. Replaced way cover." },
  { id: "mw-009", woNumber: "MW-2024-009", equipmentId: "eq-013", equipmentName: "Air Compressor", task: "Oil Change + Belt Inspection", type: "Preventive", priority: "Low", assignedTo: "Mike Chen", scheduledDate: "2024-06-01", estimatedHours: 1.5, actualHours: undefined, status: "Scheduled", notes: "" },
  { id: "mw-010", woNumber: "MW-2024-010", equipmentId: "eq-009", equipmentName: "Overhead Crane 2-Ton", task: "Annual Load Test + OSHA Inspection", type: "Inspection", priority: "Critical", assignedTo: "External — Konecranes", scheduledDate: "2024-04-20", estimatedHours: 4, actualHours: undefined, status: "Scheduled", notes: "Schedule with Konecranes service." },
];
