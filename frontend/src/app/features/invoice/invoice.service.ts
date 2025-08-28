import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';
import { InvoiceDetail } from './invoice.models';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  getInvoiceById(id: string) {
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
