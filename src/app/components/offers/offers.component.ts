import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Offer } from '../../interfaces/offer';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit {
  offers: Offer[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getOffers().subscribe(offers => this.offers = offers);
  }
}