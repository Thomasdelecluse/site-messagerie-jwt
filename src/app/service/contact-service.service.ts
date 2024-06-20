import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiContactRequest } from '../dao/api-request-contact';

interface Contact {
  contactEmail:string,
  telephone:string
}
interface ContactWithIsClicked {
  contactEmail:string,
  telephone:string
  isClicked:boolean
}
@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  private _contactSelectedIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  contacts: Contact[] = [];
  ContactWithIsClicked: ContactWithIsClicked[] =[];

  constructor(private apiContactRequest: ApiContactRequest) {
  }

  ngOnInit(): void {
  }

  getContactOfUserConnected(){
    this.apiContactRequest.getAllContactsOfUserConnected().subscribe(
      (contacts: Contact[]) => {
        this.ContactWithIsClicked = contacts.map(contact => ({ ...contact, isClicked: true }));
      },
      error => {
      console.error('Login failed:', error);
    });
  }

  setContactSelectedId(value: number) {
    this._contactSelectedIdSubject.next(value);
  }

  getContactSelectedId(): Observable<number> {
    return this._contactSelectedIdSubject.asObservable();
  }

  getContactByIndex(index: number): ContactWithIsClicked {
    return this.ContactWithIsClicked[index];
  }
}
