import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-offre',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-offre.component.html',
  styleUrl: './edit-offre.component.css'
})
export class EditOffreComponent implements OnInit {
closeDialog() {
  const formData = {
    ...this.editform.value,
    id: this.offerId,
    userId: this.data.userId, 
    status: this.data?.status || 'Disponible',
    date: this.data?.date || new Date().toISOString()
  };
  this.dialogRef.close(formData);
}
  editform: FormGroup;
  isEditMode: boolean = false;
  offerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditOffreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data;
    if (this.isEditMode) {
      this.offerId = data.id;
    }

    this.editform = this.fb.group({
      quantite: [data?.quantite || null, [Validators.required, Validators.min(1)]],
      vendDetails: [data?.vendDetails || null, Validators.required],
      type: [data?.type || null, Validators.required],
      prixKw: [data?.prixKw || null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.editform.valid) {
      const formData = {
        ...this.editform.value,
        id: this.offerId,
        userId: this.data.userId, 
        status: this.data?.status || 'Disponible',
        date: this.data?.date || new Date().toISOString()
      };
      this.dialogRef.close(formData);
    } else {
      console.log('Le formulaire contient des erreurs.');
    }
  }
}