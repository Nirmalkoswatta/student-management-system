import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';
import { Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Bubbles } from './bubbles';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule, Bubbles]
})
export class Dashboard {
  authService = inject(AuthService);
  firestore = inject(Firestore);
  user$: Observable<User | null> = this.authService.user$;
  name$: Observable<string | null> = this.user$.pipe(
    switchMap(user => {
      if (!user) return of(null);
      const userDoc = doc(this.firestore, 'users', user.uid);
      return getDoc(userDoc).then(snap => snap.exists() ? (snap.data() as any).name : null);
    })
  );
}
