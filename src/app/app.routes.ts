import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ProductsComponent} from './products/products.component';
import { ProductdetailsComponent} from './productdetails/productdetails.component';
import { AboutUsComponent } from './aboutus/aboutus.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'order', component: OrderComponent },
  {path: 'products', component: ProductsComponent},
  {path: 'productdetails', component: ProductdetailsComponent},
  {path: 'aboutus', component: AboutUsComponent},
  { path: '**', redirectTo: '' }
];
