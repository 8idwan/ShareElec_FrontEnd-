import { RouterModule, Routes } from '@angular/router';
import { OffreListComponent } from './offre/offre-list/offre-list.component';
import { NgModule } from '@angular/core';
import { MesOffresComponent } from './offre/mes-offres/mes-offres.component';


export const routes: Routes = [ {path:'',component:OffreListComponent},
                                 {path:'mesoffres',component:MesOffresComponent},
  {
    path: 'offre',
    loadChildren: () => import('./offre/offre.module')
      .then(m => m.OffreModule),
     
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

