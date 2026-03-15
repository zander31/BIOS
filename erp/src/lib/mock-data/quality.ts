export type NCRStatus = "Open" | "In Review" | "Corrective Action" | "Closed" | "Voided";

export interface NCR {
  id: string;
  ncrNumber: string;
  workOrder: string;
  partNumber: string;
  partName: string;
  description: string;
  category: "Dimensional" | "Surface" | "Material" | "Process" | "Documentation";
  disposition: "Rework" | "Scrap" | "Use As-Is" | "Pending" | "Return to Supplier";
  status: NCRStatus;
  detectedBy: string;
  assignedTo: string;
  dateOpened: string;
  dateClosed: string | null;
  qty: number;
}

export interface Inspection {
  id: string;
  workOrder: string;
  partNumber: string;
  partName: string;
  type: "First Article" | "In-Process" | "Final" | "Receiving";
  status: "Pass" | "Fail" | "Pending" | "Waiver";
  inspector: string;
  date: string;
  dimensions: number;
  dimensionsPassed: number;
}

export interface QualityDocument {
  id: string;
  docNumber: string;
  title: string;
  type: "Procedure" | "Work Instruction" | "Form" | "Policy" | "Specification";
  revision: string;
  status: "Active" | "Obsolete" | "Draft" | "Under Review";
  owner: string;
  lastRevised: string;
  nextReview: string;
}

export const ncrs: NCR[] = [
  { id: "n-001", ncrNumber: "NCR-2024-0041", workOrder: "WO-2024-0891", partNumber: "MED-4521-A", partName: "Titanium Hip Implant", description: "OD profile 0.003\" over nominal at step diameter — exceeds ±0.001\" tolerance", category: "Dimensional", disposition: "Rework", status: "In Review", detectedBy: "J. Williams", assignedTo: "M. Chen", dateOpened: "2024-03-14", dateClosed: null, qty: 2 },
  { id: "n-002", ncrNumber: "NCR-2024-0042", workOrder: "WO-2024-0892", partNumber: "SURG-0033-B", partName: "Surgical Clamp Handle", description: "Surface roughness Ra 32 μin where Ra 16 μin required on grip section", category: "Surface", disposition: "Rework", status: "Corrective Action", detectedBy: "K. Torres", assignedTo: "K. Torres", dateOpened: "2024-03-10", dateClosed: null, qty: 8 },
  { id: "n-003", ncrNumber: "NCR-2024-0039", workOrder: "WO-2024-0888", partNumber: "ORTH-0887-A", partName: "Knee Brace Bracket", description: "Anodize color spec — Type II anodize shows inconsistent color batch", category: "Surface", disposition: "Use As-Is", status: "Closed", detectedBy: "M. Chen", assignedTo: "V. Patel", dateOpened: "2024-03-02", dateClosed: "2024-03-12", qty: 5 },
  { id: "n-004", ncrNumber: "NCR-2024-0043", workOrder: "WO-2024-0895", partNumber: "NEURO-3301-D", partName: "Neuro Electrode Array", description: "Material cert missing from incoming shipment — Pt-Ir alloy composition unverified", category: "Material", disposition: "Return to Supplier", status: "Open", detectedBy: "V. Patel", assignedTo: "R. Johnson", dateOpened: "2024-03-16", dateClosed: null, qty: 1 },
  { id: "n-005", ncrNumber: "NCR-2024-0040", workOrder: "WO-2024-0889", partNumber: "CARD-1102-C", partName: "Cardiac Device Housing", description: "Thread gaging failure — M2.5x0.45 thread not meeting Go gauge", category: "Dimensional", disposition: "Scrap", status: "Closed", detectedBy: "J. Williams", assignedTo: "J. Williams", dateOpened: "2024-03-08", dateClosed: "2024-03-15", qty: 1 },
  { id: "n-006", ncrNumber: "NCR-2024-0044", workOrder: "WO-2024-0897", partNumber: "ENDO-5500-A", partName: "Endoscope Distal Tip", description: "Passivation test failure — traces of iron detected on 316L surface via water break test", category: "Process", disposition: "Rework", status: "Open", detectedBy: "M. Chen", assignedTo: "M. Chen", dateOpened: "2024-03-19", dateClosed: null, qty: 4 },
];

export const inspections: Inspection[] = [
  { id: "i-001", workOrder: "WO-2024-0891", partNumber: "MED-4521-A", partName: "Titanium Hip Implant", type: "First Article", status: "Pending", inspector: "J. Williams", date: "2024-03-20", dimensions: 42, dimensionsPassed: 0 },
  { id: "i-002", workOrder: "WO-2024-0892", partNumber: "SURG-0033-B", partName: "Surgical Clamp Handle", type: "In-Process", status: "Fail", inspector: "K. Torres", date: "2024-03-14", dimensions: 18, dimensionsPassed: 15 },
  { id: "i-003", workOrder: "WO-2024-0894", partNumber: "ORTH-0887-A", partName: "Knee Brace Bracket", type: "Final", status: "Pass", inspector: "V. Patel", date: "2024-03-19", dimensions: 24, dimensionsPassed: 24 },
  { id: "i-004", workOrder: "WO-2024-0897", partNumber: "ENDO-5500-A", partName: "Endoscope Distal Tip", type: "In-Process", status: "Pass", inspector: "M. Chen", date: "2024-03-17", dimensions: 30, dimensionsPassed: 30 },
  { id: "i-005", workOrder: "WO-2024-0893", partNumber: "CARD-1102-C", partName: "Cardiac Device Housing", type: "Receiving", status: "Pass", inspector: "R. Johnson", date: "2024-03-13", dimensions: 12, dimensionsPassed: 12 },
  { id: "i-006", workOrder: "WO-2024-0895", partNumber: "NEURO-3301-D", partName: "Neuro Electrode Array", type: "Receiving", status: "Pending", inspector: "V. Patel", date: "2024-03-21", dimensions: 8, dimensionsPassed: 0 },
];

export const qualityDocuments: QualityDocument[] = [
  { id: "d-001", docNumber: "QP-001", title: "Quality Management System Manual", type: "Policy", revision: "F", status: "Active", owner: "Quality Director", lastRevised: "2024-01-15", nextReview: "2025-01-15" },
  { id: "d-002", docNumber: "WI-CNC-001", title: "CNC Machining Setup Procedure", type: "Work Instruction", revision: "C", status: "Active", owner: "M. Chen", lastRevised: "2023-11-08", nextReview: "2024-11-08" },
  { id: "d-003", docNumber: "SOP-INSPECT-005", title: "CMM Inspection Procedure — Medical Parts", type: "Procedure", revision: "D", status: "Active", owner: "J. Williams", lastRevised: "2024-02-01", nextReview: "2025-02-01" },
  { id: "d-004", docNumber: "FORM-NCR-001", title: "Non-Conformance Report Form", type: "Form", revision: "B", status: "Active", owner: "Quality Director", lastRevised: "2023-09-20", nextReview: "2024-09-20" },
  { id: "d-005", docNumber: "SPEC-PASSIVATION-01", title: "Passivation Process Specification per ASTM A967", type: "Specification", revision: "A", status: "Active", owner: "K. Torres", lastRevised: "2023-12-10", nextReview: "2024-12-10" },
  { id: "d-006", docNumber: "WI-PACKAGING-002", title: "Medical Device Packaging & Labeling Procedure", type: "Work Instruction", revision: "E", status: "Under Review", owner: "V. Patel", lastRevised: "2024-03-01", nextReview: "2024-04-01" },
  { id: "d-007", docNumber: "QP-SUPPLIER-003", title: "Supplier Qualification Procedure", type: "Procedure", revision: "B", status: "Active", owner: "R. Johnson", lastRevised: "2023-07-14", nextReview: "2024-07-14" },
  { id: "d-008", docNumber: "SOP-CLEAN-010", title: "Cleanroom Entry & Gowning Procedure", type: "Procedure", revision: "C", status: "Draft", owner: "Quality Director", lastRevised: "2024-03-10", nextReview: "2024-04-10" },
];
