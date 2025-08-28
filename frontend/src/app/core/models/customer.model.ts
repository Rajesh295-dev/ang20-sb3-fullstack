export type CustomerType = 'INDIVIDUAL' | 'INSTITUTION' | 'COMPANY';
export type CustomerStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';

export interface Customer {
  id: number;
  photoUrl: string;
  name: string;
  email: string;
  phone: string;
  totalBilled: number;
  totalInvoices: number;
  status: CustomerStatus;
  type: CustomerType;
  invoices?: Invoice[];
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  type: 'INDIVIDUAL' | 'BUSINESS';
  status: 'ACTIVE' | 'INACTIVE';
  address: string;
  phone: string;
  imageUrl: string;
  totalInvoices: number;
  totalBilled: number;
}

export interface Invoice {
  id: string;
  service: string;
  status: 'PAID' | 'PENDING' | 'CANCELLED';
  date: string; // ISO string
  total: number; // cents or dollars (we’ll use dollars here)
}
