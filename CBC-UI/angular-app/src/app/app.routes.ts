import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { TdComponent } from './Td/Td.component';
import {AboutComponent} from './about/about.component';
import {TutorialsComponent} from './Tutorials/Tutorials.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'order', component: OrderStatusComponent },
  { path: '3d', component: TdComponent },
  { path: 'about', component: AboutComponent },
  { path: 'tutorials', component: TutorialsComponent },
  { path: 'header', component: HeaderComponent }
];
