import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DatastoreService } from '../services/datastore.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() variant: 'default' | 'page' = 'default';
  @Input() pageTitle = '';
  @Input() cartCount = 0;

  @Output() back = new EventEmitter<void>();
  @Output() searchClicked = new EventEmitter<void>();
  @Output() cartClicked = new EventEmitter<void>();

  menuOpen = false;
  toastMessage = '';

  private toastTimer?: ReturnType<typeof setTimeout>;

  constructor(private router: Router,public dataStore:DatastoreService) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  goHome(): void {
    this.menuOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/']);
  }

  onBack(): void {
    this.back.emit();
  }

  goBack(){
    this.dataStore.updateScreenNavigation("",true);
    this.router.navigate(["/"]);
  }

  onSearch(): void {
    if (this.variant === 'page') {
      this.searchClicked.emit();
      return;
    }

    this.search();
  }

  onCart(): void {
    if (this.variant === 'page') {
      this.cartClicked.emit();
      return;
    }

    this.openCart();
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
    this.router.navigate(["/aboutus"]);
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