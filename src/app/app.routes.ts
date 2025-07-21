import { Routes, CanActivateFn } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { StudentList } from './components/student-list/student-list';
import { Dashboard } from './components/dashboard';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn() ? true : router.createUrlTree(['/login']);
};

const loginRegisterGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return !auth.isLoggedIn() ? true : router.createUrlTree(['/dashboard']);
};

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [loginRegisterGuard] },
  { path: 'register', component: Register, canActivate: [loginRegisterGuard] },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'students', component: StudentList }
];
