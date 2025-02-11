import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  verifyEmailForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.verifyEmailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required]]
    });
  }

  verifyEmail() {
    if (this.verifyEmailForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs correctement.";
      return;
    }

    const { email, code } = this.verifyEmailForm.value;
    console.log('Vérification en cours pour:', email, code);

    this.http.post<{ message: string }>('http://localhost:5242/api/user/veriferEmail', { email, code })
      .subscribe({
        next: (response) => {
          console.log('Réponse du serveur:', response);
          this.successMessage = response.message;
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erreur de vérification:', error);
          this.errorMessage = error.error?.message || "Échec de la vérification.";
        }
      });
  }
}
