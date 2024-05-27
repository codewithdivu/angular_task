import { Routes } from '@angular/router';
import { MainComponent } from './Components/main/main.component';
import { CalculatorComponent } from './Components/calculator/calculator.component';
import { UserFormComponent } from './Components/user-form/user-form.component';
import { TodoListComponent } from './Components/todo-list/todo-list.component';

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
    path: 'userform',
    component: UserFormComponent,
    title: 'User Form',
  },
  {
    path: 'todo',
    component: TodoListComponent,
    title: 'ToDo List',
  },
];
