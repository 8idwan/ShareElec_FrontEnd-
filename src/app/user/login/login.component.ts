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
    console.log('Attempting login with:', { email: this.email }); 

    const credentials: LoginRequestModel = { 
      email: this.email, 
      password: this.password
    };

    this.userService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        if (response && response.token) {
          // 1) STORE TOKEN IN LOCAL STORAGE
          localStorage.setItem('token', response.token);

          // 2) STORE THE USER DATA AS A STRING
          //    response.utilisateur is the UserResponseModel
          localStorage.setItem('currentUser', JSON.stringify(response.utilisateur));

          // 3) REDIRECT AFTER LOGIN
          this.router.navigate(['/user/profile']);
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