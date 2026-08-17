import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatastoreService } from '../services/datastore.service';

interface Address {
  fullName: string; phone: string; house: string; area: string;
  city: string; state: string; pincode: string; saveAddress: boolean;
}

interface CartItem {
  id: number; name: string; size: string; price: number;
  quantity: number; image: string;
}

@Component({
  selector: 'app-order-now',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnDestroy {

  constructor(public dataStore:DatastoreService){}

  address: Address = {
    fullName: '', phone: '', house: '', area: '',
    city: 'Indore', state: 'Madhya Pradesh', pincode: '', saveAddress: false
  };

  deliveryDate = '';
  deliverySlot = '';
  instructions = '';
  paymentMethod = 'online';
  isPlacingOrder = false;
  cardExpanded = 0;

  toggleCard(cardNum:number){
    if(this.cardExpanded == cardNum){
      this.cardExpanded = 0;
    }
    else {this.cardExpanded = cardNum;}
  }

  deliveryCharge = 70;
  packagingCharge = 30;

  cartItems: CartItem[] = [
    { id: 1, name: 'Chocolate Truffle Cake', size: '1 Kg', price: 650, quantity: 1, image: 'assets/images/cakelia/chocolate-truffle.jpg' },
    { id: 2, name: 'Red Velvet Cake', size: '0.5 Kg', price: 550, quantity: 1, image: 'assets/images/cakelia/red-velvet.jpg' },
    { id: 3, name: 'Butterscotch Cake', size: '0.5 Kg', price: 300, quantity: 1, image: 'assets/images/cakelia/butterscotch.jpg' }
  ];

  toastMessage = '';
  private toastTimer?: ReturnType<typeof setTimeout>;

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get totalPayable(): number {
    return this.subtotal + this.deliveryCharge + this.packagingCharge;
  }

  increaseItem(item: CartItem): void {
    if (item.quantity < 20) item.quantity++;
  }

  decreaseItem(item: CartItem): void {
    if (item.quantity > 1) item.quantity--;
  }

  changeAddress(): void {
    this.showToast('Edit your delivery address.');
  }

  editCart(): void {
    this.showToast('Opening cart...');
    // Later: this.router.navigate(['/cart']);
  }

  placeOrder(): void {
    if (!this.validateOrder()) return;

    this.isPlacingOrder = true;

    // Later replace with:
    // POST /api/orders
    // {
    //   address: this.address,
    //   deliveryDate: this.deliveryDate,
    //   deliverySlot: this.deliverySlot,
    //   instructions: this.instructions,
    //   paymentMethod: this.paymentMethod,
    //   items: this.cartItems
    // }

    setTimeout(() => {
      this.isPlacingOrder = false;
      this.showToast('Order placed successfully!');
    }, 1000);
  }

  private validateOrder(): boolean {
    if (!this.address.fullName.trim()) return this.invalid('Please enter your name.');
    if (!/^[0-9]{10}$/.test(this.address.phone)) return this.invalid('Please enter a valid 10-digit phone number.');
    if (!this.address.house.trim()) return this.invalid('Please enter your house / flat details.');
    if (!this.address.area.trim()) return this.invalid('Please enter your area / street.');
    if (!this.address.city.trim()) return this.invalid('Please enter your city.');
    if (!this.address.state) return this.invalid('Please select your state.');
    if (!/^[0-9]{6}$/.test(this.address.pincode)) return this.invalid('Please enter a valid 6-digit pincode.');
    if (!this.deliveryDate) return this.invalid('Please select delivery date.');
    if (!this.deliverySlot) return this.invalid('Please select a delivery time slot.');
    return true;
  }

  private invalid(message: string): false {
    this.showToast(message);
    return false;
  }

  goBack(): void {
    window.history.back();
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastMessage = '', 2400);
  }

  ngOnDestroy(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }
}