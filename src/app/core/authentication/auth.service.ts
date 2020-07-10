import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Credentials from '../../shared/models/credentials.model';

const CREDENTIALS = {
  user: 'demo',
  pass: 'demo',
};

@Injectable()
export class AuthService {
  constructor(private router: Router) {}

  login({ userName, password }: Credentials): void | Error {
    if (CREDENTIALS.user !== userName || CREDENTIALS.pass !== password) {
      throw new Error('User not found.');
    }
    localStorage.setItem('isLogged', 'true');
    this.router.navigate(['home']);
  }

  logout() {
    localStorage.removeItem('isLogged');
    this.router.navigate(['']);
    return true;
  }

  isLogged(): boolean {
    return !!localStorage.getItem('isLogged');
  }
}
