import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {LocalUserService} from "../service/local-user.service";
import ContactResponse from "../dto/response/contact-response-dto";
import SearchUserResponseDto from "../dto/response/search-user-response-dto";

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class ApiContactRequest {
  private apiUrl = 'http://localhost:8080/api/contact';

  constructor(private http: HttpClient,private userService: LocalUserService) { }

  getAllContactsOfUserConnected(): Observable<ContactResponse[]> {
    const url = `${this.apiUrl}`;
    const token = this.userService.getLocalToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<ContactResponse[]>(url, { headers });
  }

  updateContact(contact: ContactResponse): Observable<void> {
    const token = this.userService.getLocalToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put<void>(this.apiUrl, contact, { headers });
  }

  deleteContact(contactId: number): Observable<void> {
    const token = this.userService.getLocalToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.delete<void>( this.apiUrl + '/'+ contactId, { headers });
  }

  getContactBySearch(searchContact: string): Observable<SearchUserResponseDto[]> {
    const token = this.userService.getLocalToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const url = `${this.apiUrl}/${searchContact}`;
    return this.http.get<SearchUserResponseDto[]>(url, { headers });
  }

}

