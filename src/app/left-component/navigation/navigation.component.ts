import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output() navChange = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }
  navigate(page: string) {
    this.navChange.emit(page);
  }
}
