import { RouterModule, Routes } from '@angular/router';
import { OffreListComponent } from './offre/offre-list/offre-list.component';
import { NgModule } from '@angular/core';
import { MesOffresComponent } from './offre/mes-offres/mes-offres.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';


export const routes: Routes = [ 
  {path:'',component:OffreListComponent},
  { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent},
    

  {
    path: 'offre',
    loadChildren: () => import('./offre/offre.module')
      .then(m => m.OffreModule),
     
  },


  {
    path: 'user',
    loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule),

  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

