import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Lab } from '../../interfaces/lab';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-lab-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, GoogleMapsModule, MatButtonModule,MatIcon],
  templateUrl: './lab-details.component.html',
  styleUrl: './lab-details.component.css'
})
export class LabDetailsComponent implements OnInit {
  lab?: Lab;
  displayedColumns: string[] = ['name', 'price', 'tat'];
  mapOptions: google.maps.MapOptions = { zoom: 15 };

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.dataService.getLabs().subscribe(labs => {
      this.lab = labs.find(l => l.id === id);
      if (this.lab) this.mapOptions.center = this.lab.location;
    });
  }

  book(testId: number) {
    if (this.lab) this.router.navigate(['/checkout'], { queryParams: { lab: this.lab.id, test: testId } });
  }
}