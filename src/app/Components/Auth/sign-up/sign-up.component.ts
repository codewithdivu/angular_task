import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import Validation from '../../../../utils/Validation';
import { Router } from '@angular/router';
import { NavigationService } from '../../../Services/Navigation.Service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signupForm: FormGroup;

  validationMessages = {
    firstName: {
      required: 'First name is required.',
    },
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email address.',
    },
    username: {
      required: 'Username is required.',
    },
    password: {
      required: 'Password is required.',
    },
    confirmPassword: {
      required: 'Confirm Password is required.',
      passwordMismatch: 'Passwords do not match.',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService
  ) {
    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        termsOfUser: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('formData', this.signupForm.value);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  navigateTo(val: string) {
    this.navigationService.handleNavigate(val);
  }
}
