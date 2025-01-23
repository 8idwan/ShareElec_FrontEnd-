import { RouterModule, Routes } from '@angular/router';
import { OffreListComponent } from './offre/offre-list/offre-list.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [ {path:'',component:OffreListComponent},
  
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

