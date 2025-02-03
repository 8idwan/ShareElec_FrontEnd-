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
  motDePasse: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    console.log('Login function triggered');
    const credentials: LoginRequestModel = { 
      email: this.email, 
      motDePasse: this.motDePasse
    };
  
    this.userService.login(credentials).subscribe(
      response => {
        console.log('Successful login:', response);
        if (response && response.token) {  // ✅ Ensure the key matches backend response
          localStorage.setItem('token', response.token);
          this.router.navigate(['/login-success']);
        } else {
          console.error('Login response missing token:', response);
          this.errorMessage = 'Identifiants incorrects';
        }
      },
      error => {
        console.error('Login failed:', error);
        this.errorMessage = 'Identifiants incorrects';
      }
    );    
  
  }
}
