// src/app/features/admin/admin.routes.ts
import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard.component').then((m) => m.AdminDashboardComponent),
  },
  // You can add more child routes here, e.g.:
  // { path: 'users', loadComponent: () => import('./users.component').then(m => m.UsersComponent) }
];
