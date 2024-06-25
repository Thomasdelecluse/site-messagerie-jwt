import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiContactRequest } from '../dao/api-request-contact';

interface Contact {
  id:number,
  contactEmail:string,
  telephone:string,
  contactName:string,
}
interface ContactList {
  id:number,
  contactEmail:string,
  telephone:string,
  contactName:string,
  isClicked:boolean,
}
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private _contactSelectedIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  ContactList: ContactList[] =[];

  constructor(private apiContactRequest: ApiContactRequest) {
  }

  ngOnInit(): void {
  }

  getAllContactOfUserConnected(){
    this.apiContactRequest.getAllContactsOfUserConnected().subscribe(
      (contacts: Contact[]) => {
        this.ContactList = contacts.map(contact => ({ ...contact, isClicked: false }));

        if (this.ContactList.length > 0) {
          this.ContactList[0].isClicked = true;
        }
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

  getContactSelected():ContactList{
    return this.ContactList[this._contactSelectedIdSubject.value];
  }
}
