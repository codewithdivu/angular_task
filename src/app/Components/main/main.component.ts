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
    {
      title: 'To-Do List',
      imageUrl:
        'https://cdn-aicin.nitrocdn.com/HIAjYmsdLpRQdKpIMJLXFmZsSAYnEnkl/assets/images/optimized/rev-1e48096/www.amitree.com/wp-content/uploads/2021/08/the-pros-and-cons-of-paper-to-do-lists.jpeg',
      route: 'todo',
    },
  ];

  handleNavigate = (val: string) => {
    this.router.navigate([`/${val}`]);
  };
}
