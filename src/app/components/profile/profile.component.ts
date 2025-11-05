import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

interface Order {
  id: string;
  test: string;
  lab: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  amount: number;
}

interface SavedLab {
  id: number;
  name: string;
  address: string;
  rating: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  // Fake User Data
  user = {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    joined: "March 2024",
    avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=10B981&color=fff&bold=true"
  };

  // Fake Orders
  orders: Order[] = [
    { id: "ORD001", test: "Complete Blood Count", lab: "City Diagnostics", date: "Oct 28, 2025", status: "Completed", amount: 450 },
    { id: "ORD002", test: "Lipid Profile", lab: "HealthPlus Labs", date: "Oct 15, 2025", status: "Completed", amount: 800 },
    { id: "ORD003", test: "MRI Brain", lab: "Apollo Diagnostics", date: "Nov 05, 2025", status: "Pending", amount: 4800 },
    { id: "ORD004", test: "Vitamin D Test", lab: "City Diagnostics", date: "Sep 30, 2025", status: "Cancelled", amount: 0 }
  ];

  // Fake Saved Labs
  savedLabs: SavedLab[] = [
    { id: 1, name: "City Diagnostics", address: "Marine Drive, Mumbai", rating: 4.7 },
    { id: 2, name: "Apollo Diagnostics", address: "Bandra West, Mumbai", rating: 4.8 }
  ];

  logout() {
    // Fake logout
    alert("Logged out successfully!");
  }
}