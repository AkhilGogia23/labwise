import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Lab } from '../../interfaces/lab'; 
import { Test } from '../../interfaces/test'; // This is the correct type
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSliderModule, FormsModule, GoogleMapsModule, MatCardModule, MatSelectModule],
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css'] // <-- corrected property name: styleUrls (plural)
})
export class TestsComponent implements OnInit {
  labs: Lab[] = [];
  filteredLabs: Lab[] = [];
  testQuery = '';
  city = '';
  userLocation = { lat: 19.0760, lng: 72.8777 }; // Default Mumbai
  priceFilter = 10000;
  ratingFilter = 0;
  accreditationFilter = '';
  accreditations = ['NABL', 'ISO', ''];
  displayedColumns: string[] = ['test', 'lab', 'price', 'rating', 'tat', 'accreditation', 'distance'];
  mapOptions: google.maps.MapOptions = { center: this.userLocation, zoom: 12 };
  selectedLabId?: number;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.testQuery = params['test'] || '';
      this.city = params['city'] || 'Mumbai';
      this.loadLabs();
    });
    navigator.geolocation.getCurrentPosition(pos => {
      this.userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      this.mapOptions.center = this.userLocation;
    });
  }

  loadLabs() {
    this.dataService.getLabs().subscribe(labs => {
      this.labs = labs.filter(lab => 
        lab.city === this.city && 
        lab.tests.some(t => t.name.toLowerCase().includes(this.testQuery.toLowerCase()))
      );
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredLabs = this.labs.filter(lab => {
      const test = lab.tests.find(t => t.name.toLowerCase().includes(this.testQuery.toLowerCase()));
      const distance = this.dataService.getDistance(this.userLocation, lab.location);
      return test && test.price <= this.priceFilter &&
             lab.rating >= this.ratingFilter &&
             (this.accreditationFilter ? lab.accreditation === this.accreditationFilter : true) &&
             distance <= 50; // Arbitrary max distance
    });
  }

  onMarkerClick(labId: number) {
    this.selectedLabId = labId;
  }

  getTestDetails(lab: Lab): Test | undefined { // ✅ fixed type here
    return lab.tests.find(t => t.name.toLowerCase().includes(this.testQuery.toLowerCase()));
  }

  getDistance(lab: Lab): number {
    return this.dataService.getDistance(this.userLocation, lab.location);
  }

  book(labId: number, testId: number) {
    this.router.navigate(['/checkout'], { queryParams: { lab: labId, test: testId } });
  }
}
