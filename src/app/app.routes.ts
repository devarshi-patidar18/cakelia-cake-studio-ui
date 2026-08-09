import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { GalleryComponent} from './gallery/gallery.component';
import { ProductsComponent} from './products/products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'order', component: OrderComponent },
  {path: 'gallery', component: GalleryComponent},
  {path: 'products', component: ProductsComponent},
  { path: '**', redirectTo: '' }
];
