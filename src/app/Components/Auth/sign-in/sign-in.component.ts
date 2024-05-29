import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavigationService } from '../../../Services/Navigation.Service';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../../Services/loader.service';

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
    public loaderService: LoaderService
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
          .subscribe((res: any) => {
            if (res.success) {
              localStorage.setItem('myAppToken', res.accessToken);
              localStorage.setItem('myAppAuth', JSON.stringify(res.data));
              this.loaderService.hide();
              this.navigateTo('dashboard');
            } else {
              alert(`Error: ${res.message}`);
              this.loaderService.hide();
            }
          });
      } else {
        this.signinForm.markAllAsTouched();
        this.loaderService.hide();
      }
    }, 1000);
  }

  navigateTo(val: string) {
    this.navigationService.handleNavigate(val);
  }
}
