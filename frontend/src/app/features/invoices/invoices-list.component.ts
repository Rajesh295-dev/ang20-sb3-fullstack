import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { InvoiceService, InvoiceSummary } from './invoice.service';

@Component({
  selector: 'app-invoices-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.scss'],
})
export class InvoicesListComponent {
  private api = inject(InvoiceService);
  private router = inject(Router);

  invoices = signal<InvoiceSummary[]>([]);
  loading = signal(true);

  constructor() {
    this.api.getInvoices().subscribe((rows) => {
      this.invoices.set(rows);
      this.loading.set(false);
    });
  }

  openInvoice(id: string) {
    this.router.navigate(['/invoices', id]);
  }

  printInvoice(id: string) {
    // Simple approach: navigate to detail page; user can use its Export as PDF
    this.router.navigate(['/invoices', id]);
  }
}
