
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);

  getTasks(): Observable<Task[]> {
    //console.log('Providing tasks:', this.tasks);
    return this.tasksSubject.asObservable();
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks.slice()); 
  }

  toggleTaskStatus(id: number): void {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next(this.tasks.slice()); 
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.tasksSubject.next(this.tasks.slice()); 
  }

  editTask(id: number, newTitle: string): void {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.title = newTitle;
      this.tasksSubject.next(this.tasks.slice()); 
    }
  }
}
