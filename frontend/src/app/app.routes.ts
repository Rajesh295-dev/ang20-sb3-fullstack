import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { InvoicesListComponent } from './features/invoices/invoices-list.component';
import { InvoiceComponent } from './features/invoice/invoice.component';
import { CustomerProfileComponent } from './features/customerProfile/customerProfile.component';

export const routes: Routes = [
  { path: 'invoices/:id', component: InvoiceComponent },
  { path: 'invoices/:id', component: InvoiceComponent },
  { path: 'customers/:id', component: CustomerProfileComponent },
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/auth/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent,
      ),
  },
  // {
  //   path: 'profile',
  //   canActivate: [authGuard], // <— use authGuard
  //   loadComponent: () =>
  //     import('./features/profile/profile.component').then(
  //       (m) => m.ProfileComponent,
  //     ),
  // },

  {
    path: 'profile',
    //canActivate: [authGuard], // <— use authGuard
    loadComponent: () =>
      import('./features/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
  },

  {
    path: 'userProfile',
    //canActivate: [authGuard], // <— use authGuard
    loadComponent: () =>
      import('./features/customerProfile/customerProfile.component').then(
        (m) => m.CustomerProfileComponent,
      ),
  },

  {
    path: 'invoices',
    //canActivate: [authGuard], // <— use authGuard
    loadComponent: () =>
      import('./features/invoices/invoices-list.component').then(
        (m) => m.InvoicesListComponent,
      ),
  },
  {
    path: 'addInvoice',
    //canActivate: [authGuard], // <— use authGuard
    loadComponent: () =>
      import('./features/addInvoice/addInvoice.component').then(
        (m) => m.NewInvoiceComponent,
      ),
  },
  {
    path: 'addCustomer',
    //canActivate: [authGuard], // <— use authGuard
    loadComponent: () =>
      import('./features/addCustomer/addCustomer.component').then(
        (m) => m.NewCustomerComponent,
      ),
  },

  {
    path: 'customers',
    //canActivate: [authGuard], // <— use authGuard
    loadComponent: () =>
      import('./features/customers/customers.component').then(
        (m) => m.CustomersComponent,
      ),
  },

  {
    path: 'admin',
    canActivate: [authGuard], // <— use authGuard
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/not-found.component').then((m) => m.NotFoundComponent),
  },
];
