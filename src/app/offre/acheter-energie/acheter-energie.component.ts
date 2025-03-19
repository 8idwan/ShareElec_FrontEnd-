import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Offre } from '../model/offre.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../paymentservice/payment.service';
import { Router } from '@angular/router';  // Importer le Router

@Component({
  selector: 'app-acheter-energie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './acheter-energie.component.html',
  styleUrl: './acheter-energie.component.css'
})
export class AcheterEnergieComponent {

  acheterForm: FormGroup;
  isProcessingPayment = false;
  stripePromise = loadStripe('pk_test_51R4SW0PENFnTPu7Q1eAwM82kwqF4K7o8eYiAgOkx2KaIxtVfxHWgEHvxiA0U75JDhDpWigeDqLvnM6iCaubaFxPS00GrxxJZHl');

  constructor(
    public dialogRef: MatDialogRef<AcheterEnergieComponent>,
    @Inject(MAT_DIALOG_DATA) public offre: Offre,
    private fb: FormBuilder,
    private router: Router,
    private paymentService: PaymentService
  ) {
    this.acheterForm = this.fb.group({
      quantiteVoulue: [null, Validators.required] // Seulement requis si vendDetails est true
    });

    if (!offre.vendDetails) {
      this.acheterForm.get('quantiteVoulue')?.disable();
    }
  }

  onAnnulerClick(): void {
    this.dialogRef.close();
  }

  async onAcheterClick(): Promise<void> {
    this.markAllAsTouched();
    
    if (this.acheterForm.invalid) {
      return;
    }
    
    this.isProcessingPayment = true;
    
    try {
      // Calcul du montant à payer
      const quantite = this.offre.vendDetails ? this.acheterForm.value.quantiteVoulue : this.offre.quantite;
      const montant = quantite * this.offre.prixKw;
      
      this.paymentService.createPaymentIntent(montant).subscribe(
        async (response) => {
          console.log(response); // Vérifie ce que retourne l'API
      
          const stripe = await this.stripePromise;
          
          if (!stripe) {
            throw new Error("Stripe n'a pas pu être chargé");
          }
      
          const { error } = await stripe.redirectToCheckout({
            sessionId: response.sessionId  // ✅ Utiliser sessionId au lieu de clientSecret
          });
      
          if (error) {
            console.error("Erreur lors de la redirection vers Stripe:", error);
          } else {
            console.log("Redirection vers Stripe réussie");
            this.dialogRef.close("acheter");
            // Après le paiement réussi, rediriger vers la page offre/offres
            this.router.navigate(['/offre/offres']);
          }
        },
        (error) => {
          console.error("Erreur lors de la création de l'intention de paiement:", error);
          this.isProcessingPayment = false;
        }
      );
      
    } catch (error) {
      console.error('Erreur lors du traitement du paiement:', error);
      this.isProcessingPayment = false;
    }
  }
  private markAllAsTouched() {
    Object.keys(this.acheterForm.controls).forEach(key => {
      this.acheterForm.get(key)?.markAsTouched();
    });
  }
}
