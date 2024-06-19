import { Component, OnInit } from '@angular/core';
import {ContactServiceService} from "../service/contact-service.service";

@Component({
  selector: 'app-left-contact',
  templateUrl: './left-contact.component.html',
  styleUrls: ['./left-contact.component.css']
})
export class LeftContactComponent implements OnInit {

  constructor(public contactService: ContactServiceService) { }

  ngOnInit(): void {
  }

  onContactClick(index: number) {
    this.contactService.contacts.forEach((contact, idx) => {
      contact.isClicked = idx === index;
    });
    this.contactService.setContactSelectedId(index);
  }
}
