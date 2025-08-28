import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  form: FormGroup;
  loading = false;
  submitted = false;
  errorMsg = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.form.controls;
  }
  showError(name: string) {
    const c = this.form.get(name);
    return !!c && c.touched && c.invalid;
  }
  getError(name: string) {
    const c = this.form.get(name);
    if (!c) return '';
    if (c.hasError('required')) return 'This field is required';
    if (c.hasError('email')) return 'Invalid email address';
    return 'Invalid value';
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMsg = '';

    // TODO: replace with your real API call, e.g.:
    // this.http.post('/api/auth/forgot-password', { email: this.f['email'].value }).subscribe(...)
    setTimeout(() => {
      // demo success
      this.loading = false;
      this.submitted = true;
    }, 900);
  }
}
