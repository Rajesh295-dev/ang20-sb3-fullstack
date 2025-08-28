import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

type InvoiceStatus = 'PENDING' | 'PAID' | 'CANCELED' | 'OVERDUE';

interface NewInvoice {
  services: string;
  total: number;
  customer: string;
  date: string; // ISO yyyy-MM-dd
  status: InvoiceStatus;
}

@Component({
  selector: 'app-new-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './addInvoice.component.html',
  styleUrls: ['./addInvoice.component.scss'],
})
export class NewInvoiceComponent {
  private fb = inject(FormBuilder);

  statuses: InvoiceStatus[] = ['PENDING', 'PAID', 'CANCELED', 'OVERDUE'];

  form = this.fb.group({
    services: ['', [Validators.required, Validators.maxLength(200)]],
    total: [null as number | null, [Validators.required, Validators.min(0)]],
    customer: ['', [Validators.required, Validators.maxLength(120)]],
    date: [this.todayISO(), Validators.required],
    status: ['PENDING' as InvoiceStatus, Validators.required],
  });

  todayISO() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload: NewInvoice = this.form.getRawValue() as NewInvoice;
    // TODO: call your service here
    console.log('Saving invoice:', payload);
    // e.g. this.invoiceService.create(payload).subscribe(...)
  }

  get f() {
    return this.form.controls;
  }
}
