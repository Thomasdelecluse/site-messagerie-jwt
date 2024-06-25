import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import MessageResponseDto from "../dto/response/message-response-dto";
import {LocalUserService} from "../service/local-user.service";


@Injectable({
  providedIn: 'root'
})
export class ApiMessageRequest {
  private apiUrl = 'http://localhost:8080/api/message';

  constructor(private http: HttpClient,private userService: LocalUserService) { }

  postCreateMessage(message: { contactEmail: string, message: string }): Observable<void> {
    console.log("post")
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.userService.getLocalToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post<void>(this.apiUrl, message, { headers });
  }

  getAllMessageByConversation(contactEmail: string): Observable<MessageResponseDto> {
    const url = `${this.apiUrl}?email=${encodeURIComponent(contactEmail)}`;
    const token = this.userService.getLocalToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<MessageResponseDto>(url, { headers });
  }
}
