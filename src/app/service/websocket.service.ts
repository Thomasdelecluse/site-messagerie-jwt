import {Injectable} from '@angular/core';
import {CompatClient, Stomp} from "@stomp/stompjs";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: CompatClient | undefined;
  private username: string | undefined;
  messageSubject = new Subject<any>();

  connect(token: string) {
    if (this.isConnected()) {
      this.disconnect();
    }

    // Configuration des options de connexion
    const connectHeaders = {
      'Authorization': 'Bearer ' + token
    };

    this.username = this.decodeJwt(token).sub.toLowerCase()

    this.stompClient = Stomp.client('ws://localhost:8080/ws');
    this.stompClient.onStompError = console.error;

    this.stompClient.connect(
      connectHeaders,
      () => {
        console.log('Connected to WebSocket server');
        this.subscribeToMessages(token);
      }
    );
  }

  isConnected() {
    return this.stompClient && this.stompClient.connected;
  }

  disconnect() {
    if (this.isConnected()) {
      this.stompClient?.disconnect(() => {
        console.log('Disconnected from WebSocket server');
      });
    }
  }

  private subscribeToMessages(token: string) {
    if (this.stompClient) {
      this.stompClient.subscribe('/topic/user/' + this.username, (message) => {
        console.log('Received personal message:', message.body);
        this.messageSubject.next(message.body);
      }, {
        'Authorization': 'Bearer ' + token
      });
    }
  }
  private decodeJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}
