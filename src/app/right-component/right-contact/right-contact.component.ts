import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from '../../service/contact.service';
import { ApiContactRequest } from '../../dao/api-request-contact';
import ContactWithIsClicked from "../../dto/component/contact-with-is-clicked";
import {NavigationService} from "../../service/navigation.service";

@Component({
  selector: 'app-right-contact',
  templateUrl: './right-contact.component.html',
  styleUrls: ['./right-contact.component.css']
})
export class RightContactComponent implements OnInit, OnDestroy {
  public contactSelected: ContactWithIsClicked = {
    id: 0,
    contactEmail: '',
    telephone: '',
    contactName: '',
    image: '',
    isClicked: false
  };
  selectedFile: File | null = null;
  private contactSubscription: Subscription | null = null;

  constructor(private contactService: ContactService, private apiService: ApiContactRequest, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.LoadContact();
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    fileInput.click();
  }
  navigate(page: string) {
    console.log('Navigating to:', page);
    this.navigationService.navigate(page);
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
    if (!this.contactSelected) return;
      const contactToSave: any = {
        id: this.contactSelected.id,
        contactEmail: this.contactSelected.contactEmail,
        telephone: this.contactSelected.telephone,
        contactName: this.contactSelected.contactName,
      };

      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = (reader.result as string).split(',')[1];
          contactToSave.image = base64String;

          this.updateContact(contactToSave);
          this.selectedFile = null;
        };
        reader.readAsDataURL(this.selectedFile);
      } else if (this.contactSelected.image) {
        contactToSave.image = this.contactSelected.image;
        this.updateContact(contactToSave);

      } else {
        this.updateContact(contactToSave);
      }
    }

  deleteContact():void{
    if (this.contactSelected) {
      this.contactService.deleteContactById(this.contactSelected.id);
    }
  }

  private updateContact(contact: any): void {
    this.apiService.updateContact(contact)
      .subscribe({
        next: () => {
          this.contactService.getAllContactOfUserConnected();
          setTimeout(() => {
            this.LoadContact();
          }, 100);
        },
        error: (error) => {
      console.error('Error updating contact:', error);
    }
      });
  }
  private LoadContact(): void{
    this.contactSubscription = this.contactService.contactSelectedIdSubject.subscribe(() => {
      const selectedContact = this.contactService.getContactSelected();
      if (selectedContact) {
        this.contactSelected = {
          id: selectedContact.id,
          contactEmail: selectedContact.contactEmail,
          telephone: selectedContact.telephone,
          contactName: selectedContact.contactName,
          image: selectedContact.image,
          isClicked: selectedContact.isClicked,
        };
      }
      else this.resetUserSelected();

    });
  }

  resetUserSelected() : void{
  this.contactSelected.id = 0;
  this.contactSelected.contactEmail = '';
  this.contactSelected.telephone = '';
  this.contactSelected.contactName = '';
  this.contactSelected.image = '';
  this.contactSelected.isClicked = false;
  }
}
