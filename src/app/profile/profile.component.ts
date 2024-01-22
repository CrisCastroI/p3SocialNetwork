import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { IUser } from '../Models/IUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public passwordValid = true;
  public emailValid = true;  
  public email = "";
  public password = "";
  public password2 = "";  
  editForm = this.fb.group({
    photo: []
  });
  constructor(private fb: UntypedFormBuilder, 
    private _router: Router,
    private _userService: UserServiceService) { }

  setFileData(event: Event): void {
    const eventTarget: HTMLInputElement | null = event.target as HTMLInputElement | null;
    if (eventTarget?.files?.[0]) {
      const file: File = eventTarget.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.editForm.get('photo')?.setValue(reader.result as string);
      });
      reader.readAsDataURL(file);
    }
  }

  public onSubmit(): void {    
    this.emailValid = true;
    let exists = false;
    let modifiedUser = {id:0,user:"",pass:"",name:"",lastName:""};
    this.passwordValid = true;
    if(this.password == "" || this.password2 == ""
      || this.email == "")
      return;    
    let users:IUser[] = this._userService.getUsers();
    users.forEach((user:IUser) => {           
      if(this.email === user.user){        
        exists=true;
        modifiedUser=user;
      }        
    });
    if(this.password != this.password2){
      this.passwordValid = false;
      return;      
    }
    if(!exists){
      this.emailValid = false;
      return;
    }
    let index = users.indexOf(modifiedUser);    
    users[index]=({id: modifiedUser.id,user: modifiedUser.user,pass: this.password,name: modifiedUser.name,lastName: modifiedUser.lastName});
    this._userService.setUsers(users);
    this._router.navigateByUrl("/login");
  }
}
