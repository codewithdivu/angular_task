import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoItemComponent } from './todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  todoList: any[] = [];
  todo: String = '';

  constructor() {
    console.log(this.todoList);
  }

  handleChangeTodo(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    console.log(val);
    this.todo = val;
  }

  addToDo = (e: Event) => {
    e.preventDefault();
    if (this.todo === '') {
      alert('please enter text...');
      return;
    }
    this.todoList.push({ id: Date.now(), todo: this.todo });
    this.todo = '';
  };

  handleDeleteTodo(id: number) {
    if (confirm('Do you really want to delete this task ?')) {
      this.todoList = this.todoList.filter((todo) => todo.id !== id);
      return;
    } else {
      return;
    }
  }
}
