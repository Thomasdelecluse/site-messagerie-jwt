import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from "../service/contact.service";
import { Subscription } from "rxjs";
import { ApiMessageRequest } from "../dao/api-request-message";
import {MessageUpdateService} from "../service/message-update.service";
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
  public contactConversation: { contactEmail: string, telephone: string,contactName: string, isClicked: boolean } | null = null;
  public messages: Message[] = [];
  private contactSubscription: Subscription | null = null;
  private messageUpdateSubscription: Subscription | null = null;

  constructor(
    public contactService: ContactService,
    private apiMessageRequest: ApiMessageRequest,
    private messageUpdateService: MessageUpdateService
  ) { }

  ngOnInit(): void {
      this.contactSubscription = this.contactService.getContactSelectedId().subscribe((value) => {
      this.messages = [];
      this.contactConversation = this.contactService.getContactByIndex(value);
      if (this.contactConversation != null) {
        this.loadMessages();

        this.messageUpdateSubscription = this.messageUpdateService.messageUpdated.subscribe(() => {
          this.loadMessages();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.contactSubscription?.unsubscribe();
    this.messageUpdateSubscription?.unsubscribe();
  }

  private loadMessages(): void {
    this.apiMessageRequest.getAllMessageByConversation(this.contactConversation!.contactEmail).subscribe(response => {
      this.messages = response.messages.map(message => ({
        ...message,
        type: message.author === this.contactConversation!.contactEmail ? 'received' : 'sent'
      }));
      this.messages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, error => {
      console.error('Load Message fail:', error);
    });
  }
}
