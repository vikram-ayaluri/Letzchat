import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service'
@Component({
  selector: 'app-msgform',
  templateUrl: './msgform.component.html',
  styleUrls: ['./msgform.component.css']
})
export class MsgformComponent implements OnInit {
 
  constructor(private chat: ChatService) { }
  message :string ;
  ngOnInit() {
  }

  send(){
    if(this.message=="")return;
    //console.log(this.message)
      this.chat.sendMessage(this.message);
      this.message="" ;
  }

  submit(event)
  {
    //console.log(event.keyCode)
    if(event.keyCode === 13) {
      this.send();
    }
  }
}
