import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { EMPTY, isEmpty } from 'rxjs';
import { Post} from 'src/app/Models/Post';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public loginValid = true;
  public username = "";
  public password = "";  

  constructor(    
    private _router: Router,    
  ) {}

  public ngOnInit(): void{
    if(!localStorage.getItem("userCredentials") || !localStorage.getItem("userPosts")){    
      class userCredential{
        constructor(public id:number,public user: String,public pass: String
          ,public name: String, public lastName: String){}
      }      
      let posts = [
        new Post(1,"Header","Subtitle","https://via.placeholder.com/150","Post body","uno@gmail.com"),        
        new Post(2,"Header 2","Subtitle 2","https://via.placeholder.com/150","Post body 2","uno@gmail.com"),
        new Post(3,"Header 3","Subtitle 3","https://via.placeholder.com/150","Post body 3","dos@gmail.com")
      ]    
      let users = [
        new userCredential(1,"uno@gmail.com","Uno","Uno Name", "Unos LastName"),
        new userCredential(2,"dos@gmail.com","Dos","Dos Name", "Dos LastName"),
        new userCredential(3,"tres@gmail.com","Tres","Tres Name", "Tres LastName")
      ];    
      localStorage.setItem("userCredentials",JSON.stringify(users));
      localStorage.setItem("userPosts",JSON.stringify(posts));
    }    
  }

  public onSubmit(): void {
    if(this.username=="" || this.password==""){
      return;      
    }
    let users = JSON.parse(localStorage.getItem("userCredentials") as string);
    users.forEach((user: any) => {      
      if(user.user == this.username && user.pass == this.password){
        sessionStorage.setItem("user",this.username);
        this._router.navigateByUrl("/home");
        return
      }      
    });
    this.loginValid = false;    
  }
}
