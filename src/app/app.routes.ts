import { Routes } from '@angular/router';
import { MainComponent } from './Components/main/main.component';
import { CalculatorComponent } from './Components/calculator/calculator.component';
import { TodoListComponent } from './Components/todo-list/todo-list.component';
import { SignUpComponent } from './Components/Auth/sign-up/sign-up.component';
import { SignInComponent } from './Components/Auth/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
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
  {
    path: 'auth/signup',
    component: SignUpComponent,
    title: 'SignUp',
  },
  {
    path: 'auth/signin',
    component: SignInComponent,
    title: 'SignIn',
  },
];
