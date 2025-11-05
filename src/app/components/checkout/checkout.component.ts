import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { Lab } from '../../interfaces/lab';
import { Test } from '../../interfaces/test';
import { Booking } from '../../interfaces/booking';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule, MatButtonModule, MatInputModule, MatRadioModule, MatSnackBarModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  labId?: number;
  testId?: number;
  lab?: Lab;
  test?: Test;
  booking: Partial<Booking> = { userName: '', age: 0, contact: '', date: '', time: '' };
  discount = 0;
  total = 0;
  showPayment = false;
  paymentMethod = 'card';
  cardDetails = { number: '', expiry: '', cvv: '' };
  upi = '';

  constructor(private route: ActivatedRoute, private dataService: DataService, private userService: UserService, private snackBar: MatSnackBar, private router: Router  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.labId = +params['lab'];
      this.testId = +params['test'];
      this.dataService.getLabs().subscribe(labs => {
        this.lab = labs.find(l => l.id === this.labId);
        this.test = this.lab?.tests.find(t => t.id === this.testId);
        if (this.test) {
          this.discount = this.userService.isFirstTimeUser() ? this.test.price * 0.1 : 0;
          this.total = this.test.price - this.discount;
        }
      });
    });
  }

  confirmBooking() {
    this.showPayment = true;
  }

  pay() {
    // Mock payment success
    const bookingId = 'BOOK' + Math.random().toString(36).substring(2, 7).toUpperCase();
    const fullBooking: Booking = {
      id: bookingId,
      labId: this.labId!,
      testId: this.testId!,
      userName: this.booking.userName!,
      age: this.booking.age!,
      contact: this.booking.contact!,
      date: this.booking.date!,
      time: this.booking.time!,
      price: this.test!.price,
      discount: this.discount,
      total: this.total
    };
    this.userService.addBooking(fullBooking);
    this.snackBar.open('Payment Successful! Booking ID: ' + bookingId, 'OK', { duration: 5000 });
    // Redirect to profile
    this.router.navigate(['/profile']);
  }
}