import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { IPost} from 'src/app/Models/IPost';
import { PostServiceService } from '../services/post-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{  
  constructor(    
    private _router: Router,        
    public dialog: MatDialog,    
    private _postService:PostServiceService
  ) {}
  public currentUser = this._postService.getCurrentSession();
  public ownerSession = false;
  public posts:IPost[] = this._postService.getPosts(); 
  ngOnInit(): void {    
    if(!sessionStorage.getItem("user") || this.currentUser == ""){
      this._router.navigateByUrl("/login");
    }        
  }

  openEditDialog(post:IPost): void {
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
      let editedPost!:IPost;
      let previousPost!:IPost;
      this.posts.forEach((post:IPost) => {
        if(id == post.id){
          previousPost = post;
          editedPost = {id:post.id,header:result.header,sub:result.sub,imageUrl:result.imageUrl,body:result.desc,owner:this.currentUser};                    
        }
      });      
      let index = this.posts.indexOf(previousPost);
      this.posts[index] = editedPost;      
      this._postService.setPosts(this.posts);
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {title: 'Create Post'},
    });

    dialogRef.afterClosed().subscribe(result => {
      let newPost:IPost = {id:(this.posts.length+1),header:result.header,sub:result.sub,imageUrl:result.imageUrl,body:result.desc,owner:this.currentUser}
      this.posts.push(newPost);
      this._postService.setPosts(this.posts);
    });
  }

  openDeleteDialog(post:IPost): void {
    let id = this.posts.indexOf(post);
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '400px',
      data: {title: 'Delete Post ' + post.header,
        message: 'This post will dissapear!'},
    });

    dialogRef.afterClosed().subscribe(result => {            
      this.posts.splice(id,1);
      this._postService.setPosts(this.posts);
    });
  }

  logout(){
    sessionStorage.clear();
    this._router.navigateByUrl("/login");
  }

}