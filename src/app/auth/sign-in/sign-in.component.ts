import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavigationService } from '../../Services/Navigation.Service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../Services/loader.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
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
    MatProgressSpinnerModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  hide = true;
  signinForm: FormGroup;

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

  eyeClick(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  validationMessages = {
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email address.',
    },
    password: {
      required: 'Password is required.',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private http: HttpClient,
    public loaderService: LoaderService,
    private _snackBar: MatSnackBar
  ) {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.loaderService.show();
    setTimeout(() => {
      if (this.signinForm.valid) {
        this.http
          .post(
            'http://localhost:8000/api/v1/auth/login',
            this.signinForm.value
          )
          .subscribe(
            (res: any) => {
              console.log('res', res);
              if (res.success) {
                localStorage.setItem('myAppToken', res.accessToken);
                localStorage.setItem('myAppAuth', JSON.stringify(res.data));
                this.loaderService.hide();
                this.openSnackBar(res.msg, 'success-snackbar');
                this.navigateTo('dashboard');
              } else {
                alert(`Error: ${res.msg}`);
                this.openSnackBar(res.msg, 'error-snackbar');
                this.loaderService.hide();
              }
            },
            (error: HttpErrorResponse) => {
              console.log('error', error);
              this.openSnackBar(error.error.msg, 'error-snackbar');
            }
          );
      } else {
        this.signinForm.markAllAsTouched();
        this.loaderService.hide();
      }
    }, 500);
    this.loaderService.hide();
  }

  navigateTo(val: string) {
    this.navigationService.handleNavigate(val);
  }
}
