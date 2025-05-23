import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // Standalone component
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, DatePipe } from '@angular/common';
import { OffreListComponent } from './offre/offre-list/offre-list.component';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    BrowserModule,
     BrowserAnimationsModule,
    RouterModule.forRoot(routes) ,// Configurer les routes
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
  ],
  providers: [DatePipe],
  bootstrap: []
})
export class AppModule {}
