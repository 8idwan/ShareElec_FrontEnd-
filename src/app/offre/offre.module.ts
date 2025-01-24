import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffreRoutingModule } from './offre-routing.module';
import { AddOffreComponent } from './add-offre/add-offre.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OffreRoutingModule,
    AddOffreComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OffreModule { }
