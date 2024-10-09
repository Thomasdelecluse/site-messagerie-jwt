import { Component, OnInit } from '@angular/core';
import {ContactService} from "../../service/contact.service";
import SearchUserResponseDto from "../../dto/response/search-user-response-dto";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  suggestions: SearchUserResponseDto[] = [];  // Type du tableau d'objets
  contactEmail: string = '';  // Email de contact entré par l'utilisateur

  constructor(private contactService: ContactService) {}

  onInputChange(query: string) {
    if (query.length > 0) {
      this.contactService.searchContacts(query).subscribe(
        (data: SearchUserResponseDto[]) => {
          this.suggestions = data;  // Met à jour les suggestions
        },
        (error) => {
          console.error('Erreur lors de la récupération des suggestions', error);
        }
      );
    } else {
      this.suggestions = [];  // Réinitialise les suggestions si l'input est vide
    }
  }

  selectSuggestion(email: string) {
    this.contactEmail = email;  // Définit l'email sélectionné
    this.suggestions = [];  // Vide la liste des suggestions après sélection
  }

  addContact() {
    console.log('Ajouter le contact :', this.contactEmail);
    // Logiciel pour ajouter un contact
  }

  ngOnInit(): void {
  }
}
