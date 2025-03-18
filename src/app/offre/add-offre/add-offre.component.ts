import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { OffreService } from '../service/offre.service';

import { Router } from '@angular/router';
import { UserResponseModel } from '../../user/model/user-response.model';


@Component({
  selector: 'app-add-offre',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule, HttpClientModule],
  providers: [OffreService,MatSnackBar],
  templateUrl: './add-offre.component.html',
  styleUrl: './add-offre.component.css'
})
export class AddOffreComponent implements OnInit{
  addform: FormGroup;
  currentUser!: UserResponseModel | null; 
  balance:any;
  

  constructor(
    private fb: FormBuilder,
    private offreservice: OffreService,
    private dialogRef: MatDialogRef<AddOffreComponent>,
    private router: Router,
    private dialog: MatDialog,  // Ajout du MatDialog
  private snackBar: MatSnackBar,  // Ajout du SnackBar

  ) {
    this.addform = this.fb.group({
      quantite: [null, [Validators.required, Validators.min(1)]],
      vendDetails: [true, Validators.required],
      type: ['', Validators.required],
      prixKw: [null, [Validators.required, Validators.min(0)]],
    });
  }

    ngOnInit(): void {
      // Load user from localStorage
      const storedUserJson = localStorage.getItem('currentUser');
      if (storedUserJson) {
        this.currentUser = JSON.parse(storedUserJson) as UserResponseModel;
      }
      console.log(this.currentUser?.id);
      console.log(this.currentUser?.sommeEnergie);

      // Vérifier si sommeEnergie est disponible et mettre à jour la validation de quantite
  if (this.currentUser?.sommeEnergie !== undefined) {
    this.addform.get('quantite')?.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(this.currentUser.sommeEnergie)
    ]);
    this.addform.get('quantite')?.updateValueAndValidity();
  }
    }

  onSubmit() {
    // Si l'utilisateur saisie une somme > a L'energie qu'il possede dans sa balance
      const quantite = Number(this.addform.value.quantite);
      if (this.currentUser && this.currentUser.sommeEnergie !== undefined) {
        if (quantite > this.currentUser.sommeEnergie) {
          this.showWarningMessage(this.currentUser.sommeEnergie);
          return; 
        }
      }
    /************************************************** */

    if (this.addform.valid) {
      const formData = {
        quantite: Number(this.addform.value.quantite),
        vendDetails: Boolean(this.addform.value.vendDetails),
        type: String(this.addform.value.type),
        prixKw: Number(this.addform.value.prixKw),
        userId:this.currentUser?.id,
        status: true, 
        date: new Date().toISOString().split('T')[0]
      };

      console.log('Valeurs du formulaire :', formData);
      
      this.offreservice.createOffre(formData).subscribe({
        next: (res) => {
          console.log('Success:', res);
          this.dialogRef.close('success');
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


  closeDialog() {
    this.dialogRef.close();
  }

  showWarningMessage(balance:number) {
    this.snackBar.open('Veuillez saisir une quantité inférieure à votre somme d\'énergie : ' + balance, 'Fermer', {
      duration: 3000, // 3 secondes
      panelClass: ['warning-snackbar'] 
    });
  }
  

  
}