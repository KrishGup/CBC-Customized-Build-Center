import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { TdComponent } from './Td/Td.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'order', component: OrderStatusComponent },
  { path: '3d', component: TdComponent }
];
