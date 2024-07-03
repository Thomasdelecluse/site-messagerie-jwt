import { Component, OnInit } from '@angular/core';
import {ContactService} from "../../service/contact.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-right-contact',
  templateUrl: './right-contact.component.html',
  styleUrls: ['./right-contact.component.css']
})
export class RightContactComponent implements OnInit {
  public contactConversation: {
    id: number,
    contactEmail?: string,
    telephone?: string,
    contactName?: string,
    isClicked: boolean
  } = {
    id: 0,
    contactEmail: '',
    telephone: '',
    contactName: '',
    isClicked: false
  };
  private contactSubscription: Subscription | null = null;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactSubscription = this.contactService.contactSelectedIdSubject.subscribe(() => {
      this.contactConversation = this.contactService.getContactSelected() || this.contactConversation;
    });
  }

}
