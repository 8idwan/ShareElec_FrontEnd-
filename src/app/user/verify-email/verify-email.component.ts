import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  verifyEmailForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  
  // We'll store the email from the query param here
  private email: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // Capture the email from the query param
    this.email = this.route.snapshot.queryParamMap.get('email') || '';

    // Create the form with only the "code" control
    this.verifyEmailForm = this.fb.group({
      code: ['', [Validators.required]]
    });
  }

  verifyEmail() {
    if (this.verifyEmailForm.invalid) {
      this.errorMessage = "Veuillez saisir le code de vérification.";
      return;
    }

    // Get only the code from the form
    const { code } = this.verifyEmailForm.value;
    console.log('Vérification en cours pour email:', this.email, 'et code:', code);

    // Send { email, code } to the server
    this.http.post<{ message: string }>(
      'http://localhost:5242/api/user/veriferEmail',
      { email: this.email, code }
    ).subscribe({
      next: (response) => {
        console.log('Réponse du serveur:', response);
        this.successMessage = response.message;
        this.router.navigate(['/user/login']); 
      },
      error: (error) => {
        console.error('Erreur de vérification:', error);
        this.errorMessage = error.error?.message || "Échec de la vérification.";
      }
    });
  }
}
