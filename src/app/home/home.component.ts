import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  constructor(private router:Router){}
  ngAfterViewInit(): void {
    
  }

  orderNow() {
    this.router.navigate(["/order"]);
  // window.open(
  //   'https://wa.me/919329754288?text=Hi, I want to order a cake.',
  //   '_blank'
  // );
}
}
