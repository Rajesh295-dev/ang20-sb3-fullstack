// features/auth/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // ✅ make it standalone
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // ✅ bring needed modules
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  showPwd = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      alert('Signed in successfully!');
    }, 1000);
  }

  showError(control: string) {
    const c = this.form.get(control);
    return !!c && c.touched && c.invalid;
  }
  getError(control: string) {
    const c = this.form.get(control);
    if (!c) return '';
    if (c.hasError('required')) return 'This field is required';
    if (c.hasError('email')) return 'Invalid email address';
    if (c.hasError('minlength'))
      return `Must be at least ${c.getError('minlength').requiredLength} characters`;
    return 'Invalid value';
  }
}
