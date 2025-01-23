import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffreRoutingModule } from './offre-routing.module';
import { AddOffreComponent } from './add-offre/add-offre.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OffreRoutingModule,
    AddOffreComponent
  ]
})
export class OffreModule { }
