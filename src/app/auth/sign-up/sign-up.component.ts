import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import Validation from '../../../utils/Validation';
import { Router } from '@angular/router';
import { NavigationService } from '../../Services/Navigation.Service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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
  hide1 = true;
  hide2 = true;
  signupForm: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(msg: string, color: string) {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3 * 1000,
      panelClass: [color],
    });
  }

  eyeClick(event: MouseEvent, val: string) {
    if (val === 'hide1') {
      this.hide1 = !this.hide1;
    } else {
      this.hide2 = !this.hide2;
    }
    event.stopPropagation();
  }

  validationMessages = {
    name: {
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
    private navigationService: NavigationService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.signupForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
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
      const { email, password, username, name } = this.signupForm.value;
      this.http
        .post('http://localhost:8000/api/v1/auth/register', {
          email: email,
          password: password,
          username: username,
          name: name,
        })
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.openSnackBar(res.msg, 'success-snackbar');
              this.navigationService.handleNavigate('auth/signin');
            } else {
              this.openSnackBar(res.msg, 'error-snackbar');
              alert(`error : ${res.message}`);
            }
          },
          (error: HttpErrorResponse) => {
            console.log('error', error);
            this.openSnackBar(error.error.msg, 'error-snackbar');
          }
        );
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  navigateTo(val: string) {
    this.navigationService.handleNavigate(val);
  }
}
