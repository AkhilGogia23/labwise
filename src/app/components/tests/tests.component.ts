import { Component, OnInit, AfterViewInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GoogleMapsModule } from '@angular/google-maps';

interface Lab {
  id: number;
  name: string;
  address: string;
  city: string;
  contact: string;
  rating: number;
  accreditation: string;
  location: { lat: number; lng: number };
  tests: { id: number; name: string; price: number; tat: string }[];
}

interface LabWithTest {
  lab: Lab;
  test: any;
  distance: number;
}

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    GoogleMapsModule
  ],
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit, AfterViewInit {
  fakeLabs: Lab[] = [
    {
      id: 1,
      name: 'City Diagnostics',
      address: 'Marine Drive, Mumbai',
      city: 'Mumbai',
      contact: '+91 98765 43210',
      rating: 4.7,
      accreditation: 'NABL',
      location: { lat: 18.9388, lng: 72.8354 },
      tests: [
        { id: 1, name: 'Complete Blood Count (CBC)', price: 450, tat: '2 hrs' },
        { id: 2, name: 'MRI Brain', price: 4800, tat: '1 day' }
      ]
    },
    {
      id: 2,
      name: 'HealthPlus Labs',
      address: 'Andheri East, Mumbai',
      city: 'Mumbai',
      contact: '+91 87654 32109',
      rating: 4.5,
      accreditation: 'ISO',
      location: { lat: 19.1136, lng: 72.8697 },
      tests: [
        { id: 1, name: 'Complete Blood Count (CBC)', price: 400, tat: '3 hrs' },
        { id: 3, name: 'CT Scan Chest', price: 3200, tat: '6 hrs' }
      ]
    },
    {
      id: 3,
      name: 'Apollo Diagnostics',
      address: 'Bandra West, Mumbai',
      city: 'Mumbai',
      contact: '+91 91234 56789',
      rating: 4.8,
      accreditation: 'NABL',
      location: { lat: 19.0596, lng: 72.8295 },
      tests: [
        { id: 1, name: 'Complete Blood Count (CBC)', price: 420, tat: '2.5 hrs' }
      ]
    }
  ];

  filteredLabs: LabWithTest[] = [];
  testQuery = 'Complete Blood Count (CBC)';
  city = 'Mumbai';
  priceFilter = 10000;
  ratingFilter = 0;
  accreditationFilter = '';
  accreditations = ['NABL', 'ISO'];
  selectedLabId: number | null = null;

  userLocation = { lat: 19.076, lng: 72.8777 };
  mapOptions: google.maps.MapOptions = {
    center: this.userLocation,
    zoom: 11
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.testQuery = params['q'] || 'Complete Blood Count (CBC)';
      this.city = params['city'] || 'Mumbai';
      this.loadFakeData();
    });
  }

  ngAfterViewInit() {
    // 🔧 Force map + UI reflow to load correctly on first render
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {
        window.dispatchEvent(new Event('resize'));
      });
    }, 500);
  }

  loadFakeData() {
    const cityLabs = this.fakeLabs.filter(l => l.city === this.city);
    const matchedLabs = cityLabs
      .map(lab => {
        const test = lab.tests.find(t =>
          t.name.toLowerCase().includes(this.testQuery.toLowerCase())
        );
        if (!test) return null;
        const distance = this.getDistance(lab.location);
        return { lab, test, distance };
      })
      .filter((item): item is LabWithTest => !!item);

    this.filteredLabs = matchedLabs;
    this.applyFilters();
  }

  getDistance(location: { lat: number; lng: number }): number {
    const R = 6371;
    const dLat = (location.lat - this.userLocation.lat) * Math.PI / 180;
    const dLng = (location.lng - this.userLocation.lng) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.userLocation.lat * Math.PI / 180) *
        Math.cos(location.lat * Math.PI / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  applyFilters() {
    this.filteredLabs = this.fakeLabs
      .map(lab => {
        const test = lab.tests.find(t =>
          t.name.toLowerCase().includes(this.testQuery.toLowerCase())
        );
        if (!test) return null;
        const distance = this.getDistance(lab.location);
        return { lab, test, distance };
      })
      .filter(
        (item): item is LabWithTest =>
          !!item &&
          item.test.price <= this.priceFilter &&
          item.lab.rating >= this.ratingFilter &&
          (!this.accreditationFilter ||
            item.lab.accreditation === this.accreditationFilter)
      )
      .sort((a, b) => a.distance - b.distance);

    this.cdRef.detectChanges(); // 👈 ensures Angular re-renders all data immediately
  }

  bookTest(labId: number, testId: number) {
    this.router.navigate(['/checkout'], {
      queryParams: { lab: labId, test: testId }
    });
  }

  onMarkerClick(labId: number) {
    this.selectedLabId = labId;
  }
}
