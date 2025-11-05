import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Test } from '../../interfaces/test';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  searchQuery = '';
  city = 'Mumbai';
  cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune'];
  popularTests: Test[] = [];

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    // Show first 4 tests as "popular"
    this.dataService.getLabs().subscribe(labs => {
      const allTests = labs.flatMap(l => l.tests);
      const unique = Array.from(new Set(allTests.map(t => t.name)))
        .map(name => allTests.find(t => t.name === name)!);
      this.popularTests = unique.slice(0, 4);
    });
  }

  search() {
    this.router.navigate(['/tests'], {
      queryParams: { test: this.searchQuery, city: this.city }
    });
  }

  searchTest(name: string) {
    this.searchQuery = name;
    this.search();
  }
}