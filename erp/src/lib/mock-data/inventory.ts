export interface Material {
  id: string;
  partNumber: string;
  description: string;
  type: string;
  onHand: number;
  unit: string;
  minStock: number;
  unitCost: number;
  supplier: string;
  location: string;
  lastReceived: string;
}

export interface Tool {
  id: string;
  toolNumber: string;
  description: string;
  diameter: string;
  material: string;
  quantity: number;
  minQty: number;
  location: string;
  lastUsed: string;
  lifeRemaining: number;
}

export const materials: Material[] = [
  { id: "m-001", partNumber: "RAW-TI6AL4V-1.5", description: "Ti-6Al-4V Bar Stock — 1.5\" dia x 12\"", type: "Bar Stock", onHand: 42, unit: "pcs", minStock: 20, unitCost: 185, supplier: "Titanium Industries", location: "Raw-A1", lastReceived: "2024-03-10" },
  { id: "m-002", partNumber: "RAW-316LSS-2.0", description: "316L Stainless Bar — 2\" dia x 12\"", type: "Bar Stock", onHand: 8, unit: "pcs", minStock: 15, unitCost: 62, supplier: "Service Center East", location: "Raw-A2", lastReceived: "2024-02-28" },
  { id: "m-003", partNumber: "RAW-6061T6-3x3", description: "6061-T6 Aluminum Plate — 3x3x0.5\"", type: "Plate", onHand: 120, unit: "pcs", minStock: 30, unitCost: 18, supplier: "Metals Direct", location: "Raw-B1", lastReceived: "2024-03-05" },
  { id: "m-004", partNumber: "RAW-D2-BLOCK", description: "D2 Tool Steel Block — 4x4x2\"", type: "Block", onHand: 3, unit: "pcs", minStock: 5, unitCost: 420, supplier: "Industrial Steel Supply", location: "Raw-C1", lastReceived: "2024-02-10" },
  { id: "m-005", partNumber: "RAW-PEEK-ROD", description: "PEEK Rod — 1\" dia x 6\"", type: "Rod", onHand: 25, unit: "pcs", minStock: 10, unitCost: 340, supplier: "Ensinger Plastics", location: "Raw-D1", lastReceived: "2024-03-01" },
  { id: "m-006", partNumber: "RAW-CpTi-GR4", description: "CP Titanium Grade 4 Disc — 2\" dia x 1\"", type: "Disc", onHand: 18, unit: "pcs", minStock: 8, unitCost: 220, supplier: "Titanium Industries", location: "Raw-A3", lastReceived: "2024-03-12" },
  { id: "m-007", partNumber: "RAW-420SS-PLATE", description: "420 SS Plate — 6x6x0.25\"", type: "Plate", onHand: 2, unit: "pcs", minStock: 10, unitCost: 95, supplier: "Service Center East", location: "Raw-A4", lastReceived: "2024-01-30" },
  { id: "m-008", partNumber: "CHEM-PASSIVATE", description: "Citric Acid Passivation Solution — 5 gal", type: "Chemical", onHand: 6, unit: "gallons", minStock: 4, unitCost: 85, supplier: "Astro Pak", location: "Chem-Storage", lastReceived: "2024-02-20" },
];

export const tools: Tool[] = [
  { id: "t-001", toolNumber: "TOOL-EM-4FL-0500", description: "4-Flute End Mill — 1/2\" TiAlN", diameter: "0.500\"", material: "Carbide/TiAlN", quantity: 8, minQty: 4, location: "Tool Crib A-12", lastUsed: "2024-03-18", lifeRemaining: 72 },
  { id: "t-002", toolNumber: "TOOL-DRILL-0250", description: "Carbide Drill — 1/4\" 135° split pt", diameter: "0.250\"", material: "Carbide", quantity: 15, minQty: 6, location: "Tool Crib A-14", lastUsed: "2024-03-17", lifeRemaining: 88 },
  { id: "t-003", toolNumber: "TOOL-INSERT-CNMG", description: "Turning Insert CNMG 432 — PVD coated", diameter: "N/A", material: "Carbide PVD", quantity: 2, minQty: 8, location: "Tool Crib B-01", lastUsed: "2024-03-18", lifeRemaining: 20 },
  { id: "t-004", toolNumber: "TOOL-EM-BALL-0250", description: "Ball End Mill — 1/4\" 2-flute", diameter: "0.250\"", material: "Carbide/TiAlN", quantity: 12, minQty: 4, location: "Tool Crib A-15", lastUsed: "2024-03-14", lifeRemaining: 95 },
  { id: "t-005", toolNumber: "TOOL-REAMER-0312", description: "Reamer — 5/16\" HSS-Co", diameter: "0.3125\"", material: "HSS-Co", quantity: 4, minQty: 2, location: "Tool Crib C-04", lastUsed: "2024-03-11", lifeRemaining: 60 },
  { id: "t-006", toolNumber: "TOOL-BORING-1.5", description: "Boring Bar — 1.5\" min bore", diameter: "1.500\"", material: "Carbide", quantity: 3, minQty: 1, location: "Lathe Dept", lastUsed: "2024-03-18", lifeRemaining: 45 },
];
