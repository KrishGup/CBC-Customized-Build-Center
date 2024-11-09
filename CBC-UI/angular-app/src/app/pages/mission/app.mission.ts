import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.mission.html',
  styleUrls: ['./app.mission.css']
})
export class AppComponent {
  title = 'angular-app';
}
