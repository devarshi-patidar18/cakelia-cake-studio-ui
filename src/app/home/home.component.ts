import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    
  }

  orderNow() {
  // window.open(
  //   'https://wa.me/919329754288?text=Hi, I want to order a cake.',
  //   '_blank'
  // );
}
}
