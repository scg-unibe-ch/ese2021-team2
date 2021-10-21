import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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

  changed= true;

  @Input()
  boardId: number | undefined;
  constructor(public httpClient: HttpClient) { 
  }

  ngOnInit(): void {
    console.log(this.boardId);
    this.httpClient.post(environment.endpointURL + "post/getPostsOfBoard", {
      boardId: this.boardId
    }).subscribe((res: any) => {  
        this.posts = res;
      } ,
      err => {   
        console.log(err);  
      }
    );
  }

  public createPost(title: string, content: string, semester:string, boardId: number): void{
    let postToAdd = new Post(0, title, content, 0, new Date().toLocaleDateString(), boardId, 2, semester, [])
    this.createPostInBackend(postToAdd);
    this.posts.push(postToAdd)
  }

  createPostInBackend(post: Post): void {
    this.httpClient.post(environment.endpointURL + "post/createPost", { 
      postId: post.postId,
      title: post.title,
      content: post.content,
      likes:post.likes,
      date:post.date,
      boardId:post.boardId,
      creatorId:post.creatorId,
      semester: post.semester
    }).subscribe(() => {},  
(err: any) => {
  this.postFeedback = err.error.message;
});
  }
}
