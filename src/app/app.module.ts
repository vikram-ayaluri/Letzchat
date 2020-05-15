import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule}  from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
} from "angular-6-social-login";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MsgformComponent } from './msgform/msgform.component';
import { FeedComponent } from './feed/feed.component';
import { UsersComponent } from './users/users.component';
import { RoomComponent } from './room/room.component';

import { ChatService} from './services/chat.service';
import {AuthService} from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MsgformComponent,
    FeedComponent,
    UsersComponent,
    RoomComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    HttpClientModule,
    SocialLoginModule  ],
  providers: [AuthService,ChatService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("452227003035-vics25orhjkm51g2huj4dsb8n8ntdre4.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}