import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-message-receive',
  templateUrl: './message-receive.component.html',
  styleUrls: ['./message-receive.component.css']
})
export class MessageReceiveComponent implements OnInit {
  @Input() message: string | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
