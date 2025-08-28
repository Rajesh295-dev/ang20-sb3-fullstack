import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomersService } from '../../core/services/customers.service';
import { Customer } from '../../core/models/customer.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // keep this file's case consistent on disk
})
export class HomeComponent {
  private svc = inject(CustomersService);

  // KPIs
  totalCustomers = computed(() => this.svc.customers().length);
  totalInvoices = signal(7); // wire later
  totalBilled = signal(2479); // wire later

  // Pagination over shared customers
  pageSize = 10;
  page = signal(1);
  customers = computed<Customer[]>(() => this.svc.customers());
  pages = computed(() =>
    Math.max(1, Math.ceil(this.customers().length / this.pageSize)),
  );
  rows = computed<Customer[]>(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.customers().slice(start, start + this.pageSize);
  });

  next() {
    if (this.page() < this.pages()) this.page.set(this.page() + 1);
  }
  prev() {
    if (this.page() > 1) this.page.set(this.page() - 1);
  }

  badgeClass(status: Customer['status']) {
    return {
      ACTIVE: 'badge badge--ok',
      PENDING: 'badge badge--warn',
      INACTIVE: 'badge badge--muted',
    }[status];
  }

  trackById(_: number, c: Customer) {
    return c.id;
  }

  async exportCustomersExcel() {
    const list = this.customers();
    const rows = list.map((r) => ({
      ID: r.id,
      Name: r.name,
      Email: r.email,
      Phone: r.phone,
      Status: r.status,
      Type: r.type,
    }));

    try {
      const XLSX = await import('xlsx'); // npm i xlsx
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Customers');

      const keys = Object.keys(rows[0] ?? { ID: '' });
      (ws['!cols'] as any) = keys.map((k) => ({
        wch:
          Math.max(
            k.length,
            ...rows.map((r) => String((r as any)[k] ?? '').length),
          ) + 2,
      }));

      XLSX.writeFile(wb, 'customers.xlsx');
    } catch {
      const header = 'ID,Name,Email,Phone,Status,Type\n';
      const body = rows
        .map((r) =>
          [r.ID, r.Name, r.Email, r.Phone, r.Status, r.Type]
            .map((v) => `"${String(v).replace(/"/g, '""')}"`)
            .join(','),
        )
        .join('\n');
      const blob = new Blob([header + body], {
        type: 'text/csv;charset=utf-8;',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'customers.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
  }
}
