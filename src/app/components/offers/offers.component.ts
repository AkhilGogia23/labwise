import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Offer {
  id: number;
  title: string;
  discount: string;
  description: string;
  validUntil: Date;
  code: string;
  lab: string;
  minAmount: number;
}

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent {
  offers: Offer[] = [
    {
      id: 1,
      title: 'Flat 30% OFF on Full Body Checkup',
      discount: '30%',
      description: 'Complete health package with 70+ tests',
      validUntil: new Date('2025-12-31'),
      code: 'HEALTH30',
      lab: 'City Diagnostics',
      minAmount: 1999,
    },
    {
      id: 2,
      title: '₹200 OFF on Blood Tests',
      discount: '₹200',
      description: 'CBC, Sugar, Lipid Profile & more',
      validUntil: new Date('2025-11-30'),
      code: 'BLOOD200',
      lab: 'HealthPlus Labs',
      minAmount: 500,
    },
    {
      id: 3,
      title: 'Buy 1 Get 1 Free on Vitamin Tests',
      discount: 'B1G1',
      description: 'Vitamin D, B12, Iron Studies',
      validUntil: new Date('2025-12-15'),
      code: 'VITAMINB1G1',
      lab: 'Apollo Diagnostics',
      minAmount: 0,
    },
    {
      id: 4,
      title: '50% OFF on First Booking',
      discount: '50%',
      description: 'New users only • Any test',
      validUntil: new Date('2025-11-20'),
      code: 'FIRST50',
      lab: 'All Labs',
      minAmount: 300,
    },
  ];

  getTimeLeft(endDate: Date): string {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    if (diff <= 0) return 'Expired';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    return days > 0 ? `${days} days left` : `${hours} hrs left`;
  }

  copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }
}
