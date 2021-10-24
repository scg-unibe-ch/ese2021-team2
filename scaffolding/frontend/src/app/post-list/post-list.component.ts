import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

<<<<<<< HEAD
  @Input() boardId: number | undefined;
=======

>>>>>>> ec19ce1757dbb445ce79bc62659a5b8fb7fea9ec

  userService = new UserService();
  postFeedback: string | undefined;
  posts: Post[] = [];
  changed= true;

<<<<<<< HEAD
  constructor(public httpClient: HttpClient) {
=======
  loggedIn: boolean | undefined;

  @Input()
  boardId: number | undefined;

  user: User | undefined;

  constructor(public httpClient: HttpClient, public userService: UserService) { 

  // Listen for changes
    userService.loggedIn$.subscribe(res => this.loggedIn = res);
    userService.user$.subscribe(res => this.user = res);

    // Current value
    this.loggedIn = userService.getLoggedIn();
    this.user = userService.getUser();
>>>>>>> ec19ce1757dbb445ce79bc62659a5b8fb7fea9ec
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
