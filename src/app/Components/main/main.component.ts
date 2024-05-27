import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor(private router: Router) {}

  projects = [
    {
      title: 'Calculator',
      imageUrl:
        'https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2015/02/thumb_720_450_1411_f.jpg',
      route: 'calculator',
    },
    {
      title: 'User Registration Form',
      imageUrl:
        'https://teachershq.com/wp-content/uploads/2017/04/government_forms.png',
      route: 'userform',
    },
  ];

  handleNavigate = (val: string) => {
    this.router.navigate([`/${val}`]);
  };
}
