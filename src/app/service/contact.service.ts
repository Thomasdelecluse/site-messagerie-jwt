import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiContactRequest} from '../dao/api-request-contact';

interface Contact {
  id: number,
  contactEmail: string,
  telephone: string,
  contactName: string,
}

interface ContactList {
  id: number,
  contactEmail: string,
  telephone: string,
  contactName: string,
  isClicked: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public contactSelectedIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  ContactList: ContactList[] = [];

  constructor(private apiContactRequest: ApiContactRequest) {
  }

  ngOnInit(): void {
  }

  getAllContactOfUserConnected() {
    this.apiContactRequest.getAllContactsOfUserConnected().subscribe({
        next: (contacts: Contact[]) => {
          this.ContactList = contacts.map(contact => ({...contact, isClicked: false}));

          if (this.ContactList.length > 0) {
            this.ContactList[0].isClicked = true;
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      }
    );
  }


  setContactSelectedId(value: number) {
    this.contactSelectedIdSubject.next(value);
  }

  getContactSelected(): ContactList {
    return this.ContactList[this.contactSelectedIdSubject.value];
  }
}
