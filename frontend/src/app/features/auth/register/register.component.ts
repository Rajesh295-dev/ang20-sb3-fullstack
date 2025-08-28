import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

function passwordsMatch(group: AbstractControl) {
  const pass = group.get('password')?.value || '';
  const confirm = group.get('confirm')?.value || '';
  return pass === confirm ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  loading = false;
  showPwd = false;
  showConfirm = false;

  form!: FormGroup; // declare, then init in constructor

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirm: ['', [Validators.required]],
        },
        { validators: passwordsMatch },
      ),
      terms: [false, [Validators.requiredTrue]],
    });
  }

  // helpers
  c(path: string) {
    return this.form.get(path)!;
  }
  showError(path: string) {
    const ctrl = this.c(path);
    return ctrl.touched && ctrl.invalid;
  }
  getError(path: string) {
    const ctrl = this.c(path);
    if (!ctrl) return '';
    if (ctrl.hasError('required')) return 'This field is required';
    if (ctrl.hasError('email')) return 'Invalid email address';
    if (ctrl.hasError('minlength'))
      return `Must be at least ${ctrl.getError('minlength').requiredLength} characters`;
    if (ctrl.hasError('requiredTrue')) return 'You must accept the terms';
    return 'Invalid value';
  }

  get pwdMismatch() {
    const grp = this.c('passwordGroup');
    return grp.touched && grp.hasError('mismatch');
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigateByUrl('/login');
    }, 800);
  }
}
