export interface Part {
  id: string;
  partNumber: string;
  revision: string;
  name: string;
  description: string;
  material: string;
  customer: string;
  unitCost: number;
  cycleTime: number;
  lastRun: string;
  timesRun: number;
  routingSteps: number;
  category: string;
}

export const parts: Part[] = [
  { id: "p-001", partNumber: "MED-4521-A", revision: "C", name: "Titanium Hip Implant — Left", description: "Grade 5 Ti-6Al-4V hip implant stem, left orientation", material: "Ti-6Al-4V", customer: "Stryker Medical", unitCost: 420, cycleTime: 140, lastRun: "2024-03-08", timesRun: 48, routingSteps: 7, category: "Orthopedic" },
  { id: "p-002", partNumber: "SURG-0033-B", revision: "A", name: "Surgical Clamp Handle", description: "316L SS ergonomic handle for laparoscopic clamp", material: "316L SS", customer: "Medtronic", unitCost: 38, cycleTime: 22, lastRun: "2024-03-05", timesRun: 204, routingSteps: 5, category: "Surgical" },
  { id: "p-003", partNumber: "CARD-1102-C", revision: "B", name: "Cardiac Device Housing", description: "Hermetically-sealed Ti housing for pacemaker", material: "Commercially Pure Ti", customer: "Abbott Labs", unitCost: 1200, cycleTime: 320, lastRun: "2024-02-20", timesRun: 12, routingSteps: 9, category: "Cardiac" },
  { id: "p-004", partNumber: "ORTH-0887-A", revision: "D", name: "Knee Brace Bracket", description: "Anodized 6061-T6 aluminum structural bracket", material: "6061-T6 Aluminum", customer: "Zimmer Biomet", unitCost: 72, cycleTime: 38, lastRun: "2024-03-01", timesRun: 312, routingSteps: 6, category: "Orthopedic" },
  { id: "p-005", partNumber: "NEURO-3301-D", revision: "A", name: "Neuro Electrode Array", description: "Precision-machined platinum-iridium electrode substrate", material: "Pt-Ir Alloy", customer: "Boston Scientific", unitCost: 3550, cycleTime: 480, lastRun: "2024-03-15", timesRun: 6, routingSteps: 11, category: "Neurological" },
  { id: "p-006", partNumber: "DENT-0021-B", revision: "B", name: "Dental Drill Body", description: "High-speed stainless dental handpiece body", material: "17-4 PH SS", customer: "Dentsply Sirona", unitCost: 34, cycleTime: 28, lastRun: "2024-02-28", timesRun: 580, routingSteps: 5, category: "Dental" },
  { id: "p-007", partNumber: "ENDO-5500-A", revision: "C", name: "Endoscope Distal Tip", description: "Mirror-polished 304 SS endoscope distal assembly", material: "304 SS", customer: "Karl Storz", unitCost: 340, cycleTime: 95, lastRun: "2024-03-10", timesRun: 88, routingSteps: 8, category: "Endoscopy" },
  { id: "p-008", partNumber: "SPIN-2211-C", revision: "A", name: "Spinal Fusion Cage", description: "PEEK-reinforced TLIF spinal cage, 26mm", material: "PEEK / Ti insert", customer: "NuVasive", unitCost: 1483, cycleTime: 220, lastRun: "2024-03-19", timesRun: 22, routingSteps: 8, category: "Spinal" },
  { id: "p-009", partNumber: "VASC-0041-A", revision: "B", name: "Vascular Stent Mold Insert", description: "Tool-steel insert for nitinol stent forming die", material: "D2 Tool Steel", customer: "Cook Medical", unitCost: 1550, cycleTime: 280, lastRun: "2024-03-14", timesRun: 4, routingSteps: 9, category: "Vascular" },
  { id: "p-010", partNumber: "DIAG-7700-B", revision: "A", name: "Diagnostic Probe Housing", description: "Ultrasound probe housing — medical-grade polycarbonate over-mold insert", material: "420 SS", customer: "Philips Healthcare", unitCost: 180, cycleTime: 72, lastRun: "2024-02-15", timesRun: 34, routingSteps: 6, category: "Diagnostic" },
  { id: "p-011", partNumber: "IMPL-9900-A", revision: "B", name: "Cochlear Implant Housing", description: "Grade 4 CP titanium cochlear device shell", material: "CP Ti Grade 4", customer: "Cochlear Ltd", unitCost: 2800, cycleTime: 390, lastRun: "2024-01-30", timesRun: 8, routingSteps: 10, category: "Neurological" },
  { id: "p-012", partNumber: "OPTH-1140-A", revision: "A", name: "IOL Positioning Forceps", description: "Micro-forceps for intraocular lens placement", material: "Titanium Grade 5", customer: "Alcon", unitCost: 95, cycleTime: 55, lastRun: "2024-03-06", timesRun: 140, routingSteps: 6, category: "Ophthalmic" },
];
