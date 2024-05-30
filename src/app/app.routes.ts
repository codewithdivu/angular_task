import { Routes } from '@angular/router';
import { MainComponent } from './Components/main/main.component';
import { CalculatorComponent } from './Components/calculator/calculator.component';
import { TodoListComponent } from './Components/todo-list/todo-list.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { DashboardLayoutComponent } from './Layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './Guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/signin',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MainComponent,
        pathMatch: 'full',
        title: 'Home Page',
      },
      {
        path: 'calculator',
        component: CalculatorComponent,
        title: 'Calculator',
      },
      {
        path: 'todo',
        component: TodoListComponent,
        title: 'ToDo List',
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signup',
        component: SignUpComponent,
        title: 'SignUp',
      },
      {
        path: 'signin',
        component: SignInComponent,
        title: 'SignIn',
      },
    ],
  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  // },
];
