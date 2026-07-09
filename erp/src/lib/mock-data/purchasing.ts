export type POStatus = "Draft" | "Sent" | "Acknowledged" | "Partial" | "Complete" | "Cancelled";

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  status: POStatus;
  orderDate: string;
  expectedDate: string;
  total: number;
  lineItems: number;
  notes: string;
}

export interface POLineItem {
  id: string;
  poId: string;
  partNumber: string;
  description: string;
  quantity: number;
  received: number;
  unitCost: number;
  status: "Open" | "Partial" | "Complete";
}

export const purchaseOrders: PurchaseOrder[] = [
  { id: "po-001", poNumber: "PO-2024-0312", supplier: "Titanium Industries", status: "Acknowledged", orderDate: "2024-03-08", expectedDate: "2024-03-22", total: 9250, lineItems: 3, notes: "Expedite Ti-6Al-4V bar stock for WO-2024-0891" },
  { id: "po-002", poNumber: "PO-2024-0313", supplier: "Service Center East", status: "Partial", orderDate: "2024-03-10", expectedDate: "2024-03-20", total: 4100, lineItems: 4, notes: "" },
  { id: "po-003", poNumber: "PO-2024-0314", supplier: "Metals Direct", status: "Complete", orderDate: "2024-02-25", expectedDate: "2024-03-05", total: 2160, lineItems: 2, notes: "Standard aluminum plate replenishment" },
  { id: "po-004", poNumber: "PO-2024-0315", supplier: "Ensinger Plastics", status: "Sent", orderDate: "2024-03-14", expectedDate: "2024-03-28", total: 8500, lineItems: 1, notes: "PEEK rod for spinal cage project" },
  { id: "po-005", poNumber: "PO-2024-0316", supplier: "Industrial Steel Supply", status: "Draft", orderDate: "2024-03-19", expectedDate: "2024-04-05", total: 5040, lineItems: 2, notes: "D2 tool steel blocks — low stock alert triggered" },
  { id: "po-006", poNumber: "PO-2024-0311", supplier: "Astro Pak", status: "Complete", orderDate: "2024-02-15", expectedDate: "2024-02-22", total: 510, lineItems: 1, notes: "Passivation chemistry replenishment" },
  { id: "po-007", poNumber: "PO-2024-0310", supplier: "Kennametal", status: "Complete", orderDate: "2024-02-10", expectedDate: "2024-02-18", total: 1840, lineItems: 5, notes: "Cutting tool replenishment" },
  { id: "po-008", poNumber: "PO-2024-0317", supplier: "Titanium Industries", status: "Draft", orderDate: "2024-03-19", expectedDate: "2024-04-10", total: 6600, lineItems: 2, notes: "CP Ti Grade 4 for cochlear implant program" },
];

export const poLineItems: POLineItem[] = [
  { id: "li-001", poId: "po-001", partNumber: "RAW-TI6AL4V-1.5", description: "Ti-6Al-4V Bar Stock — 1.5\" dia x 12\"", quantity: 30, received: 30, unitCost: 185, status: "Complete" },
  { id: "li-002", poId: "po-001", partNumber: "RAW-TI6AL4V-2.0", description: "Ti-6Al-4V Bar Stock — 2\" dia x 12\"", quantity: 10, received: 10, unitCost: 265, status: "Complete" },
  { id: "li-003", poId: "po-001", partNumber: "RAW-CpTi-GR4", description: "CP Titanium Grade 4 Disc — 2\" dia", quantity: 15, received: 15, unitCost: 220, status: "Complete" },
  { id: "li-004", poId: "po-002", partNumber: "RAW-316LSS-2.0", description: "316L Stainless Bar — 2\" dia x 12\"", quantity: 40, received: 20, unitCost: 62, status: "Partial" },
  { id: "li-005", poId: "po-002", partNumber: "RAW-420SS-PLATE", description: "420 SS Plate — 6x6x0.25\"", quantity: 20, received: 10, unitCost: 95, status: "Partial" },
];

export const suppliers = [
  { id: "s-001", name: "Titanium Industries", contact: "Dave Mercer", email: "d.mercer@titaniumind.com", phone: "800-555-0100", rating: 4.8, leadTime: "10-14 days", onTimeRate: 96 },
  { id: "s-002", name: "Service Center East", contact: "Amy Chu", email: "a.chu@sce-metals.com", phone: "800-555-0101", rating: 4.2, leadTime: "5-7 days", onTimeRate: 88 },
  { id: "s-003", name: "Metals Direct", contact: "Tom Walsh", email: "t.walsh@metalsdirect.com", phone: "800-555-0102", rating: 4.6, leadTime: "3-5 days", onTimeRate: 94 },
  { id: "s-004", name: "Ensinger Plastics", contact: "Lisa Park", email: "l.park@ensinger.com", phone: "800-555-0103", rating: 4.9, leadTime: "7-10 days", onTimeRate: 98 },
  { id: "s-005", name: "Industrial Steel Supply", contact: "Bob Garrett", email: "b.garrett@iss.com", phone: "800-555-0104", rating: 3.9, leadTime: "14-21 days", onTimeRate: 82 },
  { id: "s-006", name: "Kennametal", contact: "Sara Kim", email: "s.kim@kennametal.com", phone: "800-555-0105", rating: 4.7, leadTime: "3-5 days", onTimeRate: 95 },
];
