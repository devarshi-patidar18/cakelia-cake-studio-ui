import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  cartCount = 0;
  menuOpen = false;
  toastMessage = '';

  constructor(private rotuer: Router) { }

  private sliderTimer?: ReturnType<typeof setInterval>;
  private toastTimer?: ReturnType<typeof setTimeout>;

  heroSlides = [
    { image: 'assets/ccs_without_bg12.png', alt: 'Beautiful pink celebration cake' },
    { image: 'assets/extra_chocolate_with_3_flowers.jpeg', alt: 'Cakelia custom cake' },
    { image: 'assets/free_home_delivery_image.jpeg', alt: 'Cakelia birthday cake' }
  ];

  categories = [
    { name: 'Birthday', icon: 'assets/icons/cake_icon1.jpeg' },
    { name: 'Anniversary', icon: 'assets/icons/cake_icon2.jpeg' },
    { name: 'Brownies', icon: 'assets/icons/brownie_icon.png' },
    { name: 'Custom Cake', icon: 'assets/icons/cake_icon4.jpeg' }
  ];

  products: Product[] = [
    { id: 1, name: 'Chocolate Truffle', price: 350, image: 'assets/cakes/chocolate_flower_350.jpeg' },
    { id: 2, name: 'Red Velvet', price: 350, image: 'assets/cakes/heart_350.jpeg' },
    { id: 3, name: 'Black Forest', price: 600, image: 'assets/cakes/pure_chocolate_600.jpeg' },
    { id: 4, name: 'Black Forest', price: 700, image: 'assets/cakes/double_layer_700.jpeg' },
    // { id: 5, name: 'Black Forest', price: 700, image: 'assets/cakes/double_layer_700.jpeg' }
  ];

  ngOnInit(): void {
    this.sliderTimer = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.sliderTimer) clearInterval(this.sliderTimer);
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  selectSlide(index: number): void { this.currentSlide = index; }

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }

  addToCart(product: Product): void {
    this.cartCount++;
    this.showToast(`${product.name} added to cart`);
  }

  orderNow(): void { 
    this.showToast('Opening cakes menu...'); 
    this.rotuer.navigate(["/order"]);
  }
  openProduct(id: number): void { this.showToast(`Opening product #${id}`); }
  openCart(): void { this.showToast('Opening cart...'); }
  openProfile(): void { this.showToast('Opening profile...'); }
  search(): void { this.showToast('Search opened'); }
  selectCategory(name: string): void { this.showToast(`Showing ${name} cakes`); }
  viewAllCategories(): void {
    this.showToast('Opening all categories...');
    this.rotuer.navigate(["/products"]);
  }
  viewAllProducts(): void { this.showToast('Opening all cakes...'); }
  openOrders(): void { this.showToast('Opening your orders...'); }
  aboutUs(): void { this.showToast('Opening About Us...'); }
  contactUs(): void { this.showToast('Opening Contact Us...'); }

  goHome(): void {
    this.menuOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastMessage = '', 2200);
  }
}