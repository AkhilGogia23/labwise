import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Lab } from '../../interfaces/lab';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, MatCardModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent implements OnInit {
  labs: Lab[] = [];
  userLocation = { lat: 19.0760, lng: 72.8777 };
  mapOptions: google.maps.MapOptions = { center: this.userLocation, zoom: 12 };

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getLabs().subscribe(labs => this.labs = labs);
    navigator.geolocation.getCurrentPosition(pos => this.userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude });
  }

  viewDetails(id: number) {
    this.router.navigate(['/labs', id]);
  }
}