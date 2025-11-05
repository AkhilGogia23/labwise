import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lab } from '../interfaces/lab';
import { Test as LabTest } from '../interfaces/test';
import { Offer } from '../interfaces/offer';
@Injectable({
  providedIn: 'root'
})
export class DataService {
constructor(private http: HttpClient) {}

  getLabs(): Observable<Lab[]> {
    return this.http.get<Lab[]>('/assets/data/labs.json');
  }

  getTests(): Observable<LabTest[]> {
    return this.http.get<LabTest[]>('/assets/data/tests.json');
  }

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>('/assets/data/offers.json');
  }

  getDistance(userLocation: { lat: number; lng: number }, labLocation: { lat: number; lng: number }): number {
    const R = 6371; // Earth radius in km
    const dLat = this.deg2rad(labLocation.lat - userLocation.lat);
    const dLng = this.deg2rad(labLocation.lng - userLocation.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.deg2rad(userLocation.lat)) * Math.cos(this.deg2rad(labLocation.lat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
