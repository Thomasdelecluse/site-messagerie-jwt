import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
}
interface RegisterResponse {
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class ApiAuthRequest {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }
  register(data: any): Observable<RegisterResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  postLogin(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
