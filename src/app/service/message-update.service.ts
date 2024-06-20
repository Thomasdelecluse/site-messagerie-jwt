import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageUpdateService {
  private messageUpdatedSource = new Subject<void>();

  messageUpdated = this.messageUpdatedSource.asObservable();

  announceMessageUpdated() {
    this.messageUpdatedSource.next();
  }
}
