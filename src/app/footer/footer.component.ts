import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  toastMessage = '';

  private toastTimer?: ReturnType<typeof setTimeout>;

  constructor(private router: Router) {}

  aboutUs(): void {
    this.showToast('Opening About Us...');
  }

  contactUs(): void {
    this.showToast('Opening Contact Us...');
  }

  openOrders(): void {
    this.router.navigate(['/order']);
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastTimer = setTimeout(() => this.toastMessage = '', 2200);
  }
}
