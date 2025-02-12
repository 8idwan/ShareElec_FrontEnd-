import { Routes } from '@angular/router';
import { OffreListComponent } from './offre/offre-list/offre-list.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { ProfileComponent } from './user/profile/profile.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';


export const routes: Routes = [ 
  {path: '', component: OffreListComponent},
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
      {path: 'verify-email', component: VerifyEmailComponent },
      { path: '**', redirectTo: '' }
    ],
  },
];