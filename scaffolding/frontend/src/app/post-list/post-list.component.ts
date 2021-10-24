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

  public createPost(title: string, content: string, semester:string, boardId: number, file: File | undefined): void{
    var postToAdd: Post;
    if(file) {
      postToAdd = new Post(0, title, content, 0, new Date().toLocaleDateString(), boardId, 2, semester, [], file.name)
    } else {
      postToAdd = new Post(0, title, content, 0, new Date().toLocaleDateString(), boardId, 2, semester, [], undefined)
    }
    this.createPostInBackend(postToAdd, file);
    this.posts.push(postToAdd)
  }

  createPostInBackend(post: Post, image:File | undefined): void {
    this.httpClient.post(environment.endpointURL + "post/createPost",{ 
      postId: post.postId,
      title: post.title,
      content: post.content,
      likes:post.likes,
      date:post.date,
      boardId:post.boardId,
      creatorId:post.creatorId,
      semester: post.semester,
      postImage: post.postImage
    }).subscribe((response: any) => {
      this.addImage(image, response.postId);
    },
    (err: any) => {
    this.postFeedback = err.error.message;
    });
  }

  addImage(file:File | undefined, postId : number) {
    if(file === undefined) {
      return;
    } else {
      debugger;
      const fd = new FormData();
      fd.append('image', file);
      this.httpClient.post(environment.endpointURL + 'post/' + postId + '/image', fd).subscribe(()=>{});
    }
  }
}
