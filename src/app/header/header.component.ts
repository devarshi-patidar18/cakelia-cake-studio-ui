import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen = false;
  cartCount = 0;
  toastMessage = '';

  private toastTimer?: ReturnType<typeof setTimeout>;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  goHome(): void {
    this.menuOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/']);
  }

  search(): void {
    this.showToast('Search opened');
  }

  openCart(): void {
    this.showToast('Opening cart...');
  }

  openProfile(): void {
    this.showToast('Opening profile...');
  }

  viewAllCategories(): void {
    this.showToast('Opening all categories...');
  }

  viewAllProducts(): void {
    this.showToast('Opening all cakes...');
  }

  openOrders(): void {
    this.showToast('Opening your orders...');
  }

  contactUs(): void {
    this.showToast('Opening Contact Us...');
  }

  orderNow(): void {
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