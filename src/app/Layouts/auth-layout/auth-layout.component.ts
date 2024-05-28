import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  router = inject(Router);

  constructor() {
    const auth = localStorage.getItem('myAppToken');
    if (auth != null) {
      this.router.navigateByUrl('dashboard');
    }
  }
}
