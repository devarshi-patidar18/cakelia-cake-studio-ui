import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatastoreService } from '../services/datastore.service';

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

  constructor(private router: Router,public dataStore: DatastoreService) {}

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
