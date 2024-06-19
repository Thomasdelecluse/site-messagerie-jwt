import {Component, Input, OnInit} from '@angular/core';
import {ContactServiceService} from "../contact-service.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-right-message',
  templateUrl: './right-message.component.html',
  styleUrls: ['./right-message.component.css']
})
export class RightMessageComponent implements OnInit {
  constructor(public contactService: ContactServiceService) { }
  public contact: { name: string, telephone: string, isClicked: boolean } | null = null;
  private contactSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.contactSubscription = this.contactService.getContactSelectedId().subscribe((value)=>{
      this.contact = this.contactService.getContactByIndex(value)
    });
    if (this.contact != null){
      //requete pour aller chercher
    }
  }

  ngOnDestroy(): void {
    this.contactSubscription?.unsubscribe();
  }
}
