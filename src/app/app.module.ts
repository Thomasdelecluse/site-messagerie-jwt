// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './AppRoutingModule';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LeftContactComponent } from './left-contact/left-contact.component';
import { RightMessageComponent } from './right-message/right-message.component';
import { ContactComponent } from './contact/contact.component';
import { MessageInputComponent } from './message-input/message-input.component';
import {FormsModule} from "@angular/forms";
import {MessageReceiveComponent} from "./message-receive-component/message-receive.component";
import { MessageSentComponent } from './message-send/message-sent.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeftContactComponent,
    RightMessageComponent,
    ContactComponent,
    MessageReceiveComponent,
    MessageInputComponent,
    MessageSentComponent,
    LoginComponent
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
