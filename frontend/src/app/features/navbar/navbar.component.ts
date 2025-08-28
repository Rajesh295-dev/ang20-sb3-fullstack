// import { Component, HostListener } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterLink, RouterLinkActive } from '@angular/router';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [CommonModule, RouterLink, RouterLinkActive],
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss'],
// })
// export class NavbarComponent {
//   // dropdown states
//   customersOpen = false;
//   invoicesOpen = false;
//   userOpen = false;

//   // example current user (replace with your AuthStore later)
//   user = {
//     name: 'Denise Robinson',
//     avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
//   };

//   toggle(which: 'customers' | 'invoices' | 'user') {
//     this.closeAll();
//     if (which === 'customers') this.customersOpen = !this.customersOpen;
//     if (which === 'invoices') this.invoicesOpen = !this.invoicesOpen;
//     if (which === 'user') this.userOpen = !this.userOpen;
//   }

//   closeAll() {
//     this.customersOpen = false;
//     this.invoicesOpen = false;
//     this.userOpen = false;
//   }

//   // close when clicking anywhere else
//   @HostListener('document:click', ['$event'])
//   onDocClick(e: MouseEvent) {
//     const target = e.target as HTMLElement;
//     // ignore clicks inside menus
//     if (target.closest('.nav') || target.closest('.dropdown')) return;
//     this.closeAll();
//   }

//   // prevent closing when clicking the toggle itself
//   stop(e: Event) {
//     e.stopPropagation();
//   }
// }

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  customersOpen = false;
  invoicesOpen = false;
  userOpen = false;

  user = {
    name: 'Denise Robinson',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  };

  toggle(which: 'customers' | 'invoices' | 'user') {
    // remember previous open state
    const wasOpen =
      which === 'customers'
        ? this.customersOpen
        : which === 'invoices'
          ? this.invoicesOpen
          : this.userOpen;

    // close everything
    this.closeAll();

    // reopen only if it was previously closed (true toggle)
    if (!wasOpen) {
      if (which === 'customers') this.customersOpen = true;
      if (which === 'invoices') this.invoicesOpen = true;
      if (which === 'user') this.userOpen = true;
    }
  }

  closeAll() {
    this.customersOpen = false;
    this.invoicesOpen = false;
    this.userOpen = false;
  }

  // Close when clicking anywhere that's NOT inside a menu root or dropdown
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    const el = e.target as HTMLElement;
    if (!el.closest('.menu-item') && !el.closest('.dropdown')) {
      this.closeAll();
    }
  }

  // Close with Esc key
  @HostListener('document:keydown.escape')
  onEsc() {
    this.closeAll();
  }

  // If you keep (click)="stop($event)" in template, this prevents doc handler from firing
  stop(e: Event) {
    e.stopPropagation();
  }
}
