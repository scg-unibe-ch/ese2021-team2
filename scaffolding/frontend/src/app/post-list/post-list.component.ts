import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() mode = "board";
  @Input() boardId: number | undefined;

  postFeedback: string | undefined;
  posts: Post[] = [];
  changed= true;
  loggedIn: boolean | undefined;
  user: User | undefined;

  constructor(public httpClient: HttpClient, public userService: UserService) {
    // Listen for changes
    userService.loggedIn$.subscribe(res => this.loggedIn = res);
    userService.user$.subscribe(res => this.user = res);

    // Current value
    this.loggedIn = userService.getLoggedIn();
    this.user = userService.getUser();
  }


  ngOnInit(): void {
    
    if (this.mode==="board") {
      this.httpClient.post(environment.endpointURL + "post/getPostsOfBoard", {
        boardId: this.boardId
      }).subscribe((res: any) => {  
          this.posts = res;
        } ,
        err => {   
          console.log(err);  
        }
      );
    } else if (this.mode==="user") {
      this.httpClient.post(environment.endpointURL + "post/getPostsByUser", {
        userId: this.user?.userId
      }).subscribe((res: any) => {  
          this.posts = res;
        } ,
        err => {   
          console.log(err);  
        }
      );
    }
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    // Get user data from local storage
    const userToken = localStorage.getItem('userToken');

    // Set boolean whether a user is logged in or not
    this.userService.setLoggedIn(!!userToken);
  }

  public createPost(title: string, content: string, semester:string, boardId: number): void{
    let postToAdd = new Post(0, title, content, 0, new Date().toLocaleDateString(), boardId, this.user?.userId, semester, [])
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
    })
    .subscribe(() => {},
      (err: any) => {
        this.postFeedback = err.error.message;
      }
    );
  }

}
