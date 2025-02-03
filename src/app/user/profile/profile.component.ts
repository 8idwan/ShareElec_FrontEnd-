import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserResponseModel } from '../model/user-response.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: UserResponseModel | null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const userId = 1; // Get user ID from local storage or JWT
    this.userService.getUserInfo(userId).subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }
}
