import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { UserResponseModel } from '../model/user-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser!: UserResponseModel | null; 

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Only use localStorage if we're in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      const storedUserJson = localStorage.getItem('currentUser');
      if (storedUserJson) {
        this.currentUser = JSON.parse(storedUserJson) as UserResponseModel;
      }
    }
  }

  deleteAccount(): void {
    if (!this.currentUser) return;

    // Log the endpoint for debugging
    const endpoint = `/api/user/del/${this.currentUser.id}`;
    console.log("Calling DELETE endpoint:", endpoint);

    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      this.userService.deleteUser(this.currentUser.id).subscribe({
        next: (res) => {
          console.log('Compte supprimé avec succès.', res);
          // Clear local storage only in browser context
          if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
          }
          // Redirect to login or homepage
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du compte :', err);
        }
      });
    }
  }
}