import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from '../../service/contact.service';
import { ApiContactRequest } from '../../dao/api-request-contact';
import ContactWithIsClicked from "../../dto/component/contact-with-is-clicked";

@Component({
  selector: 'app-right-contact',
  templateUrl: './right-contact.component.html',
  styleUrls: ['./right-contact.component.css']
})
export class RightContactComponent implements OnInit, OnDestroy {
  public contactConversation: ContactWithIsClicked = {
    id: 0,
    contactEmail: '',
    telephone: '',
    contactName: '',
    image: '',
    isClicked: false
  };
  selectedFile: File | null = null;
  private contactSubscription: Subscription | null = null;

  constructor(private contactService: ContactService, private apiService: ApiContactRequest) { }

  ngOnInit(): void {
    this.LoadContact();
  }



  ngOnDestroy(): void {
    if (this.contactSubscription) {
      this.contactSubscription.unsubscribe();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    const contactToSave: any = {
      id: this.contactConversation.id,
      contactEmail: this.contactConversation.contactEmail,
      telephone: this.contactConversation.telephone,
      contactName: this.contactConversation.contactName,
    };

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        contactToSave.image = base64String;

        this.updateContact(contactToSave);
      };
      reader.readAsDataURL(this.selectedFile);
    } else if (this.contactConversation.image) {
      contactToSave.image = this.contactConversation.image;
      this.updateContact(contactToSave);

    } else {
      this.updateContact(contactToSave);
    }
  }

  private updateContact(contact: any): void {
    this.apiService.updateContact(contact)
      .subscribe(updatedContact => {
        this.contactService.getAllContactOfUserConnected();
        setTimeout(() => {
          this.LoadContact();
        }, 100);
      }, error => {
        console.error('Error updating contact:', error);
      });
  }
  private LoadContact(): void{
    this.contactSubscription = this.contactService.contactSelectedIdSubject.subscribe(() => {
      const selectedContact = this.contactService.getContactSelected();
      console.log(selectedContact);
      if (selectedContact) {
        this.contactConversation = {
          id: selectedContact.id,
          contactEmail: selectedContact.contactEmail,
          telephone: selectedContact.telephone,
          contactName: selectedContact.contactName,
          image: selectedContact.image,
          isClicked: selectedContact.isClicked,
        };
      }
    });
  }
}
