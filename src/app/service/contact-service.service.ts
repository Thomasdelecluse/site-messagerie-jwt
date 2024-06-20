import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiContactRequest } from '../dao/api-request-contact';

interface ApiContacts {
  contacts: ApiContact[];
}

interface ApiContact {
  contactEmail: string;
  telephone: string;
}

export interface Contact extends ApiContact {
  isClicked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  private _contactSelectedIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  contacts: Contact[] = [];

  constructor(private apiContactRequest: ApiContactRequest) {
  }

  ngOnInit(): void {
  }

  public getContactRequest(){
    this.apiContactRequest.getAllContactsOfUserConnected().subscribe({
      next: (response) => {
        if (response && response.contacts) {
          this.contacts = response.contacts.map(apiContact => ({
            ...apiContact,
            isClicked: false
          }));
          console.log(this.contacts)
        } else {
          console.error('Response or contacts array is undefined');
        }
      },
      error: (error) => {
        console.error('Failed to receive contacts:', error);
      }
    });
  }

  setContactSelectedId(value: number) {
    this._contactSelectedIdSubject.next(value);
  }

  getContactSelectedId(): Observable<number> {
    return this._contactSelectedIdSubject.asObservable();
  }

  getContactByIndex(index: number): Contact {
    return this.contacts[index];
  }
}
