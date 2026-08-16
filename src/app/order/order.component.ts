import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnDestroy {
  cartCount = 3;
  currentImage = 0;
  selectedSize = '1 Kg';
  selectedFlavor = 'Chocolate';
  quantity = 1;
  favorite = false;
  toast = '';
  private toastTimer?: ReturnType<typeof setTimeout>;

  product = {
    id: 1,
    name: 'Chocolate Truffle Cake',
    price: 650,
    description: 'Rich chocolate sponge with chocolate mousse and ganache.',
    available: true
  };

  images = [
    'assets/images/cakelia/products/chocolate-truffle-1.jpg',
    'assets/images/cakelia/products/chocolate-truffle-2.jpg',
    'assets/images/cakelia/products/chocolate-truffle-3.jpg',
    'assets/images/cakelia/products/chocolate-truffle-4.jpg'
  ];

  sizes = ['0.5 Kg', '1 Kg', '1.5 Kg', '2 Kg'];
  flavors = ['Chocolate', 'Truffle', 'Dark Chocolate'];

  get unitPrice(): number {
    const sizeMultiplier: Record<string, number> = {
      '0.5 Kg': .5, '1 Kg': 1, '1.5 Kg': 1.45, '2 Kg': 1.85
    };
    const flavorExtra: Record<string, number> = {
      'Chocolate': 0, 'Truffle': 50, 'Dark Chocolate': 80
    };
    return Math.round(
      this.product.price * (sizeMultiplier[this.selectedSize] ?? 1) +
      (flavorExtra[this.selectedFlavor] ?? 0)
    );
  }

  get totalPrice(): number {
    return this.unitPrice * this.quantity;
  }

  selectSize(size: string): void { this.selectedSize = size; }
  selectFlavor(flavor: string): void { this.selectedFlavor = flavor; }

  increaseQuantity(): void {
    if (this.quantity < 20) this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  selectImage(index: number): void { this.currentImage = index; }

  previousImage(): void {
    this.currentImage = this.currentImage === 0
      ? this.images.length - 1 : this.currentImage - 1;
  }

  nextImage(): void {
    this.currentImage = (this.currentImage + 1) % this.images.length;
  }

  toggleWishlist(): void {
    this.favorite = !this.favorite;
    this.showToast(this.favorite ? 'Added to wishlist' : 'Removed from wishlist');
  }

  addToCart(): void {
    this.cartCount += this.quantity;
    this.showToast(`${this.product.name} added to cart`);
    // Later: POST /api/cart/items
  }

  buyNow(): void {
    this.showToast('Proceeding to checkout...');
    // Later: router.navigate(['/checkout'])
  }

  openCart(): void {
    this.showToast('Opening cart...');
    // Later: router.navigate(['/cart'])
  }

  goBack(): void {
    window.history.back();
  }

  private showToast(message: string): void {
    this.toast = message;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast = '', 2200);
  }

  ngOnDestroy(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }
}