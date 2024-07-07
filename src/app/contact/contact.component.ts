import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() name!: string;
  @Input() telephone!: string;
  @Input() isClicked!: boolean;
  @Input() image!: string;

  constructor(
  ) { }

  ngOnInit(): void {

  }
  onClick() {
  }
}
