import { Component, OnInit,OnDestroy, ElementRef, ViewChild,AfterViewChecked } from '@angular/core';
import {ChatService} from '../services/chat.service'
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit,OnDestroy,AfterViewChecked {
  @ViewChild('scroller', {static: false}) feedcontainer: ElementRef;
  constructor(private chat : ChatService) { }

  ngOnInit() {
    this.chat.readyUserData();
  }
  ngOnDestroy()
  {
   // this.chat.removeUser();
  }
  ngAfterViewChecked()
  { 
    this.scrolltoBottom();
  }

  scrolltoBottom():void{
    this.feedcontainer.nativeElement.scrollTop = this.feedcontainer.nativeElement.scrollHeight;
  }

}
