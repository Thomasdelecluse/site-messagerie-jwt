import { Component, OnInit } from '@angular/core';
import {NavigationService} from "../service/navigation.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  navPage: string = 'message';

  constructor(private navigationService: NavigationService) {
    this.navigationService.navPage$.subscribe(page => {
      this.navPage = page;
    });
  }
  ngOnInit(): void {
  }
  setNavPage(page: string) {
    this.navPage = page;
  }
}
