import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

type CustomerType = 'INDIVIDUAL' | 'COMPANY';
type CustomerStatus = 'ACTIVE' | 'INACTIVE';

interface NewCustomer {
  name: string;
  email: string;
  address: string;
  phone: string;
  type: CustomerType;
  status: CustomerStatus;
  imageUrl: string;
}

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './addCustomer.component.html',
  styleUrls: ['./addCustomer.component.scss'],
})
export class NewCustomerComponent {
  private fb = inject(FormBuilder);

  types: CustomerType[] = ['INDIVIDUAL', 'COMPANY'];
  statuses: CustomerStatus[] = ['ACTIVE', 'INACTIVE'];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(160)],
    ],
    address: ['', [Validators.maxLength(240)]],
    phone: [
      '',
      [Validators.pattern(/^[0-9+()\-\s]*$/), Validators.maxLength(30)],
    ],
    type: ['INDIVIDUAL' as CustomerType, Validators.required],
    status: ['ACTIVE' as CustomerStatus, Validators.required],
    imageUrl: ['', [Validators.maxLength(300)]],
  });

  get f() {
    return this.form.controls;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.getRawValue() as NewCustomer;
    // TODO: call your service here
    console.log('Saving customer:', payload);
    // e.g. this.customersService.create(payload).subscribe(...)
  }
}
