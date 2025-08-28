// import { Component, computed, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormControl } from '@angular/forms';
// import { RouterLink } from '@angular/router';

// type CustomerType = 'INDIVIDUAL' | 'INSTITUTION' | 'COMPANY';
// type CustomerStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';

// export interface Customer {
//   id: number;
//   photoUrl: string;
//   name: string;
//   email: string;
//   phone: string;
//   status: CustomerStatus;
//   type: CustomerType;
// }

// @Component({
//   selector: 'app-customers',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterLink],
//   templateUrl: './customers.component.html',
//   styleUrls: ['./customers.component.scss'],
// })
// export class CustomersComponent {
//   private readonly seed: Customer[] = [
//     {
//       id: 1,
//       photoUrl: 'https://i.pravatar.cc/64?img=12',
//       name: 'Family Clinic Practice',
//       email: 'john@gmail.com',
//       phone: '5698741235',
//       status: 'ACTIVE',
//       type: 'INSTITUTION',
//     },
//     {
//       id: 2,
//       photoUrl: 'https://i.pravatar.cc/64?img=5',
//       name: 'Jean D. Pierre',
//       email: 'jean@gmail.com',
//       phone: '8963214789',
//       status: 'ACTIVE',
//       type: 'INDIVIDUAL',
//     },
//     {
//       id: 3,
//       photoUrl: 'https://i.pravatar.cc/64?img=47',
//       name: 'Denise Robinson',
//       email: 'denise@gmail.com',
//       phone: '123456789',
//       status: 'ACTIVE',
//       type: 'INDIVIDUAL',
//     },
//     {
//       id: 71,
//       photoUrl: 'https://i.pravatar.cc/64?img=8',
//       name: 'PCS Radio',
//       email: 'pcsradio@gmail.com',
//       phone: '1889445229',
//       status: 'PENDING',
//       type: 'INSTITUTION',
//     },
//     {
//       id: 72,
//       photoUrl: 'https://i.pravatar.cc/64?img=22',
//       name: 'John Rennaux',
//       email: 'john@gmail.com',
//       phone: '6543765432',
//       status: 'ACTIVE',
//       type: 'INDIVIDUAL',
//     },
//     {
//       id: 73,
//       photoUrl: 'https://i.pravatar.cc/64?img=14',
//       name: 'General Car Repair',
//       email: 'meinekesupport@gmail.com',
//       phone: '6108160278',
//       status: 'ACTIVE',
//       type: 'INSTITUTION',
//     },
//     {
//       id: 74,
//       photoUrl: 'https://i.pravatar.cc/64?img=31',
//       name: 'Jane Lee',
//       email: 'leeJ@gmail.com',
//       phone: '1234578890',
//       status: 'INACTIVE',
//       type: 'INDIVIDUAL',
//     },
//     {
//       id: 75,
//       photoUrl: 'https://i.pravatar.cc/64?img=3',
//       name: 'Jack Harpen',
//       email: 'jackh@outlook.com',
//       phone: '1234567890',
//       status: 'ACTIVE',
//       type: 'INDIVIDUAL',
//     },
//     {
//       id: 76,
//       photoUrl: 'https://i.pravatar.cc/64?img=11',
//       name: 'AB Nursing Home',
//       email: 'abnursing@clinic.com',
//       phone: '8569325401',
//       status: 'INACTIVE',
//       type: 'INSTITUTION',
//     },
//     {
//       id: 77,
//       photoUrl: 'https://i.pravatar.cc/64?img=39',
//       name: 'Budget Food Inc',
//       email: 'budgetfood@budget.org',
//       phone: '4569305200',
//       status: 'ACTIVE',
//       type: 'INSTITUTION',
//     },
//   ];

//   customers = signal<Customer[]>(this.seed);
//   query = new FormControl<string>('', { nonNullable: true });

//   filtered = computed(() => {
//     const q = (this.query.value || '').trim().toLowerCase();
//     if (!q) return this.customers();
//     return this.customers().filter((c) => c.name.toLowerCase().includes(q));
//   });

//   onSearch() {
//     /* computed handles filtering */
//   }

//   clear() {
//     this.query.setValue('');
//   }

//   // <-- Add this: used by *ngFor trackBy
//   trackById(index: number, c: Customer): number {
//     return c.id;
//   }

// customers.component.ts
import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomersService } from '../../core/services/customers.service';
import { Customer } from '../../core/models/customer.model';
import { CUSTOMERS_SEED } from '../../core/data/customers.seed';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  private svc = inject(CustomersService);

  query = new FormControl<string>('', { nonNullable: true });

  // customers = computed(() => this.svc.customers());
  // filtered = computed(() => {
  //   const q = (this.query.value || '').trim().toLowerCase();
  //   if (!q) return this.customers();
  //   return this.customers().filter((c) => c.name.toLowerCase().includes(q));
  // });

  customers = signal<Customer[]>([...CUSTOMERS_SEED]);

  filtered = computed<Customer[]>(() => {
    const q = (this.query.value || '').trim().toLowerCase();
    if (!q) return this.customers();
    return this.customers().filter((c) => c.name.toLowerCase().includes(q));
  });

  onSearch() {}
  clear() {
    this.query.setValue('');
  }

  trackById(_: number, c: Customer) {
    return c.id;
  }

  async exportExcel() {
    const rows = this.filtered().map((c) => ({
      ID: c.id,
      Name: c.name,
      Email: c.email,
      Phone: c.phone,
      Status: c.status,
      Type: c.type,
    }));

    try {
      const XLSX = await import('xlsx'); // npm i xlsx
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Customers');
      XLSX.writeFile(wb, 'customers.xlsx');
    } catch {
      const csvHeader = 'ID,Name,Email,Phone,Status,Type\n';
      const csvBody = rows
        .map((r) =>
          [r.ID, r.Name, r.Email, r.Phone, r.Status, r.Type]
            .map((v) => `"${String(v).replace(/"/g, '""')}"`)
            .join(','),
        )
        .join('\n');
      const blob = new Blob([csvHeader + csvBody], {
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
