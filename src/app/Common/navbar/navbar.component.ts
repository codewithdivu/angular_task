import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationService } from '../../Services/Navigation.Service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: any = {};

  constructor(private navigationService: NavigationService) {
    if (localStorage.getItem('myAppAuth')) {
      const user: any = JSON.parse(localStorage.getItem('myAppAuth')!);
      this.user = user;
    }
  }

  handleLogout() {
    localStorage.removeItem('myAppToken');
    localStorage.removeItem('myAppAuth');
    this.navigationService.handleNavigate('auth/signin');
  }
}
