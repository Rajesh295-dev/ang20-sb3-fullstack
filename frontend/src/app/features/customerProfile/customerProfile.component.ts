// import { Component, inject, signal, computed } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { RouterLink, ActivatedRoute } from '@angular/router';
// import { CustomersService } from '../../core/services/customers.service';
// import { Customer } from '../../core/models/customer.model';
// import { Invoice } from '../../core/models/customer.model';

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterLink],
//   templateUrl: './customerProfile.component.html',
//   styleUrls: ['./customerProfile.component.scss'], // ⚠️ match actual filename
// })
// export class CustomerProfileComponent {
//   private fb = inject(FormBuilder);
//   private route = inject(ActivatedRoute);
//   private customersSvc = inject(CustomersService);

//   customer = signal<Customer | null>(null);
//   invoices = signal<Invoice | null>(null);

//   fullName = computed(() => this.customer()?.name ?? '');

//   form = this.fb.nonNullable.group({
//     name: [''],
//     email: [''],
//     type: ['INDIVIDUAL' as Customer['type']],
//     status: ['ACTIVE' as Customer['status']],
//     phone: [''],
//     photoUrl: [''],
//   });

//   loading = signal(true);
//   saving = signal(false);

//   constructor() {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     const c = this.customersSvc.getById(id);

//     if (c) {
//       this.customer.set(c);
//       this.form.patchValue({
//         name: c.name,
//         email: c.email,
//         type: c.type,
//         status: c.status,
//         phone: c.phone,
//         photoUrl: c.photoUrl,
//       });
//     }

//     this.loading.set(false);
//   }

//   onUpdate() {
//     this.saving.set(true);
//     setTimeout(() => {
//       const c = this.customer();
//       if (c) {
//         const f = this.form.getRawValue();
//         const updated: Customer = {
//           ...c,
//           name: f.name,
//           email: f.email,
//           type: f.type,
//           status: f.status,
//           phone: f.phone,
//           photoUrl: f.photoUrl,
//         };

//         // update local + service
//         this.customer.set(updated);
//         this.customersSvc.update(c.id, updated);
//       }
//       this.saving.set(false);
//     }, 600);
//   }
// }

import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../core/services/customers.service';
import { Customer, Invoice } from '../../core/models/customer.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './customerProfile.component.html',
  styleUrls: ['./customerProfile.component.scss'],
})
export class CustomerProfileComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private customersSvc = inject(CustomersService);

  // Entire customer (can be null while loading)
  customer = signal<Customer | null>(null);

  // ✅ Always expose an ARRAY for *ngFor
  invoices = computed<Invoice[]>(() => this.customer()?.invoices ?? []);

  fullName = computed(() => this.customer()?.name ?? '');

  form = this.fb.nonNullable.group({
    name: [''],
    email: [''],
    type: ['INDIVIDUAL' as Customer['type']],
    status: ['ACTIVE' as Customer['status']],
    phone: [''],
    photoUrl: [''],
  });

  loading = signal(true);
  saving = signal(false);

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    const c = Number.isFinite(id) ? this.customersSvc.getById(id) : null;

    if (c) {
      this.customer.set(c);
      this.form.patchValue({
        name: c.name,
        email: c.email,
        type: c.type,
        status: c.status,
        phone: c.phone,
        photoUrl: c.photoUrl,
      });
    }

    this.loading.set(false);
  }

  onUpdate() {
    this.saving.set(true);
    setTimeout(() => {
      const current = this.customer();
      if (current) {
        const f = this.form.getRawValue();
        const updated: Customer = {
          ...current,
          name: f.name,
          email: f.email,
          type: f.type,
          status: f.status,
          phone: f.phone,
          photoUrl: f.photoUrl,
          // keep existing invoices if present
          invoices: current.invoices ?? [],
        };
        this.customer.set(updated);
        this.customersSvc.update(current.id, updated);
      }
      this.saving.set(false);
    }, 600);
  }
}
