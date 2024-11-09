import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/pages/main/app.component';
import { AppComponent } from './app/pages/main/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule),
  ]
}).catch(err => console.error(err));
