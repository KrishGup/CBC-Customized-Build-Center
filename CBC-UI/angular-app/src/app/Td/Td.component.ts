import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

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

  constructor(private fb: FormBuilder, private apiService: ApiService, private http: HttpClient) {
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
      next: (response: { filaments: any[] }) => {
        this.filaments = response.filaments;
      },
      error: (error) => {
        console.error('Error fetching filaments', error);
      }
    });
  }

  async onSubmit() {
    const file = this.uploadForm.get('file')!.value;

    if (file) {
      try {
        // Upload the file to File.io and get the URL
        // const fileURL = await this.uploadFileToFileIo(file);
        const fileURL = await this.uploadFileToFileIo(file);
        console.log(fileURL);
        const response = await lastValueFrom(this.apiService.sliceFile(fileURL));
        console.log(response);
        this.price = response.data.price; // Access the price within the data object
        // print response

      } catch (error) {
        console.error('Error uploading file or slicing', error);
      }
    }
  }

  async uploadFileToFileIo(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.http.request('PUT', 'https://use08.thegood.cloud/remote.php/webdav/' + file.name, {
      body: file,
      headers: {
        'Authorization': 'Basic ' + btoa('krishgup1@gmail.com:HzZ9s-BSqe7-tJ9Zb-cxraw-cpom7')
      },
      responseType: 'text'
    }).toPromise();

    // Construct the file URL
    const fileURL = `https://use08.thegood.cloud/remote.php/webdav/${file.name}`;
    return fileURL;
  }
}
