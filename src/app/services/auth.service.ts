import { Injectable } from '@angular/core';
import  {HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userData : {name:string , email:string , photoURL:string} ;

  constructor(private http :HttpClient){

  }
  
  getuserdata(userdata:any)
  {
    this.userData.name = userdata.name;
    this.userData.email = userdata.email;
    this.userData.photoURL = userdata.image;
   // console.log(this.userData)
  }

}