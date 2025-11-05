import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

interface Lab {
  id: number;
  name: string;
  address: string;
  city: string;
  rating: number;
  accreditation: string;
  location: { lat: number; lng: number };
  testsCount: number;
  distance?: number;
}

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, MatCardModule, MatButtonModule],
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css'],
})
export class LabsComponent implements OnInit {
  labs: Lab[] = [
    {
      id: 1,
      name: 'City Diagnostics',
      address: '123 Marine Drive',
      city: 'Mumbai',
      rating: 4.7,
      accreditation: 'NABL',
      location: { lat: 18.9388, lng: 72.8354 },
      testsCount: 120,
    },
    {
      id: 2,
      name: 'HealthPlus Labs',
      address: '456 Andheri East',
      city: 'Mumbai',
      rating: 4.5,
      accreditation: 'ISO',
      location: { lat: 19.1136, lng: 72.8697 },
      testsCount: 98,
    },
    {
      id: 3,
      name: 'Apollo Diagnostics',
      address: '789 Bandra West',
      city: 'Mumbai',
      rating: 4.8,
      accreditation: 'NABL',
      location: { lat: 19.0596, lng: 72.8295 },
      testsCount: 150,
    },
    {
      id: 4,
      name: 'Metro Pathology',
      address: '321 Dadar',
      city: 'Mumbai',
      rating: 4.3,
      accreditation: 'CAP',
      location: { lat: 19.0176, lng: 72.8562 },
      testsCount: 85,
    },
  ];

  userLocation = { lat: 19.076, lng: 72.8777 }; // Mumbai center

  mapOptions: google.maps.MapOptions = {
    center: this.userLocation,
    zoom: 12,
    styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.calculateDistances();
  }

  calculateDistances() {
    this.labs = this.labs
      .map(lab => ({
        ...lab,
        distance: Math.round(this.getDistance(lab.location) * 10) / 10,
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }

  getDistance(location: { lat: number; lng: number }): number {
    const R = 6371; // Earth radius in km
    const dLat = (location.lat - this.userLocation.lat) * Math.PI / 180;
    const dLng = (location.lng - this.userLocation.lng) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.userLocation.lat * Math.PI / 180) *
        Math.cos(location.lat * Math.PI / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  viewDetails(id: number) {
    this.router.navigate(['/labs', id]);
  }
}
