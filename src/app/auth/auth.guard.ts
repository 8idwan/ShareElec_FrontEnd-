// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if a token exists in localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Token present => user is considered logged in
      return true;
    } else {
      // No token => redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
﻿