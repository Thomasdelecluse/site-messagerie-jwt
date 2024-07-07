import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiContactRequest} from '../dao/api-request-contact';
import ContactWithIsClicked from "../dto/component/contact-with-is-clicked";
import ContactResponse from "../dto/response/contact-response-dto";


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public contactSelectedIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  contactList: ContactWithIsClicked[] = [];

  constructor(private apiContactRequest: ApiContactRequest) {
  }

  ngOnInit(): void {
  }

  getAllContactOfUserConnected() {
    this.apiContactRequest.getAllContactsOfUserConnected().subscribe({
        next: (contacts: ContactResponse[]) => {
          this.contactList = contacts.map(contact => ({...contact, isClicked: false}));

          if (this.contactList.length > 0) {
            this.contactList[0].isClicked = true;
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

  getContactSelected(): ContactWithIsClicked {
    return this.contactList[this.contactSelectedIdSubject.value];
  }
}
