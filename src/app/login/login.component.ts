import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ChatService} from '../services/chat.service'
import {
  AuthService,
  GoogleLoginProvider
} from 'angular-6-social-login';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

constructor(private router:Router,private socialAuthService: AuthService , private chat:ChatService )
{

}
  ngOnInit() {
  }

  login()
  {
    this.socialAuthService.signIn    (GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        //console.log(" sign in data : " , userData);

       // this.chat.getuserdata(userData)
        this.router.navigate(["/room"]);
        this.chat.setUserdata(userData)
        
      }
    );

  }


}