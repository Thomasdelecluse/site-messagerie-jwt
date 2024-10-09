import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() label: string = 'Button';
  @Input() buttonClass: string = '';
  @Input() disabled: boolean = false;

  ngOnInit(): void {
  }

}
