import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

interface Speciality {
  title: string;
  description: string;
  image: string;
  route: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutUsComponent {

  values: ValueItem[] = [
    { icon: '♡', title: 'Made With Love', description: 'Every order is prepared with care, patience and attention to detail.' },
    { icon: '✿', title: 'Fresh Ingredients', description: 'We believe great taste starts with quality and carefully selected ingredients.' },
    { icon: '★', title: 'Beautiful Designs', description: 'From elegant classics to customized creations, we make your cake memorable.' },
    { icon: '✓', title: 'Customer Happiness', description: 'Your happiness is the most important ingredient in everything we do.' }
  ];

  specialities: Speciality[] = [
    { title: 'Cakes', description: 'Beautiful cakes for birthdays, anniversaries and every celebration.', image: 'assets/images/cakelia/about/cakes.jpg', route: '/cakes' },
    { title: 'Brownies', description: 'Rich, fudgy brownies made for chocolate lovers.', image: 'assets/images/cakelia/about/brownies.jpg', route: '/brownies' },
    { title: 'Custom Cakes', description: 'Tell us your idea and we will create something special for you.', image: 'assets/images/cakelia/about/custom-cake.jpg', route: '/custom-cake' },
    { title: 'Desserts', description: 'Sweet treats to make your everyday moments happier.', image: 'assets/images/cakelia/about/desserts.jpg', route: '/desserts' }
  ];

  stats = {
    cakes: '500+',
    customOrders: '200+',
    happyCustomers: '450+',
    love: '100%'
  };

  constructor(private router: Router) {}

  orderNow(): void {
    this.router.navigate(['/order']);
  }

  contactUs(): void {
    this.router.navigate(['/contact-us']);
  }

  openCategory(route: string): void {
    this.router.navigateByUrl(route);
  }
}