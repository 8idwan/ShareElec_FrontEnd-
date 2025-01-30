import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { OffreService } from '../service/offre.service';
import { Router } from 'express';

@Component({
  selector: 'app-add-offre',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatDialogModule,HttpClientModule],
    providers: [OffreService],
  templateUrl: './add-offre.component.html',
  styleUrl: './add-offre.component.css'
})
export class AddOffreComponent {

  addform: FormGroup;
   user : any;

  constructor(private fb: FormBuilder,private offreservice: OffreService,private dialogRef: MatDialogRef<AddOffreComponent>) {
    //this.userid=localStorage.getItem('userid');
    this.user;
    this.addform = this.fb.group({
      quantite: [null, [Validators.required, Validators.min(1)]], 
      vendDetails: [null, Validators.required],
      type: [null, Validators.required], 
      prixKw: [null, [Validators.required, Validators.min(0)]], // Prix unitaire
    });
  }

  ngOnInit(){
  }

  onSubmit() {
    if (this.addform.valid) {
      const formData = {
        ...this.addform.value,
        userId:1,
        status: 'active',
        date: new Date().toISOString()
      }
      console.log('Valeurs du formulaire :', formData);

      // Actions supplémentaires, comme l'envoi au backend
      console.log(JSON.stringify(formData));

      this.offreservice.createOffre(formData.value).subscribe(
        res => {
          console.log(res)
          this.dialogRef.close(res);

        },
        (error: Error) => {
          console.log(error)
        }
      );
    } else {
      console.log('Le formulaire contient des erreurs.');
    }
  }

}
