import { Injectable } from '@angular/core';
import { IUser } from '../Models/IUser';
import { IPost } from '../Models/IPost';


@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor() { }

  getPosts():IPost[]{
    return JSON.parse(localStorage.getItem("userPosts") as string);
  }

  getCurrentSession():string{
    return sessionStorage.getItem("user") as string;
  }

  setPosts(posts:IPost[]):void{
    localStorage.setItem("userPosts", JSON.stringify(posts));
  }
}
