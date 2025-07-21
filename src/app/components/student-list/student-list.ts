import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentDialog } from '../student-dialog/student-dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class StudentList implements OnInit {
  studentService = inject(StudentService);
  dataSource: MatTableDataSource<Student> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'email', 'course', 'year', 'actions'];
  dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.studentService.getStudents().subscribe(students => {
      this.dataSource = new MatTableDataSource(students);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addStudent(): void {
    const dialogRef = this.dialog.open(StudentDialog, {
      width: '400px',
      data: { student: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.addStudent(result);
      }
    });
  }

  editStudent(student: Student): void {
    const dialogRef = this.dialog.open(StudentDialog, {
      width: '400px',
      data: { student: student }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.updateStudent({ ...student, ...result });
      }
    });
  }

  deleteStudent(studentId: string) {
    this.studentService.deleteStudent(studentId);
  }
}
