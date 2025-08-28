// src/app/features/invoices/invoice.service.ts
import { Injectable } from '@angular/core';
import { of, delay, Observable } from 'rxjs';
import { InvoiceDetail } from './invoice.model';

export interface InvoiceSummary {
  id: string;
  service: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  date: string; // ISO string
  total: number; // dollars
}

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  // List page
  getInvoices(): Observable<InvoiceSummary[]> {
    const rows: InvoiceSummary[] = [
      {
        id: 'CRUWFey4',
        service:
          '1 Room Cleaning $50, 2 Lawn Mowing $50, 3 Window Cleaning $520',
        status: 'PAID',
        date: '2022-06-08',
        total: 620,
      },
      {
        id: '3BB3VWNR',
        service: '1 Lawn Moving $130',
        status: 'PAID',
        date: '2022-06-15',
        total: 130,
      },
      {
        id: 'VARLIBI4',
        service:
          '1 Room Cleaning $50, 2 Lawn Mowing $50, 3 Window Cleaning $50',
        status: 'OVERDUE',
        date: '2022-06-25',
        total: 150,
      },
      {
        id: 'M7LUF12B',
        service: '1 Car Towing $89, 2 Tire Change $30',
        status: 'PENDING',
        date: '2022-06-20',
        total: 119,
      },
      {
        id: 'NVB7CXMY',
        service:
          '1 Room Cleaning $50, 2 Lawn Mowing $50, 3 Window Cleaning $520',
        status: 'PENDING',
        date: '2022-06-02',
        total: 620,
      },
      {
        id: 'ZPZXAMK3',
        service:
          '1 Room Cleaning $50, 2 Lawn Mowing $50, 3 Window Cleaning $520',
        status: 'PENDING',
        date: '2022-07-12',
        total: 620,
      },
      {
        id: 'GWZVZVTS',
        service: '1 Oil Change $50, 2 Tire Rotation $150, 3 Tire Pressure $20',
        status: 'PENDING',
        date: '2022-07-27',
        total: 220,
      },
    ];
    return of(rows).pipe(delay(200));
  }

  // Detail page (optional, keeps your previous single-invoice view working)
  getInvoiceById(id: string): Observable<InvoiceDetail> {
    const data: InvoiceDetail = {
      id: id || 'CRUWFey4',
      invoiceDate: '2022-06-08',
      dueNote: '30 Days from Invoice Date',
      from: {
        name: 'SecureCapita, Inc.',
        address: '123 Main Street',
        cityStateZip: 'Philadelphia, Pennsylvania 15886',
        phone: '(123) 456-7890',
        fax: '(123) 456-7890',
      },
      to: {
        name: 'Denise Robinson',
        address: '123 Main St NY',
        cityStateZip: '',
        email: 'denise@gmail.com',
        phone: '123456789',
        status: 'PAID',
      },
      items: [
        { description: 'Room Cleaning', rate: 50, total: 50 },
        { description: 'Lawn Mowing', rate: 50, total: 50 },
        { description: 'Window Cleaning', rate: 520, total: 520 },
      ],
      taxRatePct: 5.4,
    };
    return of(data).pipe(delay(200));
  }
}
