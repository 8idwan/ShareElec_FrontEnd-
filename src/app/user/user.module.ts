import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    VerifyEmailComponent
  ],
})
export class UserModule { }