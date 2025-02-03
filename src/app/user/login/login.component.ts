import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { LoginRequestModel } from '../model/login-request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    console.log('Attempting login with:', { email: this.email }); // Don't log password
    
    const credentials: LoginRequestModel = { 
      email: this.email, 
      password: this.password
    };
  
    this.userService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Réponse invalide du serveur';
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        if (error.status === 0) {
          this.errorMessage = 'Impossible de joindre le serveur';
        } else {
          this.errorMessage = error.error?.message || 'Erreur de connexion';
        }
      }
    });
  }
}