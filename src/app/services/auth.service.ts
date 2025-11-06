// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = new BehaviorSubject<any>(null);
  user$ = this.user.asObservable();

  constructor() {
    const saved = localStorage.getItem('labwise_user');
    if (saved) this.user.next(JSON.parse(saved));
  }

  login(email: string, name?: string) {
    const user = { email, name: name || email.split('@')[0], role: 'user' };
    this.user.next(user);
    localStorage.setItem('labwise_user', JSON.stringify(user));
  }

  signup(name: string, email: string) {
    const user = { email, name, role: 'user' };
    this.user.next(user);
    localStorage.setItem('labwise_user', JSON.stringify(user));
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('labwise_user');
  }

  isLoggedIn() {
    return !!this.user.value;
  }

  getUser() {
    return this.user.value;
  }
}