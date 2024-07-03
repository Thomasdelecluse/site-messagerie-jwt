// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './AppRoutingModule';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LeftContactForMessageComponent } from './left-component/left-contact-for-message/left-contact-for-message.component';
import { RightMessageComponent } from './right-component/right-message/right-message.component';
import { ContactComponent } from './contact/contact.component';
import { MessageInputComponent } from './right-component/message-input/message-input.component';
import {FormsModule} from "@angular/forms";
import {MessageReceiveComponent} from "./right-component/message-receive/message-receive.component";
import { MessageSentComponent } from './right-component/message-send/message-sent.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RightContactComponent } from './right-component/right-contact/right-contact.component';
import { NavigationComponent } from './left-component/navigation/navigation.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeftContactForMessageComponent,
    RightMessageComponent,
    ContactComponent,
    MessageReceiveComponent,
    MessageInputComponent,
    MessageSentComponent,
    LoginComponent,
    RightContactComponent,
    RightContactComponent,
    NavigationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
