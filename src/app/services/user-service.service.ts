import { Injectable } from '@angular/core';
import { IUser } from '../Models/IUser';
import { IPost } from '../Models/IPost';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

  getUsers():IUser[]{
    return JSON.parse(localStorage.getItem("userCredentials") as string);
  }

  setUsers(users:IUser[]):void{
    localStorage.setItem("userCredentials",JSON.stringify(users));
  }

  populateLocalStorage():void{
    let posts:IPost[] = [
      {id:1,header:"Header",sub:"Subtitle",imageUrl:"https://via.placeholder.com/150",body:"Post body",owner:"uno@gmail.com"},        
      {id:2,header:"Header 2",sub:"Subtitle 2",imageUrl:"https://via.placeholder.com/150",body:"Post body 2",owner:"uno@gmail.com"},
      {id:3,header:"Header 3",sub:"Subtitle 3",imageUrl:"https://via.placeholder.com/150",body:"Post body 3",owner:"dos@gmail.com"}
    ]    
    let users:IUser[] = [
      {id:1,user:"uno@gmail.com",pass:"Uno",name:"Uno Name",lastName:"Unos LastName"},
      {id:2,user:"dos@gmail.com",pass:"Dos",name:"Dos Name",lastName:"Dos LastName"},
      {id:3,user:"tres@gmail.com",pass:"Tres",name:"Tres Name",lastName:"Tres LastName"}
    ];    
    localStorage.setItem("userCredentials",JSON.stringify(users));
    localStorage.setItem("userPosts",JSON.stringify(posts));
  }
}
