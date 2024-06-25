import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from "./service/websocket.service";
import {LocalUserService} from "./service/local-user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MS';

  constructor(private websocketService: WebsocketService, private localUserService: LocalUserService) {
  }

  ngOnInit(): void {
    const token = this.localUserService.getLocalToken();
    if (!this.websocketService.isConnected() && token) {
      this.websocketService.connect(token);
    }
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }

}
