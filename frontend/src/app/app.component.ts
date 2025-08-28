import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

// ⬇️ Adjust the path to where your NavbarComponent lives
import { NavbarComponent } from './features/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-navbar *ngIf="showShell" />

    <main [class.p-6]="showShell" class="min-h-screen">
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  private router = inject(Router);

  // Routes where you DON'T want the app shell (navbar/padded main)
  private readonly AUTH_PREFIXES = ['/login', '/register', '/forgot-password'];

  showShell = true;

  constructor() {
    // Initial state (direct load / refresh)
    this.updateShell(this.router.url);

    // Update on navigation
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.updateShell(e.urlAfterRedirects));
  }

  private updateShell(url: string) {
    const clean = url.split('?')[0].split('#')[0];

    // Match exact or nested auth routes (e.g., /login, /login/2fa)
    const isAuthRoute = this.AUTH_PREFIXES.some(
      (p) => clean === p || clean.startsWith(p + '/'),
    );

    this.showShell = !isAuthRoute;
  }
}
