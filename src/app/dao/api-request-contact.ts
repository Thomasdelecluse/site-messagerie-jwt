import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
interface ContactResponse {
  contactEmail:string,
  telephone:string,
  contactName:string
}

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class ApiContactRequest {
  private apiUrl = 'http://localhost:8080/api/contact';

  constructor(private http: HttpClient) { }

  getAllContactsOfUserConnected(): Observable<ContactResponse[]> {
    const url = `${this.apiUrl}`;
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<ContactResponse[]>(url, { headers });
  }
}

