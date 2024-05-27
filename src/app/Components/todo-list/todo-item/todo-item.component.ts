import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ViewChild,
} from '@angular/core';
@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Input() todo: any;
  @ViewChild('add') add!: ElementRef;

  editTodo(id: number) {
    console.log('Edit todo with id:', id);
    // this.add.nativeElement.innerText = 'Update';
  }

  @Output() deleteTodo = new EventEmitter<number>();

  constructor() {}

  onDelete() {
    this.deleteTodo.emit(this.todo.id);
  }
}
