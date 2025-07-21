import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Student } from '../../models/student.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.html',
  styleUrls: ['./student-dialog.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class StudentDialog {
  studentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<StudentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { student: Student },
    private fb: FormBuilder
  ) {
    this.studentForm = this.fb.group({
      name: [data.student ? data.student.name : '', []],
      email: [data.student ? data.student.email : '', []],
      course: [data.student ? data.student.course : '', []],
      year: [data.student ? data.student.year : '', []]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
