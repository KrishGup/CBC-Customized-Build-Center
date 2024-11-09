import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  scadCode: string = '';
  renderedModel: any;

  constructor(private apiService: ApiService) {}

  renderModel() {
    this.apiService.renderScad(this.scadCode).subscribe(response => {
      const reader = new FileReader();
      reader.onload = () => {
        this.renderedModel = reader.result;
      };
      reader.readAsDataURL(response);
    });
  }

  downloadScad() {
    const blob = new Blob([this.scadCode], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'model.scad';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  downloadStl() {
    this.apiService.getStl(this.scadCode).subscribe(response => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'model.stl';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
