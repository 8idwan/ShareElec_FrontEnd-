import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { OffreService } from '../service/offre.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-offre',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule, HttpClientModule],
  providers: [OffreService],
  templateUrl: './add-offre.component.html',
  styleUrl: './add-offre.component.css'
})
export class AddOffreComponent {
  addform: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private offreservice: OffreService,
    private dialogRef: MatDialogRef<AddOffreComponent>,
    private router: Router
  ) {
    this.addform = this.fb.group({
      quantite: [null, [Validators.required, Validators.min(1)]],
      vendDetails: [true, Validators.required],
      type: ['', Validators.required],
      prixKw: [null, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.addform.valid) {
      const formData = {
        quantite: Number(this.addform.value.quantite),
        vendDetails: Boolean(this.addform.value.vendDetails),
        type: String(this.addform.value.type),
        prixKw: Number(this.addform.value.prixKw),
        userId: 2,
        status: true, 
        date: new Date().toISOString().split('T')[0]
      };

      console.log('Valeurs du formulaire :', formData);
      
      this.offreservice.createOffre(formData).subscribe({
        next: (res) => {
          console.log('Success:', res);
          this.dialogRef.close(res);
          this.router.navigateByUrl('/mesoffres'); 
        },
        error: (error) => {
          console.error('Error details:', error);
        }
      });
    } else {
      // Log specific validation errors
      Object.keys(this.addform.controls).forEach(key => {
        const control = this.addform.get(key);
        if (control?.errors) {
          console.log(`${key} validation errors:`, control.errors);
        }
      });
      console.log('Le formulaire contient des erreurs.');
    }
  }
}