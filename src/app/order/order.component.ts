import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  price = 0;

  constructor(private router: Router) {}

  orderNow() {
    const message = `Hello Cakelia Cake Studio,

I would like to place an order.

Please contact me regarding my cake order.`;

    window.open(
      'https://wa.me/919329754288?text=' + encodeURIComponent(message),
      '_blank'
    );
  }
}
