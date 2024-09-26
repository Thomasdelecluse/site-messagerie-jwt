import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private navigationService: NavigationService){};
  navigate(page: string) {
    console.log('Navigating to:', page);
    this.navigationService.navigate(page);
  }
  ngOnInit(): void {
  }
}
