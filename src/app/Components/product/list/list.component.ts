import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationService } from '../../../Services/Navigation.Service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatChipsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products: any;
  token = localStorage.getItem('myAppToken');

  constructor(
    private http: HttpClient,
    private navigationService: NavigationService
  ) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.http
      .get('http://localhost:8888/api/v1/product', { headers })
      .subscribe(
        (res: any) => {
          this.products = res.data;
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
        }
      );
  }

  navigateTo(val: string) {
    this.navigationService.handleNavigate(val);
  }

  handleDeleteProduct = (id: string) => {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.http
      .delete(`http://localhost:8888/api/v1/product/${id}`, {
        headers,
      })
      .subscribe(
        (res: any) => {
          console.log('res', res);
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
        }
      );
  };
}
