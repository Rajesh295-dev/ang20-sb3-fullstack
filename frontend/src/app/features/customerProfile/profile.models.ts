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
