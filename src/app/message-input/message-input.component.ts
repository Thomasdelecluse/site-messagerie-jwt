import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  message: string = '';

  sendMessage() {
    alert('Message envoyé : ' + this.message);
    this.message = '';
  }
  
}