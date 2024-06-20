import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
interface MessagesResponse {
  messages:[Message]
}

interface Message {
  id:number,
  author:string,
  destination:string,
  date:string,
  message:string
}


@Injectable({
  providedIn: 'root'
})
export class ApiMessageRequest {
  private apiUrl = 'http://localhost:8080/api/message';

  constructor(private http: HttpClient) { }


  getAllMessageByConversation(contactEmail: string): Observable<MessagesResponse> {
    const url = `${this.apiUrl}?email=${encodeURIComponent(contactEmail)}`;
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<MessagesResponse>(url, { headers });
  }

  postCreateMessage(message: { destination: string, message: string }): Observable<void> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post<void>(this.apiUrl, message, { headers });
  }
}
