import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiContactRequest {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }


}
