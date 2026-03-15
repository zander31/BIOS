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

export type CAPAStatus = "Open" | "In Review" | "Pending Verification" | "Closed";
export type CAPASource = "NCR" | "Customer Complaint" | "Internal Audit" | "Supplier Issue" | "Preventive";

export interface CAPA {
  id: string;
  capaNumber: string;
  source: CAPASource;
  linkedNcr?: string;
  description: string;
  immediateAction: string;
  rootCause: string;
  whyOne: string;
  whyTwo: string;
  whyThree: string;
  whyFour: string;
  whyFive: string;
  correctiveAction: string;
  preventiveAction: string;
  assignedTo: string;
  openedDate: string;
  dueDate: string;
  closedDate?: string;
  effectivenessChecked: boolean;
  effectivenessDate?: string;
  status: CAPAStatus;
}

export type AuditType = "Internal" | "External" | "Customer" | "Supplier";
export type AuditStatus = "Scheduled" | "In Progress" | "Complete" | "Cancelled";

export interface Audit {
  id: string;
  auditNumber: string;
  type: AuditType;
  scope: string;
  leadAuditor: string;
  auditTeam: string[];
  scheduledDate: string;
  completedDate?: string;
  findings: number;
  majorFindings: number;
  minorFindings: number;
  observations: number;
  status: AuditStatus;
  notes: string;
}

export const capas: CAPA[] = [
  {
    id: "capa-001",
    capaNumber: "CAPA-2024-001",
    source: "NCR",
    linkedNcr: "NCR-2024-0041",
    description: "Recurring dimensional non-conformance on Ti hip implant OD profile — 3rd occurrence this quarter",
    immediateAction: "Quarantine all parts from WO-2024-0891. Perform 100% inspection prior to release.",
    rootCause: "Worn tooling not flagged by operator — tool life threshold not monitored in system.",
    whyOne: "OD dimension exceeded tolerance by 0.003\"",
    whyTwo: "Cutting tool was worn beyond acceptable runout spec",
    whyThree: "Tool life counter was not set in CNC program",
    whyFour: "No standard tool life management process exists for Ti alloys",
    whyFive: "Process parameter sheet does not include tool life requirements",
    correctiveAction: "Update all Ti machining process sheets to include mandatory tool life limits per material. Add tool life check to setup sign-off sheet.",
    preventiveAction: "Implement tool life management module in ProShop for all critical materials. Monthly audit of tool life compliance.",
    assignedTo: "Marcus Chen",
    openedDate: "2024-03-15",
    dueDate: "2024-04-15",
    effectivenessChecked: false,
    status: "In Review",
  },
  {
    id: "capa-002",
    capaNumber: "CAPA-2024-002",
    source: "NCR",
    linkedNcr: "NCR-2024-0042",
    description: "Surface roughness out of spec on surgical clamp grip — Ra 32 vs Ra 16 required",
    immediateAction: "Hold and re-inspect all affected parts. Rework grip section with finer finishing pass.",
    rootCause: "Surface finish spec not communicated to operator — work instruction was vague.",
    whyOne: "Ra 32 measured where Ra 16 required",
    whyTwo: "Operator used wrong feed rate for final pass",
    whyThree: "Feed rate for finish was not specified on routing",
    whyFour: "Work instruction was written without specific CNC parameters",
    whyFive: "No review process for completeness of work instructions",
    correctiveAction: "Update WI-CNC-001 to include specific CNC parameters for medical surface finish requirements. Add Ra requirement to all routing operation notes.",
    preventiveAction: "All new part routings require QE sign-off confirming surface finish specs are included before first run.",
    assignedTo: "Kevin Torres",
    openedDate: "2024-03-12",
    dueDate: "2024-04-05",
    effectivenessChecked: false,
    status: "Open",
  },
  {
    id: "capa-003",
    capaNumber: "CAPA-2024-003",
    source: "Customer Complaint",
    description: "Customer reported rust spots on 316L passivated parts received Feb 2024",
    immediateAction: "Issue Field Corrective Action notification. Retrieve all potentially affected parts from customer.",
    rootCause: "Passivation bath concentration had drifted below specification — pH not logged consistently.",
    whyOne: "Rust observed on 316L passivated surface",
    whyTwo: "Passivation did not fully remove iron from surface",
    whyThree: "Bath concentration was below ASTM A967 requirement",
    whyFour: "Bath solution not checked before processing",
    whyFive: "No documented procedure requiring pre-batch solution verification",
    correctiveAction: "Create SOP for passivation bath verification before each run. Update SPEC-PASSIVATION-01 to include pre-batch check requirements.",
    preventiveAction: "Install continuous pH monitoring with alarm for passivation bath. Weekly bath analysis by certified lab.",
    assignedTo: "Kevin Torres",
    openedDate: "2024-02-28",
    dueDate: "2024-03-28",
    closedDate: "2024-03-20",
    effectivenessChecked: true,
    effectivenessDate: "2024-04-20",
    status: "Closed",
  },
  {
    id: "capa-004",
    capaNumber: "CAPA-2024-004",
    source: "Internal Audit",
    description: "Internal audit finding: calibration records not being maintained for 3 gauges in shop",
    immediateAction: "Send all 3 out-of-cal gauges to calibration lab immediately. Remove from service.",
    rootCause: "Calibration due dates not tracked in a visible system — paper log not being reviewed.",
    whyOne: "Three gauges found without current calibration",
    whyTwo: "Cal due dates passed unnoticed",
    whyThree: "Paper calibration log not reviewed regularly",
    whyFour: "No system generates alerts for upcoming calibrations",
    whyFive: "Calibration management not part of any regular process",
    correctiveAction: "Enter all calibration records into ProShop maintenance module. Assign calibration tracking to QE.",
    preventiveAction: "Monthly calibration status report generated and reviewed in QMS meeting. Automated email alert 30 days before cal due.",
    assignedTo: "Jennifer Williams",
    openedDate: "2024-03-05",
    dueDate: "2024-04-05",
    effectivenessChecked: false,
    status: "Pending Verification",
  },
  {
    id: "capa-005",
    capaNumber: "CAPA-2024-005",
    source: "Preventive",
    description: "Proactive CAPA to improve on-time delivery performance — OTD currently at 87%, target 95%",
    immediateAction: "Conduct root cause analysis of last 10 late shipments.",
    rootCause: "Scheduling changes not communicated to purchasing — material shortages causing delays.",
    whyOne: "On-time delivery at 87% vs 95% target",
    whyTwo: "Jobs delayed due to missing raw material",
    whyThree: "Purchasing not notified of schedule changes",
    whyFour: "No automated link between scheduling and purchasing requirements",
    whyFive: "Scheduling and purchasing systems operated independently",
    correctiveAction: "Enable live purchasing requirements dashboard in ProShop. Purchasing team to review requirements daily.",
    preventiveAction: "Weekly cross-functional meeting — scheduling, purchasing, and ops. OTD tracked as KPI in weekly management review.",
    assignedTo: "Tom Bradley",
    openedDate: "2024-03-18",
    dueDate: "2024-04-30",
    effectivenessChecked: false,
    status: "Open",
  },
];

export const audits: Audit[] = [
  {
    id: "aud-001",
    auditNumber: "AUD-2024-001",
    type: "Internal",
    scope: "Section 8.5 — Production and Service Provision (ISO 13485)",
    leadAuditor: "Jennifer Williams",
    auditTeam: ["Kevin Torres"],
    scheduledDate: "2024-03-05",
    completedDate: "2024-03-06",
    findings: 4,
    majorFindings: 0,
    minorFindings: 3,
    observations: 1,
    status: "Complete",
    notes: "3 minor findings issued — all related to calibration record gaps and work instruction completeness. CAPAs opened.",
  },
  {
    id: "aud-002",
    auditNumber: "AUD-2024-002",
    type: "Internal",
    scope: "Section 7.4 — Purchasing (ISO 13485)",
    leadAuditor: "Kevin Torres",
    auditTeam: ["Tom Bradley"],
    scheduledDate: "2024-04-10",
    completedDate: undefined,
    findings: 0,
    majorFindings: 0,
    minorFindings: 0,
    observations: 0,
    status: "Scheduled",
    notes: "",
  },
  {
    id: "aud-003",
    auditNumber: "AUD-2024-003",
    type: "External",
    scope: "ISO 13485:2016 Surveillance Audit",
    leadAuditor: "BSI Group Auditor",
    auditTeam: ["Jennifer Williams", "Kevin Torres", "Carey Bryant"],
    scheduledDate: "2024-05-15",
    completedDate: undefined,
    findings: 0,
    majorFindings: 0,
    minorFindings: 0,
    observations: 0,
    status: "Scheduled",
    notes: "Annual surveillance audit. Prepare audit pack by 5/1.",
  },
  {
    id: "aud-004",
    auditNumber: "AUD-2024-004",
    type: "Customer",
    scope: "Supplier Quality Audit — MedTech Solutions",
    leadAuditor: "Sarah Chen (MedTech)",
    auditTeam: ["Kevin Torres", "Marcus Chen"],
    scheduledDate: "2024-04-22",
    completedDate: undefined,
    findings: 0,
    majorFindings: 0,
    minorFindings: 0,
    observations: 0,
    status: "Scheduled",
    notes: "Customer requested audit of our machining processes for MT-5521 family.",
  },
  {
    id: "aud-005",
    auditNumber: "AUD-2023-008",
    type: "Supplier",
    scope: "Supplier Qualification — Anodize Plus Inc.",
    leadAuditor: "Robert Johnson",
    auditTeam: ["Kevin Torres"],
    scheduledDate: "2023-11-15",
    completedDate: "2023-11-15",
    findings: 2,
    majorFindings: 0,
    minorFindings: 1,
    observations: 1,
    status: "Complete",
    notes: "Supplier approved with conditions. 1 minor finding — passivation log gaps. Follow-up visit scheduled Q2 2024.",
  },
];
