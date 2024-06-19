import {Component, Input, OnInit} from '@angular/core';
import {ContactServiceService} from "../service/contact-service.service";
import {Subscription} from "rxjs";
import {ApiMessageRequest} from "../dao/api-request-message";
interface Message {
  id:number,
  author:string,
  destination:string,
  message:string
}
@Component({
  selector: 'app-right-message',
  templateUrl: './right-message.component.html',
  styleUrls: ['./right-message.component.css']
})
export class RightMessageComponent implements OnInit {
  constructor(public contactService: ContactServiceService, private apiMessageRequest:ApiMessageRequest) { }
  public contactConversation: { name: string, telephone: string, isClicked: boolean } | null = null;
  public messagesReceive: Message[] = [];
  public messagesSent: Message[] = [];
  private contactSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.contactSubscription = this.contactService.getContactSelectedId().subscribe((value)=>{
      this.contactConversation = this.contactService.getContactByIndex(value)
      if (this.contactConversation != null) {
        this.apiMessageRequest.getAllMessageByConversation(this.contactConversation.name).subscribe(response => {
          this.messagesReceive = response.messages.filter(message => message.author === this.contactConversation!.name);
          this.messagesSent = response.messages.filter(message => message.author !== this.contactConversation!.name);
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
