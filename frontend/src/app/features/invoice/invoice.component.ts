import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InvoiceService } from './invoice.service';
import { InvoiceDetail } from './invoice.models';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent {
  private route = inject(ActivatedRoute);
  private api = inject(InvoiceService);

  invoice = signal<InvoiceDetail | null>(null);

  subtotal = computed(() => {
    const inv = this.invoice();
    return inv ? inv.items.reduce((s, it) => s + it.total, 0) : 0;
  });

  tax = computed(() => {
    const inv = this.invoice();
    return inv ? (this.subtotal() * inv.taxRatePct) / 100 : 0;
  });

  grandTotal = computed(() => this.subtotal() + this.tax());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id') ?? 'CRUWFey4';
    this.api.getInvoiceById(id).subscribe((inv) => this.invoice.set(inv));
  }

  exportAsPdf() {
    // Simple, dependency-free option: use the browser's print-to-PDF
    window.print();
  }
}
