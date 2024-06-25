import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service'; // Importer Contact depuis le service

@Component({
  selector: 'app-left-contact',
  templateUrl: './left-contact.component.html',
  styleUrls: ['./left-contact.component.css']
})
export class LeftContactComponent implements OnInit {

  constructor(public contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getAllContactOfUserConnected();
    //TO DO
    setTimeout(() => {
      this.contactService.setContactSelectedId(0);
    }, 100);
  }

  onContactClick(index: number) {
    this.contactService.ContactList.forEach((contact, idx) => {
      contact.isClicked = idx === index;
    });
    this.contactService.setContactSelectedId(index);
  }
}
