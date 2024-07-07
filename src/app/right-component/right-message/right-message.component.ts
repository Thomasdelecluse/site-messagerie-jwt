import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactService} from "../../service/contact.service";
import {Subscription} from "rxjs";
import {WebsocketService} from "../../service/websocket.service";
import MessageWithType from "../../dto/component/message-with-type";
import {MessageService} from "../../service/message.service";
import ContactWithIsClicked from "../../dto/component/contact-with-is-clicked";


@Component({
  selector: 'app-right-message',
  templateUrl: './right-message.component.html',
  styleUrls: ['./right-message.component.css']
})
export class RightMessageComponent implements OnInit, OnDestroy {
  private contactSubscription: Subscription | null = null;
  private messageWebSocketSubscription: Subscription | null = null;
  public messages: MessageWithType[] = [];
  public contactConversation: ContactWithIsClicked | null = null;

  constructor(
    public contactService: ContactService,
    public websocketService: WebsocketService,
    public messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.contactSubscription = this.contactService.contactSelectedIdSubject.subscribe(() => {
      this.contactConversation = this.contactService.getContactSelected();
      if (this.contactConversation != null) {
        this.messageService.messagesSubject.subscribe({
          next: (messages: MessageWithType[]) => {
            this.messages = messages;
          }
        });
        this.messageService.loadMessages(this.contactConversation!.contactEmail);
        this.messageWebSocketSubscription = this.websocketService.messageWSSubject.subscribe({
            next: (message: string) => {
              console.log('Message reçu :', message);
              this.messageService.loadMessages(this.contactConversation!.contactEmail);
            },
            error: (error) => {
              console.error('Load Message fail:', error);
            }
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.contactSubscription?.unsubscribe();
    this.messageWebSocketSubscription?.unsubscribe();
  }


}
