import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public passwordValid = true;
  public emailValid = true;
  public photo ="";
  public firstName = "";
  public lastName = "";
  public username = "";
  public password = "";
  public password2 = "";  
  editForm = this.fb.group({
    photo: []
  });
  constructor(private fb: UntypedFormBuilder, private _router: Router) { }
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
    this.passwordValid = true;
    if(this.editForm.get('photo')?.value == ""
      || this.firstName == "" || this.lastName == ""
      || this.username == "" || this.password == ""
      || this.password2 == "")
      return;    
    let users = JSON.parse(localStorage.getItem("userCredentials") as string);        
    users.forEach((user:any) => {           
      if(this.username === user.user){
        this.emailValid = false;        
        return;        
      }  
      console.log(this.emailValid);                  
    });
    if(this.password != this.password2){
      this.passwordValid = false;
      return;      
    }
    if(!this.emailValid){
      return;
    }
    users.push({id: (users.length+1) ,user: this.username,pass: this.password,name: this.firstName,lastName: this.lastName});
    localStorage.setItem("userCredentials",JSON.stringify(users));
    this._router.navigateByUrl("/login");
  }
}
