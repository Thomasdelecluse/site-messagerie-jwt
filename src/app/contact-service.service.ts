import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  private _contactSelectedIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  contacts = [
    { name: 'Lucas Mercier', telephone: '0667788595', isClicked: false },
    { name: 'Thomas le roi', telephone: '0667788595', isClicked: false },
  ];

  setContactSelectedId(value: number) {
    this._contactSelectedIdSubject.next(value);
  }

  getContactSelectedId(): Observable<number> {
    return this._contactSelectedIdSubject.asObservable();
  }

  getContactByIndex(number:number){
    return this.contacts[number]
  }
}
