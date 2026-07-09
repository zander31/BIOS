export interface Customer {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  industry: string;
  activeOrders: number;
  ytdRevenue: number;
  lastOrder: string;
  status: "Active" | "Inactive" | "Prospect";
}

export const customers: Customer[] = [
  { id: "c-001", name: "Stryker Medical", contact: "Rachel Brooks", email: "r.brooks@stryker.com", phone: "269-555-0200", city: "Kalamazoo", state: "MI", industry: "Orthopedic Devices", activeOrders: 3, ytdRevenue: 142000, lastOrder: "2024-03-08", status: "Active" },
  { id: "c-002", name: "Medtronic", contact: "James Erickson", email: "j.erickson@medtronic.com", phone: "763-555-0201", city: "Minneapolis", state: "MN", industry: "Surgical Instruments", activeOrders: 2, ytdRevenue: 98500, lastOrder: "2024-03-05", status: "Active" },
  { id: "c-003", name: "Abbott Labs", contact: "Patricia Nguyen", email: "p.nguyen@abbott.com", phone: "224-555-0202", city: "Abbott Park", state: "IL", industry: "Cardiac Devices", activeOrders: 1, ytdRevenue: 215000, lastOrder: "2024-03-12", status: "Active" },
  { id: "c-004", name: "Zimmer Biomet", contact: "Carl Hoffman", email: "c.hoffman@zimmerbiomet.com", phone: "574-555-0203", city: "Warsaw", state: "IN", industry: "Orthopedic Implants", activeOrders: 1, ytdRevenue: 78200, lastOrder: "2024-03-01", status: "Active" },
  { id: "c-005", name: "Boston Scientific", contact: "Diane Wu", email: "d.wu@bsci.com", phone: "508-555-0204", city: "Marlborough", state: "MA", industry: "Neurological", activeOrders: 1, ytdRevenue: 312000, lastOrder: "2024-03-15", status: "Active" },
  { id: "c-006", name: "Karl Storz", contact: "Hans Mueller", email: "h.mueller@karlstorz.com", phone: "805-555-0205", city: "El Segundo", state: "CA", industry: "Endoscopy", activeOrders: 1, ytdRevenue: 87400, lastOrder: "2024-03-10", status: "Active" },
  { id: "c-007", name: "NuVasive", contact: "Tina Castillo", email: "t.castillo@nuvasive.com", phone: "858-555-0206", city: "San Diego", state: "CA", industry: "Spinal Surgery", activeOrders: 1, ytdRevenue: 64800, lastOrder: "2024-03-19", status: "Active" },
  { id: "c-008", name: "Cook Medical", contact: "Frank Torres", email: "f.torres@cookmedical.com", phone: "812-555-0207", city: "Bloomington", state: "IN", industry: "Vascular", activeOrders: 1, ytdRevenue: 41200, lastOrder: "2024-03-14", status: "Active" },
  { id: "c-009", name: "Philips Healthcare", contact: "Sandra Lee", email: "s.lee@philips.com", phone: "978-555-0208", city: "Cambridge", state: "MA", industry: "Diagnostic Imaging", activeOrders: 1, ytdRevenue: 53800, lastOrder: "2024-03-22", status: "Active" },
  { id: "c-010", name: "Dentsply Sirona", contact: "Mark Davis", email: "m.davis@dentsply.com", phone: "717-555-0209", city: "York", state: "PA", industry: "Dental Devices", activeOrders: 1, ytdRevenue: 29600, lastOrder: "2024-03-18", status: "Active" },
  { id: "c-011", name: "Alcon", contact: "Karen Smith", email: "k.smith@alcon.com", phone: "817-555-0210", city: "Fort Worth", state: "TX", industry: "Ophthalmic Devices", activeOrders: 1, ytdRevenue: 18900, lastOrder: "2024-03-06", status: "Active" },
  { id: "c-012", name: "Cochlear Ltd", contact: "Ian Robertson", email: "i.robertson@cochlear.com", phone: "303-555-0211", city: "Centennial", state: "CO", industry: "Hearing Implants", activeOrders: 0, ytdRevenue: 67000, lastOrder: "2024-01-30", status: "Active" },
];
