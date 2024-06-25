import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import LoginResponseDto from "../dto/response/login-response-dto";
import RegisterResponseDto from "../dto/response/register-response-dto";


@Injectable({
  providedIn: 'root'
})
export class ApiAuthRequest {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {
  }

  register(data: any): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(`${this.apiUrl}/register`, data, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  postLogin(data: any): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/login`, data, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }
}
