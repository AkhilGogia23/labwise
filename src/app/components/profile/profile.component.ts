import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';  // Wait, it's user.service.ts
import { Booking } from '../../interfaces/booking';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule, MatButtonModule, MatInputModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: { name: string; email: string } = { name: '', email: '' };
  bookings: Booking[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.profile = this.userService.getProfile();
    this.bookings = this.userService.getBookings();
  }

  saveProfile() {
    this.userService.updateProfile(this.profile);
  }

  logout() {
    this.userService.logout();
  }
}