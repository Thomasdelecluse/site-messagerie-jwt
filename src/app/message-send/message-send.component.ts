import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-message-send',
  templateUrl: './message-send.component.html',
  styleUrls: ['./message-send.component.css']
})
export class MessageSendComponent implements OnInit {
  @Input() message: string | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
