import { Component } from '@angular/core';

interface Cake {

  name: string;

  category: string;

  image: string;

}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  menuOpen = false;

  currentIndex = 0;

  autoSlide: any;

  cakes: Cake[] = [

    {
      name: 'Chocolate Delight',
      category: 'Chocolate Cake',
      image: 'assets/extra_chocolate_with_3_flowers.jpeg'
    },

    {
      name: 'Red Velvet',
      category: 'Premium Cake',
      image: 'assets/heart.jpeg'
    },

    {
      name: 'Blueberry Bliss',
      category: 'Fresh Fruit Cake',
      image: 'assets/Two_tier_chocolate_cake.jpeg'
    },

    // {
    //   name: 'KitKat Special',
    //   category: 'Designer Cake',
    //   image: 'assets/cake4.jpg'
    // },

    {
      name: 'Butterscotch',
      category: 'Classic Cake',
      image: 'assets/car.jpeg'
    },

    {
      name: 'Black Forest',
      category: 'Eggless Cake',
      image: 'assets/blue.jpeg'
    }

  ];

  ngOnInit(): void {

    this.startAutoSlide();

  }

  ngOnDestroy(): void {

    clearInterval(this.autoSlide);

  }

  toggleMenu(): void {

    this.menuOpen = !this.menuOpen;

  }

  startAutoSlide(): void {

    this.autoSlide = setInterval(() => {

      this.nextSlide();

    }, 3000);

  }

  restartAutoSlide(): void {

    clearInterval(this.autoSlide);

    this.startAutoSlide();

  }

  nextSlide(): void {

    this.currentIndex++;

    if (this.currentIndex >= this.cakes.length) {

      this.currentIndex = 0;

    }

    this.restartAutoSlide();

  }

  previousSlide(): void {

    this.currentIndex--;

    if (this.currentIndex < 0) {

      this.currentIndex = this.cakes.length - 1;

    }

    this.restartAutoSlide();

  }

  goToSlide(index: number): void {

    this.currentIndex = index;

    this.restartAutoSlide();

  }

  get leftIndex(): number {

    return this.currentIndex === 0
      ? this.cakes.length - 1
      : this.currentIndex - 1;

  }

  get rightIndex(): number {

    return this.currentIndex === this.cakes.length - 1
      ? 0
      : this.currentIndex + 1;

  }

}