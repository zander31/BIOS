export type ToolStatus = "Active" | "In Use" | "Worn" | "In Grind" | "Retired";
export type FixtureCondition = "Excellent" | "Good" | "Fair" | "Poor" | "Out of Service";
export type CalStatus = "OK" | "Due Soon" | "Overdue" | "In Calibration";

export interface CuttingTool {
  id: string;
  toolNumber: string;
  description: string;
  type: string;
  manufacturer: string;
  diameter: string;
  material: string;
  coating: string;
  crib: string;
  qtyOnHand: number;
  qtyInUse: number;
  minQty: number;
  lastGrind: string;
  nextGrind: string;
  usageCycles: number;
  maxCycles: number;
  status: ToolStatus;
}

export interface Fixture {
  id: string;
  fixtureNumber: string;
  name: string;
  description: string;
  parts: string[];
  machine: string;
  location: string;
  condition: FixtureCondition;
  lastInspection: string;
  nextInspection: string;
  drawing: string;
  notes: string;
}

export interface Gauge {
  id: string;
  gaugeNumber: string;
  description: string;
  type: string;
  manufacturer: string;
  serialNumber: string;
  range: string;
  resolution: string;
  location: string;
  lastCalDate: string;
  nextCalDate: string;
  calIntervalDays: number;
  calHouse: string;
  certificateNumber: string;
  calStatus: CalStatus;
}

export const cuttingTools: CuttingTool[] = [
  { id: "ct-001", toolNumber: "T-1001", description: "1/2\" 4-Flute TiAlN Endmill", type: "End Mill", manufacturer: "Kennametal", diameter: "0.500\"", material: "Carbide", coating: "TiAlN", crib: "A-12", qtyOnHand: 6, qtyInUse: 2, minQty: 3, lastGrind: "2024-02-10", nextGrind: "2024-04-10", usageCycles: 42, maxCycles: 60, status: "Active" },
  { id: "ct-002", toolNumber: "T-1002", description: "1/4\" Ball Nose — Finishing", type: "Ball Nose", manufacturer: "SGS Tool", diameter: "0.250\"", material: "Carbide", coating: "ZrN", crib: "A-12", qtyOnHand: 4, qtyInUse: 1, minQty: 2, lastGrind: "2024-01-20", nextGrind: "2024-04-20", usageCycles: 28, maxCycles: 50, status: "Active" },
  { id: "ct-003", toolNumber: "T-1003", description: "3/4\" Roughing Endmill — Ti", type: "Rougher", manufacturer: "Kennametal", diameter: "0.750\"", material: "Carbide", coating: "AlTiN", crib: "A-13", qtyOnHand: 3, qtyInUse: 1, minQty: 2, lastGrind: "2024-03-01", nextGrind: "2024-06-01", usageCycles: 15, maxCycles: 40, status: "Active" },
  { id: "ct-004", toolNumber: "T-1004", description: "1\" Face Mill Insert Set", type: "Face Mill", manufacturer: "Sandvik", diameter: "1.000\"", material: "Carbide Insert", coating: "PVD", crib: "B-01", qtyOnHand: 12, qtyInUse: 4, minQty: 6, lastGrind: "N/A", nextGrind: "Replace inserts", usageCycles: 80, maxCycles: 80, status: "Worn" },
  { id: "ct-005", toolNumber: "T-1005", description: "No. 10-32 Thread Mill", type: "Thread Mill", manufacturer: "OSG", diameter: "0.188\"", material: "Carbide", coating: "TiN", crib: "A-14", qtyOnHand: 8, qtyInUse: 0, minQty: 4, lastGrind: "2024-02-28", nextGrind: "2024-05-28", usageCycles: 12, maxCycles: 80, status: "Active" },
  { id: "ct-006", toolNumber: "T-1006", description: "3/8\" Drill — SS/Ti Grade", type: "Drill", manufacturer: "Guhring", diameter: "0.375\"", material: "Carbide", coating: "TiAlN", crib: "A-14", qtyOnHand: 5, qtyInUse: 2, minQty: 3, lastGrind: "2024-03-10", nextGrind: "2024-05-10", usageCycles: 22, maxCycles: 50, status: "Active" },
  { id: "ct-007", toolNumber: "T-1007", description: "1/8\" Micro Endmill — 4FL", type: "End Mill", manufacturer: "Harvey Tool", diameter: "0.125\"", material: "Carbide", coating: "TiB2", crib: "A-15", qtyOnHand: 10, qtyInUse: 1, minQty: 5, lastGrind: "N/A", nextGrind: "Replace only", usageCycles: 5, maxCycles: 30, status: "Active" },
  { id: "ct-008", toolNumber: "T-1008", description: "2\" Shell Mill — Aluminum", type: "Shell Mill", manufacturer: "Sandvik", diameter: "2.000\"", material: "Carbide Insert", coating: "PVD", crib: "B-02", qtyOnHand: 2, qtyInUse: 1, minQty: 1, lastGrind: "2024-01-15", nextGrind: "2024-04-15", usageCycles: 55, maxCycles: 60, status: "In Grind" },
  { id: "ct-009", toolNumber: "T-1009", description: "T-Slot Cutter 1/2\" wide", type: "T-Slot", manufacturer: "Harvey Tool", diameter: "1.000\"", material: "Carbide", coating: "AlTiN", crib: "A-15", qtyOnHand: 2, qtyInUse: 0, minQty: 1, lastGrind: "2023-11-20", nextGrind: "2024-04-20", usageCycles: 38, maxCycles: 40, status: "Worn" },
  { id: "ct-010", toolNumber: "T-1010", description: "Boring Bar — 1.0\" Min Dia", type: "Boring Bar", manufacturer: "Kennametal", diameter: "1.000\"", material: "Carbide", coating: "None", crib: "B-03", qtyOnHand: 3, qtyInUse: 1, minQty: 1, lastGrind: "2024-02-20", nextGrind: "2024-05-20", usageCycles: 18, maxCycles: 60, status: "Active" },
  { id: "ct-011", toolNumber: "T-1011", description: "5/16\" Reamer — 17-4PH Grade", type: "Reamer", manufacturer: "OSG", diameter: "0.3125\"", material: "Carbide", coating: "TiCN", crib: "A-16", qtyOnHand: 4, qtyInUse: 0, minQty: 2, lastGrind: "2024-03-05", nextGrind: "2024-06-05", usageCycles: 8, maxCycles: 50, status: "Active" },
  { id: "ct-012", toolNumber: "T-1012", description: "1/2\" 2-Flute Rougher — AL", type: "Rougher", manufacturer: "SGS Tool", diameter: "0.500\"", material: "Carbide", coating: "ZrN", crib: "A-12", qtyOnHand: 7, qtyInUse: 3, minQty: 4, lastGrind: "2024-03-12", nextGrind: "2024-06-12", usageCycles: 10, maxCycles: 80, status: "Active" },
  { id: "ct-013", toolNumber: "T-1013", description: "Spot Drill 90° — 1/2\" OD", type: "Spot Drill", manufacturer: "Kennametal", diameter: "0.500\"", material: "Carbide", coating: "TiAlN", crib: "A-17", qtyOnHand: 6, qtyInUse: 1, minQty: 3, lastGrind: "N/A", nextGrind: "Replace only", usageCycles: 200, maxCycles: 400, status: "Active" },
  { id: "ct-014", toolNumber: "T-1014", description: "Chamfer Mill 45° 1/2\" OD", type: "Chamfer Mill", manufacturer: "Harvey Tool", diameter: "0.500\"", material: "Carbide", coating: "TiN", crib: "A-17", qtyOnHand: 4, qtyInUse: 0, minQty: 2, lastGrind: "N/A", nextGrind: "Replace only", usageCycles: 75, maxCycles: 200, status: "Active" },
  { id: "ct-015", toolNumber: "T-1015", description: "3/4\" Drill — Coolant Through", type: "Drill", manufacturer: "Guhring", diameter: "0.750\"", material: "Carbide", coating: "TiAlN", crib: "B-04", qtyOnHand: 2, qtyInUse: 1, minQty: 2, lastGrind: "2023-12-10", nextGrind: "2024-03-10", usageCycles: 60, maxCycles: 60, status: "Worn" },
  { id: "ct-016", toolNumber: "T-1016", description: "Lathe Insert CNMG 432 — Ti", type: "Turning Insert", manufacturer: "Sandvik", diameter: "N/A", material: "Carbide Insert", coating: "GC1105", crib: "C-01", qtyOnHand: 20, qtyInUse: 8, minQty: 10, lastGrind: "N/A", nextGrind: "Replace only", usageCycles: 45, maxCycles: 80, status: "Active" },
  { id: "ct-017", toolNumber: "T-1017", description: "Grooving Tool 0.062\" Wide", type: "Grooving", manufacturer: "Iscar", diameter: "N/A", material: "Carbide", coating: "TiN", crib: "C-01", qtyOnHand: 3, qtyInUse: 1, minQty: 2, lastGrind: "2024-02-15", nextGrind: "2024-05-15", usageCycles: 30, maxCycles: 50, status: "Active" },
  { id: "ct-018", toolNumber: "T-1018", description: "Slitting Saw 4\" × 0.062\"", type: "Slitting Saw", manufacturer: "OSG", diameter: "4.000\"", material: "HSS", coating: "None", crib: "B-05", qtyOnHand: 1, qtyInUse: 0, minQty: 1, lastGrind: "2023-10-20", nextGrind: "2024-03-20", usageCycles: 90, maxCycles: 90, status: "In Grind" },
  { id: "ct-019", toolNumber: "T-1019", description: "1\" 3-Flute Endmill — Invar", type: "End Mill", manufacturer: "Kennametal", diameter: "1.000\"", material: "Carbide", coating: "AlTiN", crib: "A-13", qtyOnHand: 2, qtyInUse: 1, minQty: 2, lastGrind: "2024-03-18", nextGrind: "2024-06-18", usageCycles: 4, maxCycles: 30, status: "Active" },
  { id: "ct-020", toolNumber: "T-1020", description: "Parting Tool 0.125\" Wide", type: "Parting", manufacturer: "Iscar", diameter: "N/A", material: "Carbide Insert", coating: "PVD", crib: "C-02", qtyOnHand: 4, qtyInUse: 0, minQty: 2, lastGrind: "N/A", nextGrind: "Replace only", usageCycles: 60, maxCycles: 120, status: "Retired" },
];

export const fixtures: Fixture[] = [
  { id: "fix-001", fixtureNumber: "FIX-101", name: "AD-7841 5-Axis Pallet", description: "Custom tombstone for actuator housing family", parts: ["AD-7841-C", "AD-7841-B"], machine: "Haas UMC-750", location: "Fixture Crib A", condition: "Excellent", lastInspection: "2024-03-01", nextInspection: "2024-06-01", drawing: "FIX-101-REV-B.pdf", notes: "New in Jan 2024. Use anti-seize on mounting bolts." },
  { id: "fix-002", fixtureNumber: "FIX-102", name: "MT-5521 Lathe Collet Chuck", description: "Custom 5C collet for implant trial family", parts: ["MT-5521-A", "MT-5521-B"], machine: "Okuma LB3000", location: "Machine C-02", condition: "Good", lastInspection: "2024-02-15", nextInspection: "2024-05-15", drawing: "FIX-102-REV-A.pdf", notes: "Check runout before each setup." },
  { id: "fix-003", fixtureNumber: "FIX-103", name: "PR-3312 Vise Jaws", description: "Custom soft jaws — aluminum", parts: ["PR-3312-B"], machine: "Haas VF-3", location: "Fixture Crib A", condition: "Good", lastInspection: "2024-01-10", nextInspection: "2024-04-10", drawing: "FIX-103-REV-A.pdf", notes: "" },
  { id: "fix-004", fixtureNumber: "FIX-104", name: "DSG-9901 Precision Angle Plate", description: "Granite angle plate — optical mount family", parts: ["DSG-9901-D"], machine: "Haas VF-5/40T", location: "Cleanroom Storage", condition: "Excellent", lastInspection: "2024-03-10", nextInspection: "2024-06-10", drawing: "FIX-104-REV-C.pdf", notes: "Store in controlled environment. Handle with clean gloves only." },
  { id: "fix-005", fixtureNumber: "FIX-105", name: "General Purpose V-Block Set", description: "V-block pair 2\" and 4\"", parts: [], machine: "Multiple", location: "Fixture Crib B", condition: "Fair", lastInspection: "2023-12-01", nextInspection: "2024-04-01", drawing: "N/A", notes: "Surface has minor rust. Schedule regrind." },
  { id: "fix-006", fixtureNumber: "FIX-106", name: "STI-4422 Nozzle Mandrel", description: "Expanding mandrel for nozzle OD grind", parts: ["STI-4422-A"], machine: "Studer S31 Grinder", location: "Fixture Crib B", condition: "Excellent", lastInspection: "2024-02-20", nextInspection: "2024-05-20", drawing: "FIX-106-REV-A.pdf", notes: "" },
  { id: "fix-007", fixtureNumber: "FIX-107", name: "4th Axis Trunnion — Small", description: "Haas HRT-160 compatible trunnion", parts: [], machine: "Haas VF-3", location: "Machine VF-3", condition: "Good", lastInspection: "2024-01-20", nextInspection: "2024-04-20", drawing: "N/A", notes: "Verify tram monthly." },
  { id: "fix-008", fixtureNumber: "FIX-108", name: "Riser Block Set 1-2-3", description: "Hardened riser blocks — various heights", parts: [], machine: "Multiple", location: "Fixture Crib A", condition: "Excellent", lastInspection: "2024-03-15", nextInspection: "2024-06-15", drawing: "N/A", notes: "" },
  { id: "fix-009", fixtureNumber: "FIX-109", name: "Lathe Steady Rest — 3\"", description: "Fixed steady rest 3\" max bore", parts: [], machine: "Okuma LB3000", location: "Machine C-02", condition: "Poor", lastInspection: "2023-09-01", nextInspection: "2024-03-01", drawing: "N/A", notes: "Bronze bushings worn. Scheduled for rebuild." },
  { id: "fix-010", fixtureNumber: "FIX-110", name: "APC-1140 Transfer Fixture", description: "Op10 to Op20 transfer fixture — valve body", parts: ["APC-1140-C"], machine: "Haas VF-4", location: "Fixture Crib C", condition: "Good", lastInspection: "2024-02-01", nextInspection: "2024-05-01", drawing: "FIX-110-REV-B.pdf", notes: "" },
];

export const gauges: Gauge[] = [
  { id: "g-001", gaugeNumber: "G-201", description: "Digital Micrometer 0-1\"", type: "Micrometer", manufacturer: "Mitutoyo", serialNumber: "SN-291847", range: "0-1.000\"", resolution: "0.00005\"", location: "Inspection Room", lastCalDate: "2024-01-15", nextCalDate: "2024-07-15", calIntervalDays: 180, calHouse: "NIST Cal Lab", certificateNumber: "CAL-2024-0041", calStatus: "OK" },
  { id: "g-002", gaugeNumber: "G-202", description: "Digital Micrometer 1-2\"", type: "Micrometer", manufacturer: "Mitutoyo", serialNumber: "SN-291848", range: "1-2.000\"", resolution: "0.00005\"", location: "Inspection Room", lastCalDate: "2024-01-15", nextCalDate: "2024-07-15", calIntervalDays: 180, calHouse: "NIST Cal Lab", certificateNumber: "CAL-2024-0042", calStatus: "OK" },
  { id: "g-003", gaugeNumber: "G-203", description: "Digital Height Gauge 12\"", type: "Height Gauge", manufacturer: "Starrett", serialNumber: "SN-884211", range: "0-12.000\"", resolution: "0.0001\"", location: "Inspection Room", lastCalDate: "2023-12-10", nextCalDate: "2024-06-10", calIntervalDays: 180, calHouse: "NIST Cal Lab", certificateNumber: "CAL-2023-0088", calStatus: "Due Soon" },
  { id: "g-004", gaugeNumber: "G-204", description: "CMM Renishaw PH10", type: "CMM Probe Head", manufacturer: "Renishaw", serialNumber: "PH10-4821", range: "N/A", resolution: "0.000039\"", location: "Zeiss CMM", lastCalDate: "2024-02-01", nextCalDate: "2024-08-01", calIntervalDays: 180, calHouse: "Renishaw Service", certificateNumber: "RSW-2024-014", calStatus: "OK" },
  { id: "g-005", gaugeNumber: "G-205", description: "Dial Indicator 0-1\" 0.001\"", type: "Dial Indicator", manufacturer: "Starrett", serialNumber: "SN-019482", range: "0-1.000\"", resolution: "0.001\"", location: "Shop Floor Crib", lastCalDate: "2023-09-15", nextCalDate: "2024-03-15", calIntervalDays: 180, calHouse: "Internal", certificateNumber: "INT-2023-009", calStatus: "Overdue" },
  { id: "g-006", gaugeNumber: "G-206", description: "Surface Roughness Tester", type: "Profilometer", manufacturer: "Mitutoyo", serialNumber: "SJ-SN-0182", range: "Ra 0.01-100 μm", resolution: "0.001 μm", location: "Inspection Room", lastCalDate: "2024-03-01", nextCalDate: "2025-03-01", calIntervalDays: 365, calHouse: "Mitutoyo Service", certificateNumber: "MIT-2024-0089", calStatus: "OK" },
  { id: "g-007", gaugeNumber: "G-207", description: "Pin Gauge Set 0.061-0.250\"", type: "Pin Gauge", manufacturer: "Vermont Gage", serialNumber: "SET-VG-0041", range: "0.061-0.250\"", resolution: "0.001\"", location: "Inspection Room", lastCalDate: "2023-10-20", nextCalDate: "2024-04-20", calIntervalDays: 180, calHouse: "Internal", certificateNumber: "INT-2023-012", calStatus: "Due Soon" },
  { id: "g-008", gaugeNumber: "G-208", description: "Thread Ring Gauge 1/4-20 UNC", type: "Thread Ring", manufacturer: "Vermont Gage", serialNumber: "TRG-0281", range: "1/4-20 UNC", resolution: "Go/No-Go", location: "Inspection Room", lastCalDate: "2023-08-10", nextCalDate: "2024-02-10", calIntervalDays: 180, calHouse: "Internal", certificateNumber: "INT-2023-008", calStatus: "Overdue" },
  { id: "g-009", gaugeNumber: "G-209", description: "Optical Comparator 14\"", type: "Comparator", manufacturer: "Starrett", serialNumber: "OC-14-0042", range: "14\" screen", resolution: "0.0001\"", location: "Inspection Room", lastCalDate: "2024-01-20", nextCalDate: "2025-01-20", calIntervalDays: 365, calHouse: "Starrett Service", certificateNumber: "STR-2024-002", calStatus: "OK" },
  { id: "g-010", gaugeNumber: "G-210", description: "Torque Wrench 0-100 ft-lbs", type: "Torque Wrench", manufacturer: "Snap-on", serialNumber: "TW-SN-1842", range: "0-100 ft-lbs", resolution: "1 ft-lb", location: "Assembly Area", lastCalDate: "2024-02-15", nextCalDate: "2024-08-15", calIntervalDays: 180, calHouse: "Internal", certificateNumber: "INT-2024-003", calStatus: "OK" },
  { id: "g-011", gaugeNumber: "G-211", description: "Hardness Tester — Rockwell", type: "Hardness Tester", manufacturer: "Wilson", serialNumber: "HT-WL-0091", range: "HRA, HRB, HRC", resolution: "0.5 HR", location: "Inspection Room", lastCalDate: "2024-03-10", nextCalDate: "2024-09-10", calIntervalDays: 180, calHouse: "Wilson Service", certificateNumber: "WLS-2024-011", calStatus: "OK" },
  { id: "g-012", gaugeNumber: "G-212", description: "Bore Gauge 1.000-2.000\"", type: "Bore Gauge", manufacturer: "Mitutoyo", serialNumber: "BG-SN-0284", range: "1.000-2.000\"", resolution: "0.0001\"", location: "Shop Floor Crib", lastCalDate: "2023-11-01", nextCalDate: "2024-05-01", calIntervalDays: 180, calHouse: "NIST Cal Lab", certificateNumber: "NIST-2023-109", calStatus: "Due Soon" },
];
