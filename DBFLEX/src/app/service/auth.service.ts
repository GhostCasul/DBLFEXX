import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  checkAuthentication(): boolean {
    return this.isAuthenticated;
  }
}
