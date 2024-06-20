import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactServiceService } from "../service/contact-service.service";
import { Subscription } from "rxjs";
import { ApiMessageRequest } from "../dao/api-request-message";

interface Message {
  id: number,
  author: string,
  destination: string,
  date: string,
  message: string,
  type: 'received' | 'sent'
}

@Component({
  selector: 'app-right-message',
  templateUrl: './right-message.component.html',
  styleUrls: ['./right-message.component.css']
})
export class RightMessageComponent implements OnInit, OnDestroy {
  public contactConversation: { name: string, telephone: string, isClicked: boolean } | null = null;
  public messages: Message[] = [];
  private contactSubscription: Subscription | null = null;

  constructor(public contactService: ContactServiceService, private apiMessageRequest: ApiMessageRequest) { }

  ngOnInit(): void {
    this.contactSubscription = this.contactService.getContactSelectedId().subscribe((value) => {
      this.contactConversation = this.contactService.getContactByIndex(value);
      if (this.contactConversation != null) {
        this.apiMessageRequest.getAllMessageByConversation(this.contactConversation.name).subscribe(response => {
          this.messages = response.messages.map(message => ({
            ...message,
            type: message.author === this.contactConversation!.name ? 'received' : 'sent'
          }));
          this.messages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }, error => {
          console.error('Login failed:', error);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.contactSubscription?.unsubscribe();
  }
}
