// profile.component.ts

import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    // Load user from localStorage
    const storedUserJson = localStorage.getItem('currentUser');
    if (storedUserJson) {
      this.currentUser = JSON.parse(storedUserJson) as UserResponseModel;
    }
  }

  deleteAccount(): void {
    if (!this.currentUser) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      this.userService.deleteUser(this.currentUser.id).subscribe({
        next: (res) => {
          console.log('Compte supprimé avec succès.', res);
          // Clear local storage so the user is fully "logged out"
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');

          // Redirect to login or homepage
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du compte :', err);
          // Show an error message or handle as needed
        }
      });
    }
  }
}