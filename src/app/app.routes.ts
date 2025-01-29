import { RouterModule, Routes } from '@angular/router';
import { OffreListComponent } from './offre/offre-list/offre-list.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { ProfileComponent } from './user/profile/profile.component';

export const routes: Routes = [ {path:'',component:OffreListComponent},
  
  {
    path: 'offre',
    loadChildren: () => import('./offre/offre.module')
      .then(m => m.OffreModule),
     
  },
  {
    path: 'user',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

