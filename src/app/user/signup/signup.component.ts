import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserRequestModel } from '../model/user-request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: UserRequestModel = new UserRequestModel();
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {
    console.log('SignupComponent initialized');
  }

  signUp() {
    console.log('Form submitted with data:', {
      prenom: this.user.prenom,
      nom: this.user.nom,
      email: this.user.email,
      numeroTelephone: this.user.numeroTelephone,
      hasPassword: !!this.user.motDePasse
    });

    if (this.user.motDePasse !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      console.log('Password mismatch error');
      return;
    }

    this.userService.signUp(this.user).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        this.successMessage = 'Un code de vérification a été envoyé à votre email.';
        this.router.navigate(['/user/verify-email'], { queryParams: { email: this.user.email } });

      },
      error: (error) => {
        console.error('Signup failed:', error);
        this.errorMessage = error.error?.message || 'Erreur lors de l\'inscription.';
      }
    });
  }
}
