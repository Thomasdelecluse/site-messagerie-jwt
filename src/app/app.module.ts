// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './AppRoutingModule';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LeftContactComponent } from './left-contact/left-contact.component';
import { RightMessageComponent } from './right-message/right-message.component';
import { ContactComponent } from './contact/contact.component';
import { MessageComponentComponent } from './message-component/message-component.component';
import { MessageInputComponent } from './message-input/message-input.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeftContactComponent,
    RightMessageComponent,
    ContactComponent,
    MessageComponentComponent,
    MessageInputComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
