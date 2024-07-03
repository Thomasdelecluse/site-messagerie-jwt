import {Injectable} from '@angular/core';
import {ApiMessageRequest} from '../dao/api-request-message';
import MessageWithType from '../dto/component/message-with-type';
import {BehaviorSubject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messagesSubject: BehaviorSubject<MessageWithType[]> = new BehaviorSubject<MessageWithType[]>([]);

  constructor(
    private apiMessageRequest: ApiMessageRequest
  ) {}

  public loadMessages(contactEmail: string): void {
    this.apiMessageRequest.getAllMessageByConversation(contactEmail).pipe(
      map(response => {
        if (response == null) {
          return [];
        }

        const messages: MessageWithType[] = response.messages.map(message => ({
          ...message,
          type: message.author === contactEmail ? 'received' : 'sent'
        }));
        messages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return messages;
      }),
      catchError(error => {
        console.error('Load Message failed:', error);
        return [];
      })
    ).subscribe(messages => {
      this.messagesSubject.next(messages);
    });
  }
}
