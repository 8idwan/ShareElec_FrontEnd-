import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Offre } from '../model/offre.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-acheter-energie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './acheter-energie.component.html',
  styleUrl: './acheter-energie.component.css'
})
export class AcheterEnergieComponent {

  acheterForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AcheterEnergieComponent>,
    @Inject(MAT_DIALOG_DATA) public offre: Offre,
    private fb: FormBuilder
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

  onAcheterClick(): void {
    if (this.offre.vendDetails) {
      if (this.acheterForm.value.quantiteVoulue != null) {
        // TODO: Envoyer les données d'achat (this.offre et this.acheterForm.value) au service
        console.log('Offre à acheter:', this.offre);
        console.log('Quantité voulue:', this.acheterForm.value.quantiteVoulue);
        this.dialogRef.close('acheter'); // Envoyer un signal de succès à votre composant parent

        // Marquez les champs comme touchés pour afficher les erreurs de validation
        this.markAllAsTouched();
      }
    } else {
      // TODO: Envoyer les données d'achat (this.offre et this.acheterForm.value) au service
      console.log('Offre à acheter:', this.offre);
      console.log('Quantité voulue:', this.acheterForm.value.quantiteVoulue);
      this.dialogRef.close('acheter'); // Envoyer un signal de succès à votre composant parent

      // Marquez les champs comme touchés pour afficher les erreurs de validation
      this.markAllAsTouched();
    }


  }

  private markAllAsTouched() {
    Object.keys(this.acheterForm.controls).forEach(key => {
      this.acheterForm.get(key)?.markAsTouched();
    });
  }
}
