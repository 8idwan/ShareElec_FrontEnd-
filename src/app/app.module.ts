import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // Standalone component
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { MembresComponent } from './membres/membres.component';
import { ContactComponent } from './contact/contact.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { CalendarComponent } from './calendar/calendar.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent, // Composant principal
    HomeComponent, // Déclarer HomeComponent
    MembresComponent, // Déclarer MembresComponent
    ContactComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
     BrowserAnimationsModule,
    RouterModule.forRoot(routes) ,// Configurer les routes
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
