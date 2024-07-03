import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  navPage: string = 'message';


  constructor() { }

  ngOnInit(): void {
  }
  setNavPage(page: string) {
    this.navPage = page;
  }
}
