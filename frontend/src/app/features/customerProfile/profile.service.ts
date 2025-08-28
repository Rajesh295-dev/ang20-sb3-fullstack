import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { Invoice, UserProfile } from './profile.models';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  getUser(id = '1') {
    const data: UserProfile = {
      id,
      firstName: 'Denise',
      lastName: 'Robinson',
      email: 'denise@gmail.com',
      type: 'INDIVIDUAL',
      status: 'ACTIVE',
      address: '123 Main St NY',
      phone: '123456789',
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
      totalInvoices: 3,
      totalBilled: 1359.0,
    };
    return of(data).pipe(delay(200));
  }

  getInvoices(userId = '1') {
    const invoices: Invoice[] = [
      {
        id: 'CRUWFey4',
        service:
          '1 Room Cleaning $50, 2 Lawn Mowing $50, 3 Window Cleaning $520',
        status: 'PENDING',
        date: '2022-06-08',
        total: 620,
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
    ];
    return of(invoices).pipe(delay(200));
  }
}
