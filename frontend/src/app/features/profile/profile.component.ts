import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

type ActivityType =
  | 'LOGIN_ATTEMPT'
  | 'LOGIN_ATTEMPT_SUCCESS'
  | 'PASSWORD_CHANGED';
interface Activity {
  device: string;
  ip: string;
  date: string;
  type: ActivityType;
  description: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  // sidebar state (optional)
  section = signal<
    'profile' | 'password' | 'authorization' | 'account' | 'authentication'
  >('authorization');

  // ✅ inject FormBuilder BEFORE using it in field initializers
  private fb = inject(FormBuilder);

  // ✅ define roleForm ONCE
  roleForm = this.fb.group({
    roleName: ['ROLE_USER', [Validators.required, Validators.minLength(3)]],
  });

  permissions = signal<string[]>(['READ:USER', 'READ:CUSTOMER']);
  saving = signal(false);

  activities = signal<Activity[]>([
    {
      device: 'Chrome - Linux Desktop',
      ip: '192.168.1.209',
      date: 'July 25, 2022, 1:34 AM',
      type: 'LOGIN_ATTEMPT_SUCCESS',
      description: 'You tried to log in and you succeeded',
    },
    {
      device: 'Chrome - Linux Desktop',
      ip: '192.168.1.209',
      date: 'July 25, 2022, 1:34 AM',
      type: 'LOGIN_ATTEMPT',
      description: 'You tried to log in',
    },
    {
      device: 'Chrome - Linux Desktop',
      ip: '192.168.1.209',
      date: 'July 25, 2022, 1:33 AM',
      type: 'LOGIN_ATTEMPT',
      description: 'You tried to log in',
    },
    {
      device: 'Chrome - Linux Desktop',
      ip: '192.168.1.209',
      date: 'July 25, 2022, 1:32 AM',
      type: 'LOGIN_ATTEMPT',
      description: 'You tried to log in',
    },
    {
      device: 'Chrome - Linux Desktop',
      ip: '192.168.1.209',
      date: 'July 25, 2022, 1:31 AM',
      type: 'LOGIN_ATTEMPT',
      description: 'You tried to log in',
    },
  ]);

  // UI helpers
  typeClass(t: ActivityType) {
    return t === 'LOGIN_ATTEMPT_SUCCESS'
      ? 'pill pill--success'
      : t === 'PASSWORD_CHANGED'
        ? 'pill pill--info'
        : 'pill pill--warn';
  }

  select(
    sec:
      | 'profile'
      | 'password'
      | 'authorization'
      | 'account'
      | 'authentication',
  ) {
    this.section.set(sec);
  }

  updateRole() {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    setTimeout(() => this.saving.set(false), 700); // replace with HTTP call
  }

  report(a: Activity) {
    alert(`Reported: ${a.type} from ${a.ip}`);
  }
}
