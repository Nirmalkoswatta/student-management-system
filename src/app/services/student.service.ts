import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private firestore: Firestore = inject(Firestore);
  private studentsCollection = collection(this.firestore, 'students');

  getStudents(): Observable<Student[]> {
    return collectionData(this.studentsCollection, { idField: 'id' }) as Observable<Student[]>;
  }

  addStudent(student: Student) {
    return addDoc(this.studentsCollection, student);
  }

  updateStudent(student: Student) {
    const studentDoc = doc(this.firestore, `students/${student.id}`);
    return updateDoc(studentDoc, { ...student });
  }

  deleteStudent(studentId: string) {
    const studentDoc = doc(this.firestore, `students/${studentId}`);
    return deleteDoc(studentDoc);
  }
} 