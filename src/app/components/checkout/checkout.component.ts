import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';

interface Lab {
  id: number;
  name: string;
  address: string;
  tests: { id: number; name: string; price: number; tat: string }[];
}

interface Test {
  id: number;
  name: string;
  price: number;
  tat: string;
}

interface Booking {
  id: string;
  labId: number;
  testId: number;
  userName: string;
  age: number;
  contact: string;
  date: string;
  time: string;
  price: number;
  discount: number;
  total: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatStepperModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSnackBarModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  labId?: number;
  testId?: number;
  lab?: Lab;
  test?: Test;
  booking: Partial<Booking> = {
    userName: '',
    age: 0,
    contact: '',
    date: '',
    time: ''
  };
  discount = 0;
  total = 0;
  paymentMethod = 'card';
  cardDetails = { number: '', expiry: '', cvv: '' };
  upi = '';
  isFirstTime = true; // Fake: 10% off for first-time

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.labId = +params['lab'];
      this.testId = +params['test'];

      // Fake data
      const labs: Lab[] = [
        {
          id: 1,
          name: 'City Diagnostics',
          address: 'Marine Drive, Mumbai',
          tests: [
            { id: 1, name: 'Complete Blood Count (CBC)', price: 450, tat: '2 hrs' }
          ]
        }
      ];

      this.lab = labs.find(l => l.id === this.labId);
      this.test = this.lab?.tests.find(t => t.id === this.testId);

      if (this.test) {
        this.discount = this.isFirstTime ? this.test.price * 0.1 : 0;
        this.total = this.test.price - this.discount;
      }
    });
  }

  pay() {
    const bookingId = 'BOOK' + Math.floor(Math.random() * 10000);
    this.snackBar.open(`Payment Successful! Booking ID: ${bookingId}`, 'Close', {
      duration: 5000,
      panelClass: ['bg-green-500', 'text-white']
    });
    setTimeout(() => this.router.navigate(['/profile']), 1500);
  }
}