import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = []; 
  userData:any;
    constructor(private chat : ChatService) {  }

  ngOnInit() {
    this.chat
      .getUsers()
      .subscribe((user:any) => {
      //  console.log(user);
        this.users = user;
      });
    
      this.userData=this.chat.getUserData();
  }
  signout()
  {
    this.chat.removeUser();
  }

}
