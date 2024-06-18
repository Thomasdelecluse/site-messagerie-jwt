import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-contact',
  templateUrl: './left-contact.component.html',
  styleUrls: ['./left-contact.component.css']
})
export class LeftContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  contacts = [
    { name: 'Lucas Mercier', telephone: '0667788595', isClicked: false },
    { name: 'Thomas le roi', telephone: '0667788595', isClicked: false },
  ];

  onContactClick(index: number) {
    // Réinitialiser tous les contacts à non cliqués
    this.contacts.forEach((contact, idx) => {
      contact.isClicked = idx === index;
    });
  }
}
