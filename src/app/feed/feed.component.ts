import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service'
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  ddd = new Date();  
  messages = [] ;
  userData={name:"",email:"",photoURL:""}

  constructor(private chat : ChatService) { }

  

  ngOnInit() { 
    this.chat
      .getMessages()
      .subscribe((message:any) => {
      //  console.log(message)
        this.messages.push(message);
      });   

    this.userData= this.chat.getUserData();   
  }
  
  
}
 