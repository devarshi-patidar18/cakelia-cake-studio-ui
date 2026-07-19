import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  price = 0;
  orderId = '';
  cakeType = 'Birthday Cake';
  flavour = 'Chocolate';
  weight = '500 gm';
  shape = 'Round';
  occasion = 'Birthday';
  customerName = '';
  mobileNumber = '';
  deliveryDate = '';
  deliveryHour = '01';
  deliveryMinute = '00';
  deliveryPeriod = 'AM';
  deliveryAddress = '';
  messageOnCake = '';
  description = '';
  uploadReference = '';
  units = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.orderId = this.generateOrderId();
    this.updatePrice();
    void this.loadEmailJs();
  }

  private async loadEmailJs(): Promise<void> {
    const win: any = window as any;
    if (win.emailjs) {
      try {
        win.emailjs.init(environment.EMAILJS_PUBLIC_KEY);
      } catch {
        // ignore init errors and continue
      }
      return;
    }

    try {
      await this.ensureEmailJsLoaded();
      if (environment.EMAILJS_PUBLIC_KEY) {
        try {
          win.emailjs.init(environment.EMAILJS_PUBLIC_KEY);
        } catch {
          // ignore init errors and continue
        }
      }
    } catch (error) {
      console.error('EmailJS script load failed', error);
    }
  }

  private ensureEmailJsLoaded(): Promise<void> {
    const win: any = window as any;
    if (win.emailjs) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-emailjs]');
      if (existing) {
        (existing as HTMLScriptElement).addEventListener('load', () => resolve());
        (existing as HTMLScriptElement).addEventListener('error', () => reject(new Error('EmailJS script failed to load')));
        return;
      }

      const script = document.createElement('script');
      script.setAttribute('data-emailjs', 'true');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('EmailJS script failed to load'));
      document.head.appendChild(script);
    });
  }

  private generateOrderId(): string {
    const date = new Date();
    const prefix = 'CKL';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${day}${month}${year}${random}`;
  }

  updatePrice(): void {
    const priceMap: Record<string, number> = {
      '500 gm': 499,
      '1 Kg': 799,
      '1.5 Kg': 1199,
      '2 Kg': 1599,
      '3 Kg': 2399
    };

    this.price = priceMap[this.weight] ?? 499;
  }

  private getPounds(): number {
    switch (this.weight) {
      case '500 gm':
        return 1;
      case '1 Kg':
        return 2;
      case '1.5 Kg':
        return 3;
      case '2 Kg':
        return 4;
      case '3 Kg':
        return 6;
      default:
        return 1;
    }
  }

  async orderNow(): Promise<void> {
    if (!environment.EMAILJS_SERVICE_ID || !environment.EMAILJS_TEMPLATE_ID) {
      alert('EmailJS service/template IDs are not configured.');
      return;
    }

    const templateParams = {
      order_id: this.orderId,
      price: this.price,
      cake_name: this.cakeType,
      cake_type: this.cakeType,
      flavour: this.flavour,
      weight: this.weight,
      shape: this.shape,
      occasion: this.occasion,
      customer_name: this.customerName,
      mobile_number: this.mobileNumber,
      delivery_date: this.deliveryDate,
      delivery_time: `${this.deliveryHour}:${this.deliveryMinute} ${this.deliveryPeriod}`,
      delivery_address: this.deliveryAddress,
      message_on_cake: this.messageOnCake,
      description: this.description,
      units: this.units,
      total_cost: this.price * this.units,
      pound: this.getPounds(),
      upload_reference: this.uploadReference || 'Not uploaded',
      to_email: 'cakeliacakestudio@gmail.com',
      to_name: 'Cakelia Cake Studio',
      recipient_email: 'cakeliacakestudio@gmail.com',
      recipient_name: 'Cakelia Cake Studio',
      email: 'cakeliacakestudio@gmail.com',
      to: 'cakeliacakestudio@gmail.com',
      reply_to: this.customerName ? this.customerName : 'cakeliacakestudio@gmail.com'
    };

    try {
      await this.loadEmailJs();
      const win: any = window as any;
      await win.emailjs.send(
        environment.EMAILJS_SERVICE_ID,
        environment.EMAILJS_TEMPLATE_ID,
        templateParams
      );
      alert('Order request sent successfully!');
    } catch (error: any) {
      console.error('EmailJS error:', error);
      const message = error?.text || 'Please verify your EmailJS service ID, template ID, and public key.';
      alert(`Unable to send order request right now. ${message}`);
    }
  }
}
