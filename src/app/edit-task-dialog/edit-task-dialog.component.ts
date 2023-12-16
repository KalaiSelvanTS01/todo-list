import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.css'
})
export class EditTaskDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; title: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    this.dialogRef.close(this.data.title);
  }
}