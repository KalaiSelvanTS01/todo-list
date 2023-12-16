import { Component } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  newTaskTitle = '';
  taskFilter = 'all';

  
  constructor(private taskService: TaskService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      //console.log('Received tasks:', tasks);
      this.tasks = tasks;
      this.applyFilter();
    });
  }
  editTaskDialog(id: number): void {
    const task = this.tasks.find((t) => t.id === id);

    if (task) {
      const dialogRef = this.dialog.open(EditTaskDialogComponent, {
        width: '250px',
        data: { id: task.id, title: task.title },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.editTask(id, result);
        }
      });
    }
  }

  addTask(): void {
    if (this.newTaskTitle.trim() !== '') {
      this.taskService.addTask(this.newTaskTitle);
      this.newTaskTitle = '';
      this.applyFilter();
    }
  }

  toggleTaskStatus(event: any, id: number): void {
    
    if (event instanceof Event) {
      event.stopPropagation(); 
    }
    this.taskService.toggleTaskStatus(id);
    this.applyFilter();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.applyFilter();
 
  }
  editTask(id: number, newTitle: string): void {
    this.taskService.editTask(id, newTitle);
    this.applyFilter();
  }
  filterTasks(filter: string): void {
    this.taskFilter = filter;
    this.applyFilter();
  }

  private applyFilter(): void {
    if (this.taskFilter === 'all') {
      this.filteredTasks = this.tasks;
    } else if (this.taskFilter === 'active') {
      this.filteredTasks = this.tasks.filter((task) => !task.completed);
    } else if (this.taskFilter === 'completed') {
      this.filteredTasks = this.tasks.filter((task) => task.completed);
    }
    console.log('Filtered tasks:', this.filteredTasks);
  }
}
