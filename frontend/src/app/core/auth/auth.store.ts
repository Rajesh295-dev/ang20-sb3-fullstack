// src/app/core/auth/auth.store.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface AuthUser {
  id?: string | number;
  email?: string;
  name?: string;
  // add more fields as you need
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'auth_user';
  private readonly browser: boolean;

  private _user$ = new BehaviorSubject<AuthUser | null>(null);
  user$ = this._user$.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.browser = isPlatformBrowser(platformId);

    // hydrate from storage on the client
    if (this.browser) {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const rawUser = localStorage.getItem(this.USER_KEY);
      if (token && rawUser) {
        try {
          this._user$.next(JSON.parse(rawUser));
        } catch {
          this._user$.next(null);
        }
      }
    }
  }

  /** Returns true if a token exists (basic check). */
  isAuthenticated(): boolean {
    return this.browser && !!localStorage.getItem(this.TOKEN_KEY);
  }

  /** Get current access token (or null). */
  accessToken(): string | null {
    return this.browser ? localStorage.getItem(this.TOKEN_KEY) : null;
  }

  /** Persist token + user, update observable. */
  setSession(token: string, user?: AuthUser): void {
    if (!this.browser) return;
    localStorage.setItem(this.TOKEN_KEY, token);
    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      this._user$.next(user);
    }
  }

  /** Clear session completely. */
  clear(): void {
    if (!this.browser) return;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._user$.next(null);
  }
}
