import { Component, OnInit } from '@angular/core';
import { ApiMessageRequest } from '../dao/api-request-message';
import { ContactService } from '../service/contact.service';
import {MessageUpdateService} from "../service/message-update.service";


@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent implements OnInit {
  messageSent = { destination: '', message: '' };
  message: string = '';

  constructor(private apiRequestMessage: ApiMessageRequest, private contactService: ContactService, private messageUpdateService: MessageUpdateService) {}

  ngOnInit(): void {

  }

  sendMessage(): void {
    const contactEmail = this.contactService.getContactSelected()?.contactEmail;
    if (!contactEmail) {
      console.error('Aucun email de contact sélectionné.');
      return;
    }
    this.messageSent = {
      destination: contactEmail,
      message: this.message
    };
    this.apiRequestMessage.postCreateMessage(this.messageSent).subscribe({
      next: () => {
        this.messageUpdateService.announceMessageUpdated();
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
    this.messageSent = { destination: '', message: '' };
  }
}
