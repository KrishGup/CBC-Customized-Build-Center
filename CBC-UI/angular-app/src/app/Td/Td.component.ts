import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-Td',
  templateUrl: './Td.component.html',
  styleUrls: ['./Td.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class TdComponent implements OnInit {
  uploadForm: FormGroup;
  filaments: any[] = [];
  selectedFilament: any;
  price: string = "N/A";

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.uploadForm = this.fb.group({
      file: [null],
      filament: ['']
    });
  }

  ngOnInit() {
    this.getFilaments();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadForm.patchValue({ file: file });
    }
  }

  getFilaments() {
    this.apiService.getFilaments().subscribe({
      next: (data: any[]) => {
        this.filaments = data;
      },
      error: (error) => {
        console.error('Error fetching filaments', error);
      }
    });
  }

  //define onsubmit
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file')!.value);
    formData.append('filament', this.uploadForm.get('filament')!.value);
    this.apiService.uploadFile(formData).subscribe({
      next: (data) => {
        this.price = data.price;
      },
      error: (error) => {
        console.error('Error uploading file', error);
      }
    });
  }
}
