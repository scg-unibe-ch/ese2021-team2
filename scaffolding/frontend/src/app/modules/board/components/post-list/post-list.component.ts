import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../../models/post.model';
import { UserService } from '../../../../core/http/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() mode = "board";
  boardId: number = 4;

  postFeedback: string | undefined;
  posts: Post[] = [];
  changed= true;
  loggedIn: boolean;
  user: User | null;

  constructor(public httpClient: HttpClient, public userService: UserService, private _Activatedroute:ActivatedRoute) {



    // Listen for changes
    userService.loggedIn$.subscribe(res => this.loggedIn = res);
    userService.user$.subscribe(res => this.user = res);

    // Current value
    this.loggedIn = userService.getLoggedIn();
    this.user = userService.getUser();
    this._Activatedroute.paramMap.subscribe(params => {
      this.boardId= parseInt(params.get('boardId')!);
  });

  }


  ngOnInit(): void {
    console.log("ngOnInit is being executed");


    this.setPostList()
  }

  checkUserStatus(): void {
    // Get user data from local storage
    const userToken = localStorage.getItem('userToken');

    // Set boolean whether a user is logged in or not
    this.userService.setLoggedIn(!!userToken);
  }

  public createPost(title: string, content: string, semester:string, boardId: number, file: File | undefined): boolean{
    var postToAdd: Post;
    if(file) {
      postToAdd = new Post(0, title, content, 0, new Date().toLocaleDateString(), boardId, 2, semester, [], file.name)  //creator id needs to be crrected (default value 2)
    } else {
      postToAdd = new Post(0, title, content, 0, new Date().toLocaleDateString(), boardId, 2, semester, [], undefined)
    }
    if( this.isValid(postToAdd) && this.createPostInBackend(postToAdd, file) ) {
        this.postFeedback = "";
        this.posts.push(postToAdd);
        return true;
    }
    return false;
  }

  createPostInBackend(post: Post, image:File | undefined): boolean {
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
      return true;
    },
      (err: any) => {
          console.log(err);
        this.postFeedback = err;
        return false;
      }
    );
      return false;
  }

  addImage(file:File | undefined, postId : number): boolean {
    if(file === undefined) {
      return true;
    } else {
      debugger;
      const fd = new FormData();
      fd.append('image', file);
      this.httpClient.post(environment.endpointURL + 'post/' + postId + '/image', fd).subscribe(()=>{
          return true;
      });
      return false;
    }
  }

  setPostList(){

    if (this.mode==="board") {

      console.log("post list id: "+this.boardId);


      this.httpClient.post(environment.endpointURL + "post/getPostsOfBoard", {
        boardId: this.boardId
      }).subscribe((res: any) => {
            this.posts = res;
            console.log(res);
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

  isValid(post: Post): boolean {
      if( post.title ) {
          if (post.content) {
              return true;
          } else if (post.postImage) {
              return true;
          } else {
              this.postFeedback = 'Post requires either an image or some text!';
              return false;
          }
      } else {
          this.postFeedback = 'Post requires a title!';
          return false
          }
  }

  isAuthorizedToCreate(): boolean {
      if( this.user ) {
          return !this.user.admin;
      } else {
          return false;
      }
  }

}
