import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  private navPageSubject = new BehaviorSubject<string>('message'); // Valeur par défaut
  navPage$ = this.navPageSubject.asObservable();

  navigate(page: string) {
    this.navPageSubject.next(page);
  }

}
