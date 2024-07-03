import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalUserService {

  getLocalToken() {
    return sessionStorage.getItem('token')
  }

  removeToken(){
    sessionStorage.removeItem('token')
  }
}
