import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffreListComponent } from './offre-list/offre-list.component';
import { MesOffresComponent } from './mes-offres/mes-offres.component';

const routes: Routes = [
  {path:"offres",component:OffreListComponent},
  {path:"mesoffres",component:MesOffresComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffreRoutingModule { }
