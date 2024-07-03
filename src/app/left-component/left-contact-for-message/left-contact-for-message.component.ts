import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../service/contact.service';
import {LocalUserService} from "../../service/local-user.service";
import {Router} from "@angular/router";
import {HomeComponent} from "../../home/home.component"; // Importer Contact depuis le service

@Component({
  selector: 'app-left-contact-for-message',
  templateUrl: './left-contact-for-message.component.html',
  styleUrls: ['./left-contact-for-message.component.css']
})
export class LeftContactForMessageComponent implements OnInit {

  constructor(public contactService: ContactService,private userService: LocalUserService, private router: Router, private home: HomeComponent) { }

  ngOnInit(): void {
    this.contactService.getAllContactOfUserConnected();
    setTimeout(() => {
      this.contactService.setContactSelectedId(0);
    }, 100);
  }

  onContactClick(index: number) {
    this.contactService.ContactList.forEach((contact, idx) => {
      contact.isClicked = idx === index;
    });
    this.contactService.setContactSelectedId(index);
  }

  onDisconectClick(){
    this.userService.removeToken()
    this.router.navigate([''])
  }
}
