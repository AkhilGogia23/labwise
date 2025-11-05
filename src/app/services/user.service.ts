import { Injectable } from '@angular/core';
import { Booking } from '../interfaces/booking';
@Injectable({
  providedIn: 'root'
})
export class UserService {
 private isFirstTime = !localStorage.getItem('bookings');

  getProfile(): { name: string; email: string } {
    return JSON.parse(localStorage.getItem('profile') || '{"name": "John Doe", "email": "john@example.com"}');
  }

  updateProfile(profile: { name: string; email: string }) {
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  getBookings(): Booking[] {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
  }

  addBooking(booking: Booking) {
    const bookings = this.getBookings();
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    this.isFirstTime = false;
  }

  isFirstTimeUser(): boolean {
    return this.isFirstTime;
  }

  logout() {
    localStorage.clear();
  }
}
