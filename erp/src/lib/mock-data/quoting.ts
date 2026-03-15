export interface QuoteLineItem {
  id: string;
  operation: string;
  description: string;
  estHours: number;
  laborRate: number;
  overhead: number;
  outsideProcessing: number;
  total: number;
}

export interface QuoteBOMItem {
  id: string;
  partNumber: string;
  description: string;
  material: string;
  qty: number;
  unitCost: number;
  total: number;
}

export interface QuoteHistory {
  date: string;
  user: string;
  action: string;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  customer: string;
  contact: string;
  partNumber: string;
  partDescription: string;
  revision: string;
  quantities: number[];
  requestedDate: string;
  expiresDate: string;
  leadTimeDays: number;
  unitPrice: number;
  nreCost: number;
  totalMaterial: number;
  totalLabor: number;
  totalOutside: number;
  totalOverhead: number;
  margin: number;
  status: "Draft" | "Sent" | "Won" | "Lost" | "Expired";
  notes: string;
  lineItems: QuoteLineItem[];
  bom: QuoteBOMItem[];
  history: QuoteHistory[];
}

export const quotes: Quote[] = [
  {
    id: "q-001",
    quoteNumber: "Q-2024-0041",
    customer: "Aerospace Dynamics",
    contact: "Mark Holloway",
    partNumber: "AD-7841-C",
    partDescription: "Actuator Housing — Titanium",
    revision: "C",
    quantities: [5, 10, 25],
    requestedDate: "2024-03-28",
    expiresDate: "2024-04-28",
    leadTimeDays: 35,
    unitPrice: 2840.0,
    nreCost: 1200.0,
    totalMaterial: 8400.0,
    totalLabor: 6200.0,
    totalOutside: 1800.0,
    totalOverhead: 3100.0,
    margin: 28.4,
    status: "Sent",
    notes: "Customer requires AS9100 cert package with delivery.",
    lineItems: [
      { id: "li-001", operation: "Setup", description: "5-Axis Setup & Fixturing", estHours: 3.5, laborRate: 95, overhead: 38, outsideProcessing: 0, total: 461.25 },
      { id: "li-002", operation: "Rough Mill", description: "Rough Contour — Ti-6Al-4V", estHours: 4.2, laborRate: 95, overhead: 38, outsideProcessing: 0, total: 553.5 },
      { id: "li-003", operation: "Finish Mill", description: "Finish all surfaces ±0.001", estHours: 5.8, laborRate: 95, overhead: 38, outsideProcessing: 0, total: 764.5 },
      { id: "li-004", operation: "Drill/Tap", description: "All hole features per print", estHours: 1.5, laborRate: 95, overhead: 38, outsideProcessing: 0, total: 197.25 },
      { id: "li-005", operation: "Deburr/Clean", description: "Hand deburr & ultrasonic clean", estHours: 0.8, laborRate: 65, overhead: 26, outsideProcessing: 0, total: 73.0 },
      { id: "li-006", operation: "Anodize", description: "Type II hard anodize — outside", estHours: 0, laborRate: 0, overhead: 0, outsideProcessing: 380, total: 380.0 },
      { id: "li-007", operation: "Inspection", description: "CMM first article + in-process", estHours: 2.0, laborRate: 85, overhead: 34, outsideProcessing: 0, total: 238.0 },
    ],
    bom: [
      { id: "b-001", partNumber: "TI-6AL4V-2.5SQ", description: "Ti-6Al-4V Billet 2.5\" Sq", material: "Titanium", qty: 1, unitCost: 420.0, total: 420.0 },
      { id: "b-002", partNumber: "TOOL-ENDMILL-0.5", description: "1/2\" TiAlN Coated Endmill", material: "Carbide", qty: 2, unitCost: 68.0, total: 136.0 },
      { id: "b-003", partNumber: "MISC-CONSUMABLES", description: "Cutting fluid, fixturing hardware", material: "Misc", qty: 1, unitCost: 45.0, total: 45.0 },
    ],
    history: [
      { date: "2024-03-15", user: "Jake Morrison", action: "Quote created" },
      { date: "2024-03-18", user: "Jake Morrison", action: "Operations and BOM added" },
      { date: "2024-03-20", user: "Carey Bryant", action: "Approved and sent to customer" },
    ],
  },
  {
    id: "q-002",
    quoteNumber: "Q-2024-0040",
    customer: "MedTech Solutions",
    contact: "Sarah Chen",
    partNumber: "MT-5521-A",
    partDescription: "Implant Trial — SS 17-4 PH",
    revision: "A",
    quantities: [50, 100],
    requestedDate: "2024-03-22",
    expiresDate: "2024-04-22",
    leadTimeDays: 21,
    unitPrice: 418.0,
    nreCost: 800.0,
    totalMaterial: 2800.0,
    totalLabor: 4200.0,
    totalOutside: 600.0,
    totalOverhead: 2100.0,
    margin: 31.2,
    status: "Won",
    notes: "ISO 13485 certificate required. Customer PO received 3/22.",
    lineItems: [
      { id: "li-011", operation: "Setup", description: "CNC Lathe Setup", estHours: 1.5, laborRate: 95, overhead: 38, outsideProcessing: 0, total: 197.25 },
      { id: "li-012", operation: "Turn OD", description: "Turn all diameters per print", estHours: 2.8, laborRate: 95, overhead: 38, outsideProcessing: 0, total: 368.9 },
      { id: "li-013", operation: "Mill Features", description: "Mill slots and cross-holes", estHours: 1.8, laborRate: 95, overhead: 38, outsideProcessing: 0, total: 237.15 },
      { id: "li-014", operation: "Passivate", description: "Passivation per ASTM A967", estHours: 0, laborRate: 0, overhead: 0, outsideProcessing: 120, total: 120.0 },
      { id: "li-015", operation: "Inspection", description: "Dimensional + visual per drawing", estHours: 0.5, laborRate: 85, overhead: 34, outsideProcessing: 0, total: 59.5 },
    ],
    bom: [
      { id: "b-011", partNumber: "SS-17-4PH-BAR-1.5", description: "17-4 PH SS Bar 1.5\" Dia", material: "Stainless Steel", qty: 1, unitCost: 38.0, total: 38.0 },
    ],
    history: [
      { date: "2024-03-10", user: "Jake Morrison", action: "Quote created" },
      { date: "2024-03-14", user: "Carey Bryant", action: "Approved and sent" },
      { date: "2024-03-22", user: "System", action: "Customer accepted — PO received" },
    ],
  },
  {
    id: "q-003",
    quoteNumber: "Q-2024-0039",
    customer: "Precision Robotics",
    contact: "Tom Vance",
    partNumber: "PR-3312-B",
    partDescription: "Servo Bracket — 6061-T6",
    revision: "B",
    quantities: [20, 50, 100],
    requestedDate: "2024-03-20",
    expiresDate: "2024-04-15",
    leadTimeDays: 14,
    unitPrice: 185.0,
    nreCost: 0,
    totalMaterial: 1200.0,
    totalLabor: 1800.0,
    totalOutside: 0,
    totalOverhead: 900.0,
    margin: 22.0,
    status: "Lost",
    notes: "Customer went with lower-cost competitor. Margin was too thin.",
    lineItems: [
      { id: "li-021", operation: "Setup", description: "3-Axis Setup", estHours: 0.5, laborRate: 85, overhead: 34, outsideProcessing: 0, total: 59.5 },
      { id: "li-022", operation: "Mill All", description: "Mill all features per print", estHours: 1.2, laborRate: 85, overhead: 34, outsideProcessing: 0, total: 142.8 },
      { id: "li-023", operation: "Deburr", description: "Deburr & inspect", estHours: 0.3, laborRate: 65, overhead: 26, outsideProcessing: 0, total: 27.3 },
    ],
    bom: [
      { id: "b-021", partNumber: "AL-6061-T6-PLATE", description: "6061-T6 Aluminum Plate 0.75\"", material: "Aluminum", qty: 1, unitCost: 22.0, total: 22.0 },
    ],
    history: [
      { date: "2024-03-08", user: "Jake Morrison", action: "Quote created" },
      { date: "2024-03-09", user: "Carey Bryant", action: "Approved and sent" },
      { date: "2024-03-20", user: "Jake Morrison", action: "Customer declined — lost to competitor" },
    ],
  },
  {
    id: "q-004",
    quoteNumber: "Q-2024-0042",
    customer: "Defense Systems Group",
    contact: "Col. Ray Torres",
    partNumber: "DSG-9901-D",
    partDescription: "Optical Mount — Invar 36",
    revision: "D",
    quantities: [2, 4],
    requestedDate: "2024-04-10",
    expiresDate: "2024-05-10",
    leadTimeDays: 60,
    unitPrice: 12400.0,
    nreCost: 4800.0,
    totalMaterial: 14000.0,
    totalLabor: 18000.0,
    totalOutside: 3200.0,
    totalOverhead: 9000.0,
    margin: 34.0,
    status: "Draft",
    notes: "ITAR controlled. Requires export license verification before sending.",
    lineItems: [
      { id: "li-031", operation: "Planning", description: "Engineering review & process planning", estHours: 8.0, laborRate: 120, overhead: 48, outsideProcessing: 0, total: 1344.0 },
      { id: "li-032", operation: "Rough Mill", description: "Rough profile — Invar 36", estHours: 12.0, laborRate: 95, overhead: 38, outsideProcessing: 0, total: 1596.0 },
      { id: "li-033", operation: "Age/Stress Relief", description: "Thermal stress relief cycle", estHours: 0, laborRate: 0, overhead: 0, outsideProcessing: 800, total: 800.0 },
      { id: "li-034", operation: "Finish Mill", description: "Finish all critical surfaces", estHours: 18.0, laborRate: 95, overhead: 38, outsideProcessing: 0, total: 2394.0 },
      { id: "li-035", operation: "CMM Inspection", description: "Full CMM report + FAI package", estHours: 6.0, laborRate: 95, overhead: 38, outsideProcessing: 0, total: 798.0 },
    ],
    bom: [
      { id: "b-031", partNumber: "INVAR-36-BLOCK", description: "Invar 36 Block 6\"×6\"×4\"", material: "Invar 36", qty: 1, unitCost: 1850.0, total: 1850.0 },
    ],
    history: [
      { date: "2024-03-19", user: "Jake Morrison", action: "Quote created — awaiting ITAR clearance" },
    ],
  },
  {
    id: "q-005",
    quoteNumber: "Q-2024-0043",
    customer: "SpaceTech Industries",
    contact: "Elena Novak",
    partNumber: "STI-4422-A",
    partDescription: "Thruster Nozzle — Inconel 625",
    revision: "A",
    quantities: [3, 6, 12],
    requestedDate: "2024-04-20",
    expiresDate: "2024-05-20",
    leadTimeDays: 45,
    unitPrice: 6200.0,
    nreCost: 2400.0,
    totalMaterial: 9600.0,
    totalLabor: 11200.0,
    totalOutside: 1800.0,
    totalOverhead: 5600.0,
    margin: 30.5,
    status: "Sent",
    notes: "AS9100 + NADCAP heat treat required.",
    lineItems: [
      { id: "li-041", operation: "Lathe OD", description: "Turn nozzle OD contour", estHours: 8.0, laborRate: 95, overhead: 38, outsideProcessing: 0, total: 1064.0 },
      { id: "li-042", operation: "EDM", description: "EDM cooling holes pattern", estHours: 6.0, laborRate: 110, overhead: 44, outsideProcessing: 0, total: 924.0 },
      { id: "li-043", operation: "NADCAP Heat Treat", description: "Solution anneal — outside vendor", estHours: 0, laborRate: 0, overhead: 0, outsideProcessing: 600, total: 600.0 },
      { id: "li-044", operation: "Grind", description: "OD grind to final dimension", estHours: 3.0, laborRate: 95, overhead: 38, outsideProcessing: 0, total: 399.0 },
      { id: "li-045", operation: "Inspection", description: "CMM + fluorescent penetrant", estHours: 2.5, laborRate: 85, overhead: 34, outsideProcessing: 0, total: 297.5 },
    ],
    bom: [
      { id: "b-041", partNumber: "IN625-BAR-3DIA", description: "Inconel 625 Bar 3\" Dia", material: "Inconel 625", qty: 1, unitCost: 980.0, total: 980.0 },
    ],
    history: [
      { date: "2024-03-21", user: "Jake Morrison", action: "Quote created" },
      { date: "2024-03-22", user: "Carey Bryant", action: "Approved and sent" },
    ],
  },
  {
    id: "q-006",
    quoteNumber: "Q-2024-0038",
    customer: "AutoPrecision Corp",
    contact: "David Kim",
    partNumber: "APC-1140-C",
    partDescription: "Transmission Valve Body — Aluminum",
    revision: "C",
    quantities: [100, 250, 500],
    requestedDate: "2024-03-15",
    expiresDate: "2024-04-01",
    leadTimeDays: 28,
    unitPrice: 124.0,
    nreCost: 1500.0,
    totalMaterial: 4800.0,
    totalLabor: 7200.0,
    totalOutside: 0,
    totalOverhead: 3600.0,
    margin: 24.0,
    status: "Expired",
    notes: "Customer did not respond before expiry. Follow up recommended.",
    lineItems: [
      { id: "li-051", operation: "Setup", description: "4th axis setup + vice", estHours: 0.75, laborRate: 85, overhead: 34, outsideProcessing: 0, total: 89.25 },
      { id: "li-052", operation: "Mill All", description: "Mill all bores, faces, ports", estHours: 2.5, laborRate: 85, overhead: 34, outsideProcessing: 0, total: 297.5 },
      { id: "li-053", operation: "Deburr/Wash", description: "Aqueous wash cycle", estHours: 0.25, laborRate: 65, overhead: 26, outsideProcessing: 0, total: 22.75 },
    ],
    bom: [
      { id: "b-051", partNumber: "AL-380-CAST-BLANK", description: "A380 Aluminum Cast Blank", material: "Aluminum", qty: 1, unitCost: 18.5, total: 18.5 },
    ],
    history: [
      { date: "2024-03-01", user: "Jake Morrison", action: "Quote created" },
      { date: "2024-03-03", user: "Carey Bryant", action: "Approved and sent" },
      { date: "2024-04-01", user: "System", action: "Quote expired — no customer response" },
    ],
  },
];
