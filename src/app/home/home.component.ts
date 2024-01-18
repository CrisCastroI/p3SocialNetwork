import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { Post} from 'src/app/Models/Post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{  
  constructor(    
    private _router: Router,        
    public dialog: MatDialog
  ) {}
  public currentUser=sessionStorage.getItem("user") as string;
  public ownerSession = false;
  public posts = JSON.parse(localStorage.getItem("userPosts") as string); 
  ngOnInit(): void {    
    if(!sessionStorage.getItem("user") || this.currentUser == ""){
      this._router.navigateByUrl("/login");
    }        
  }
  openEditDialog(post:Post): void {
    let id = post.id;
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {
        title: 'Edit Post',
        header: post.header, 
        sub: post.sub,
        imageUrl: post.imageUrl,
        desc: post.body},
    });

    dialogRef.afterClosed().subscribe(result => {
      let editedPost;
      let previousPost;
      this.posts.forEach((post:Post) => {
        if(id == post.id){
          previousPost = post;
          editedPost = new Post(id,result.header,result.sub,result.imageUrl,result.desc,this.currentUser);                    
        }
      });      
      let index = this.posts.indexOf(previousPost);
      this.posts[index] = editedPost;      
      localStorage.setItem("userPosts", JSON.stringify(this.posts));      
    });
  }
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {title: 'Create Post'},
    });

    dialogRef.afterClosed().subscribe(result => {
      let newPost = new Post((this.posts.length+1),result.header,result.sub,result.imageUrl,result.desc,this.currentUser)
      this.posts.push(newPost);
      localStorage.setItem("userPosts", JSON.stringify(this.posts));      
    });
  }
  openDeleteDialog(post:Post): void {
    let id = this.posts.indexOf(post);
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '400px',
      data: {title: 'Delete Post ' + post.header,
        message: 'This post will dissapear!'},
    });

    dialogRef.afterClosed().subscribe(result => {            
      this.posts.splice(id,1);
      localStorage.setItem("userPosts", JSON.stringify(this.posts));      
    });
  }

  logout(){
    sessionStorage.clear();
    this._router.navigateByUrl("/login");
  }

}