import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import * as io from 'socket.io-client';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ChatService {
    private url = 'http://localhost:3000';

    userData ={name:localStorage.getItem('username'),email:localStorage.getItem('email'),photoURL:localStorage.getItem('photoURL')}

    private socket;  

    ddd = new Date();  
    temp:string;
    msg = { text : "hello" , date:this.ddd , sender:"vik" , type:""}
    
  setData = false;

constructor(private router:Router) {
        this.socket = io(this.url);
        //this.msg.message="hello";
    }

public getMessages = () => {
      return Observable.create((observer) => {
          this.socket.on('new-message', (message) => {
            console.log(message)
              observer.next(message);
          });
      });
}
public getUsers = () => {
  return Observable.create((observer) => {
      this.socket.on('new-user', (user) => {
        //console.log(user)
          observer.next(user);
      });
  });
}
/////////////////////////////////////////////////////

public getUserData()
{
  return this.userData;
}

sendMessage(mesg:any)
{
        this.msg.text = mesg;
        this.msg.date = new Date();
        this.msg.sender = this.userData.name
        this.msg.type= "send"
        
        this.socket.emit('new-message',this.msg);
}

readyUserData()
{
  if(!this.setData)
  {
    this.removeUser();
  }
}

    setUserdata(userdata:any)///used by login component
  {
    this.setData = true;
    this.userData.name = userdata.name;
    this.userData.email = userdata.email;
    this.userData.photoURL = userdata.image;
    this.socket.emit('new-user',this.userData)
    localStorage.setItem("username",this.userData.name)
    localStorage.setItem("email",this.userData.email)
    localStorage.setItem("photoURL",this.userData.photoURL)
  }

  removeUser()
  {
    console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("photoURL");
    this.socket.emit("user-left",this.userData)
    this.router.navigate(['/login'])
  }

}