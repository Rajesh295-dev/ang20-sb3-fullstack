// ---- Enums & Branded IDs ----------------------------------------------------
// export type InvoiceId = string & { readonly __brand: 'InvoiceId' };
export type InvoiceId = string;

export type InvoiceStatus = 'PAID' | 'PENDING' | ' OVERDUE ';

// ---- List (table) model -----------------------------------------------------
/** Row used on /invoices list page */
export interface InvoiceSummary {
  id: InvoiceId; // e.g. "CRUWFey4"
  service: string; // summary line shown in the table
  status: InvoiceStatus; // PAID | PENDING | OVERDUE
  date: string; // ISO date (e.g. "2022-06-08")
  total: number; // dollars (number); format with currency pipe in UI
}

// ---- Detail page models -----------------------------------------------------
export interface Party {
  name: string; // "SecureCapita, Inc." or "Denise Robinson"
  address?: string;
  cityStateZip?: string;
  phone?: string;
  fax?: string;
  email?: string;
  status?: InvoiceStatus; // for the "to" party pill (PAID, etc.)
}

export interface InvoiceItem {
  /** Displayed as the row label (e.g., "Room Cleaning") */
  description: string;

  /** Unit price / rate, displayed in RATE column */
  rate: number;

  /**
   * Line total *as stored* (matches your screenshot where it's already precomputed).
   * If you prefer quantity-based math, add `qty` and compute `total = qty * rate`.
   */
  total: number;

  /** Optional quantity if you want to evolve later */
  qty?: number;
  /** Optional unit (e.g., "hr", "item") */
  unit?: string;
}

export interface InvoiceDetail {
  id: InvoiceId;

  // Header meta
  invoiceDate: string; // ISO date
  dueNote: string; // e.g., "30 Days from Invoice Date"

  // Parties
  from: Party;
  to: Party;

  // Lines & tax
  items: InvoiceItem[];
  taxRatePct: number; // e.g., 5.4

  // Optional derived fields (you can prefill from API or compute on client)
  subtotal?: number; // sum(items[i].total)
  tax?: number; // subtotal * taxRatePct / 100
  grandTotal?: number; // subtotal + tax
}
