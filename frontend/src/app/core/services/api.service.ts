import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  login(payload: { email: string; password: string; code?: string }) {
    return this.http.post<{ access_token: string; user: any }>(
      `${this.base}/auth/login`,
      payload,
    );
  }
  refresh(refreshToken: string) {
    return this.http.post<{ access_token: string }>(
      `${this.base}/auth/refresh`,
      { refreshToken },
    );
  }
  me() {
    return this.http.get<any>(`${this.base}/users/me`);
  }
}
