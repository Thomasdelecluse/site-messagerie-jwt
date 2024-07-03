import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../service/contact.service';
import CreateMessageDto from "../../dto/request/create-message-dto";
import {ApiMessageRequest} from "../../dao/api-request-message";
import {MessageService} from "../../service/message.service";


@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent implements OnInit {
  messageToSent : CreateMessageDto | null = null;
  message: string = '';

  constructor(private apiMessageRequest:ApiMessageRequest , private contactService: ContactService, private messageService: MessageService) {}

  ngOnInit(): void {

  }

  sendMessage(): void {
    const contactEmail = this.contactService.getContactSelected()?.contactEmail;
    if (!contactEmail) {
      console.error('Aucun email de contact sélectionné.');
      return;
    }
    this.messageToSent = {
      contactEmail: contactEmail,
      message: this.message,
    };
    this.apiMessageRequest.postCreateMessage(this.messageToSent).subscribe({
      next: () => {
        this.messageService.loadMessages(this.contactService.getContactSelected()?.contactEmail)
        this.resetMessageFields();
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi du message:', err);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    });
  }

  private resetMessageFields(): void {
    this.message = '';
    this.messageToSent = { contactEmail: '', message: ''};
  }
}
