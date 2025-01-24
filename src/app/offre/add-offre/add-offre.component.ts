import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-offre',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-offre.component.html',
  styleUrl: './add-offre.component.css'
})
export class AddOffreComponent {

  addform: FormGroup;
   user : any;

  constructor(private fb: FormBuilder) {
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
        /*userName: "this.user.userName",
        userStatus: "this.user.userStatus",*/
        userId:"this.user.userId",
        status: 'active',
        date: new Date().toISOString()
      }
      console.log('Valeurs du formulaire :', formData);

      // Actions supplémentaires, comme l'envoi au backend
      console.log(JSON.stringify(formData));
    } else {
      console.log('Le formulaire contient des erreurs.');
    }
  }

}
