import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OffreListComponent } from './offre/offre-list/offre-list.component';
import { SideMenuComponent } from "./offre/side-menu/side-menu.component";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ShareElec';
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkAuthentication();

    // Subscribe to router events to check authentication after navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkAuthentication();
    });
  }

  checkAuthentication() {
    this.isAuthenticated = !!localStorage.getItem('token');
  }
}