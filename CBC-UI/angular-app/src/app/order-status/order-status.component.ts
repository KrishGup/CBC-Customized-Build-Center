import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css'],
  imports: [CommonModule, RouterOutlet, FormsModule],
  standalone: true
})
export class OrderStatusComponent implements OnInit {
  orderId: string = '';
  trackingInfo: any;
  errorMessage: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {}

  getOrderTracking() {
    if (!this.orderId) {
      this.errorMessage = 'Please enter a valid order ID.';
      return;
    }
    this.apiService.getOrderTracking(this.orderId).subscribe({
      next: data => {
        this.trackingInfo = data;
        this.errorMessage = '';
      },
      error: error => {
        this.errorMessage = 'Error fetching order tracking info. Please try again.';
        console.error('Error fetching order tracking info', error);
      }
    });
  }
}
