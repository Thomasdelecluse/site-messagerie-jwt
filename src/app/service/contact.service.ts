import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiContactRequest} from '../dao/api-request-contact';
import ContactWithIsClicked from "../dto/component/contact-with-is-clicked";
import ContactResponse from "../dto/response/contact-response-dto";


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public contactSelectedIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(0);

  contactList: ContactWithIsClicked[] = [];

  constructor(private apiContactRequest: ApiContactRequest) {
  }

  ngOnInit(): void {
  }

  getAllContactOfUserConnected() {
    this.apiContactRequest.getAllContactsOfUserConnected().subscribe({
        next: (contacts: ContactResponse[]) => {
          this.contactListAdapter(contacts);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      }
    );
  }

  deleteContactById(contactId: number): void{
     this.apiContactRequest.deleteContact(contactId).subscribe({
         next: () => {
           this.getAllContactOfUserConnected();
         },
         error: (error) => {
           console.error('Failed to delete contact:', error);
         }
       });
  }

  contactListAdapter(contacts: ContactResponse[]){
    if (contacts != null || undefined){
      this.contactList = contacts.map((contact, index) => ({
        ...contact,
        // add isClicked to first contact in list
        isClicked: index === 0
      }));
      // update Observer with first contact in list
      this.setContactSelectedId(0);
    }else{
      this.contactList = [];
      this.setContactSelectedId(null);
    }
  }

  setContactSelectedId(value: number | null) {
    this.contactSelectedIdSubject.next(value);
  }

  getContactSelected(): ContactWithIsClicked | null {
    if (this.contactSelectedIdSubject.value != null){
      return this.contactList[this.contactSelectedIdSubject.value];
    }
    return null
  }

}
