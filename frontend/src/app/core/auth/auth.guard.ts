// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthStore } from './auth.store';

// export const canActivateAuth: CanActivateFn = () => {
//   const store = inject(AuthStore);
//   const router = inject(Router);
//   return store.isAuthenticated() ? true : router.parseUrl('/login');
// };

// src/app/core/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthStore } from './auth.store';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const store = inject(AuthStore);
  const router = inject(Router);

  return store.isAuthenticated() ? true : router.parseUrl('/login');
};
