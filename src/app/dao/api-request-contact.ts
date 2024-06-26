import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {LocalUserService} from "../service/local-user.service";
interface ContactResponse {
  id:number,
  contactEmail:string,
  telephone:string,
  contactName:string,
}

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
}

