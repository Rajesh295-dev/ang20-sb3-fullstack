export interface Party {
  name: string;
  address: string;
  cityStateZip: string;
  phone: string;
  fax?: string;
  email?: string;
  status?: 'PAID' | 'PENDING' | 'CANCELLED';
}

export interface InvoiceItem {
  description: string;
  rate: number; // dollars
  total: number; // dollars
}

export interface InvoiceDetail {
  id: string; // e.g. CRUWFey4
  invoiceDate: string; // ISO date
  dueNote: string; // e.g. '30 Days from Invoice Date'
  from: Party;
  to: Party;
  items: InvoiceItem[];
  taxRatePct: number; // e.g. 5.4
}
