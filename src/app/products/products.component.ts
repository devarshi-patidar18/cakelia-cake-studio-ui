import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

interface CakeProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  favorite: boolean;
  oldPrice?: number;
  discount?: number;
}

@Component({
  selector: 'app-cakes',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router:Router){}

  cartCount = 3;

  selectedCategory = 'All';
  selectedSort = 'Sort';
  sortMenuOpen = false;

  searchOpen = false;
  searchText = '';
  searchResults: CakeProduct[] = [];

  toastMessage = '';
  private toastTimer?: ReturnType<typeof setTimeout>;

  categories = [
    'All',
    'Birthday',
    'Chocolate',
    'Anniversary'
  ];

  sortOptions = [
    'Sort',
    'Price: Low to High',
    'Price: High to Low',
    'Name: A-Z'
  ];

  products: CakeProduct[] = [
    {
      id: 1,
      name: 'Chocolate Truffle',
      price: 650,
      image: 'assets/cakes/chocolate_flower_350.jpeg',
      category: 'Chocolate',
      favorite: false
    },
    {
      id: 2,
      name: 'Red Velvet',
      price: 550,
      image: 'assets/cakes/double_layer_700.jpeg',
      category: 'Birthday',
      favorite: false
    },
    {
      id: 3,
      name: 'Butterscotch',
      price: 600,
      image: 'assets/cakes/heart_350.jpeg',
      category: 'Birthday',
      favorite: false
    },
    {
      id: 4,
      name: 'Black Forest',
      price: 500,
      image: 'assets/cakes/pure_chocolate_600.jpeg',
      category: 'Birthday',
      favorite: false
    },
    {
      id: 5,
      name: 'Chocolate',
      price: 450,
      image: 'assets/cakes/chocolate_pure.jpeg',
      category: 'Anniversary',
      favorite: false
    },
    {
      id: 6,
      name: 'Ferrero Rocher',
      price: 750,
      image: 'assets/images/cakelia/ferrero-rocher.jpg',
      category: 'Chocolate',
      favorite: false
    }
  ];

  filteredProducts: CakeProduct[] = [];

  ngOnInit(): void {
    this.applyFilters();
  }

  getProducts(): CakeProduct[] {
    return this.filteredProducts;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  toggleSortMenu(): void {
    this.sortMenuOpen = !this.sortMenuOpen;
  }

  selectSort(option: string): void {
    this.selectedSort = option;
    this.sortMenuOpen = false;
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.products];

    if (this.selectedCategory !== 'All') {
      result = result.filter(
        product => product.category === this.selectedCategory
      );
    }

    switch (this.selectedSort) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;

      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;

      case 'Name: A-Z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    this.filteredProducts = result;
  }

  toggleFavorite(product: CakeProduct): void {
    product.favorite = !product.favorite;

    if (product.favorite) {
      this.showToast(`${product.name} added to wishlist`);
    } else {
      this.showToast(`${product.name} removed from wishlist`);
    }
  }

  openProduct(productId: number): void {
    this.showToast(`Opening cake #${productId}`);
    this.router.navigate(["/productdetails"]);

    /*
     * When routing is ready:
     *
     * this.router.navigate(['/product', productId]);
     */
  }

  openCart(): void {
    this.showToast('Opening cart...');

    /*
     * Later:
     * this.router.navigate(['/cart']);
     */
  }

  openSearch(): void {
    this.searchOpen = true;
    this.searchText = '';
    this.searchResults = [];
  }

  closeSearch(): void {
    this.searchOpen = false;
  }

  applySearch(): void {
    const text = this.searchText.trim().toLowerCase();

    if (!text) {
      this.searchResults = [];
      return;
    }

    this.searchResults = this.products.filter(product =>
      product.name.toLowerCase().includes(text) ||
      product.category.toLowerCase().includes(text)
    );
  }

  goBack(): void {
    /*
     * When Angular Router is configured:
     *
     * this.location.back();
     */

    window.history.back();
  }

  private showToast(message: string): void {
    this.toastMessage = message;

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastTimer = setTimeout(() => {
      this.toastMessage = '';
    }, 2200);
  }
}
