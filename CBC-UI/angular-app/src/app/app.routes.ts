import { Routes } from '@angular/router';
import { AppComponent as MainComponent } from './pages/main/app.component';
import { AppComponent as MissionComponent } from './pages/mission/app.mission';

export const routes: Routes = [
{ path: '', component: MainComponent },
  { path: 'mission', component: MissionComponent }
];