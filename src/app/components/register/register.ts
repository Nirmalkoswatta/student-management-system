import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Bubbles } from '../bubbles';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const retypePassword = control.get('retypePassword')?.value;
  return password === retypePassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    Bubbles
  ]
})
export class Register {
  registerForm: FormGroup;
  authService = inject(AuthService);
  notificationService = inject(NotificationService);
  firestore = inject(Firestore);

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      retypePassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const { name, email, password, phone } = this.registerForm.value as { name: string; email: string; password: string; phone: string };
      try {
        const cred = await this.authService.register(email, password);
        // Store name and phone in Firestore under users collection
        await setDoc(doc(this.firestore, 'users', cred.user.uid), { name, email, phone });
        this.notificationService.show('Registered successfully!');
        this.router.navigate(['/login']);
      } catch (error: any) {
        this.notificationService.show(error.message);
      }
    }
  }
}
