import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHelloMessage(): Observable<any> {
    return this.http.get(`${this.apiUrl}/hello`);
  }

  renderScad(scadCode: string): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/render`, { scadCode }, { responseType: 'blob' });
  }

  getStl(scadCode: string): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/getstl`, { scadCode }, { responseType: 'blob' });
  }
}
