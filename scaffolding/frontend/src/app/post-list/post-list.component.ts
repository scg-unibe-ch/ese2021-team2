import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  userService = new UserService();

  postFeedback: string | undefined;
 
  posts: Post[] = [];

  constructor(public httpClient: HttpClient) { 
    

  }

  ngOnInit(): void {

    for(var i = 0; i<5; i++){
      this.posts?.push(new Post(0, "title", "lorem ipsum orem ipsum lorem ipsum orem ipsum lorem ipsum orem ipsum lorem ipsum orem ipsum", 4, "10.11.2021", 1, 1, "fs21", []))
    }

  }

  public createPost(title: string, content: string, semester:string, boardId: number): void{
    let postToAdd = new Post(0, title, content, 0, new Date().toLocaleDateString(), boardId, 2, semester, [])
    
    this.createPostInBackend(postToAdd);

    


  }

  createPostInBackend(post: Post): void {
    console.log(environment.endpointURL + "post/createPost");
    

    this.httpClient.post(environment.endpointURL + "post/createPost", {
      
      
      postId: post.postId,
      title: post.title,
      content: post.content,
      likes:post.likes,
      date:post.date,
      boardId:post.boardId,
      creatorId:post.creatorId,
      semesters: post.semester

    }).subscribe(() => {
      this.posts.push(post)
    },  
(err: any) => {

  this.postFeedback = err.error.message;

});
  }


}
