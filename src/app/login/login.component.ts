import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { EMPTY, isEmpty } from 'rxjs';
import { IPost} from 'src/app/Models/IPost';
import { IUser} from 'src/app/Models/IUser';
import { UserServiceService } from '../services/user-service.service';

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
    private _userService: UserServiceService
  ) {}

  public ngOnInit(): void{
    if(!localStorage.getItem("userCredentials") || !localStorage.getItem("userPosts")){                      
      this._userService.populateLocalStorage();
    }    
  }

  public onSubmit(): void {
    if(this.username=="" || this.password==""){
      return;      
    }
    let users:IUser[] = this._userService.getUsers();
    users.forEach((user: IUser) => {      
      if(user.user == this.username && user.pass == this.password){
        sessionStorage.setItem("user",this.username);
        this._router.navigateByUrl("/home");
        return
      }      
    });
    this.loginValid = false;    
  }

  public toRegister(){
    this._router.navigateByUrl("/register");    
  }

  public toResetPassword(){
    this._router.navigateByUrl("/profile");    
  }
}
