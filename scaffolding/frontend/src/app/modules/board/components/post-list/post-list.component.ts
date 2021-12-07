import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../../models/post.model';
import { UserService } from '../../../../core/http/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from "../../../service/data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  @Input() mode = "board";
  boardId: number = 4;

  postFeedback: string | undefined;
  posts: Post[] = [];
  changed= true;
  loggedIn: boolean;
  admin: boolean;
  user: User | null;

  @Input() searchTerm:string="";
  filterarg = 'technical';
  subscription: Subscription;

  constructor(public httpClient: HttpClient, public userService: UserService, private _Activatedroute:ActivatedRoute,private data: DataService) {
    // Listen for changes
    userService.loggedIn$.subscribe(res => this.loggedIn = res);
    userService.admin$.subscribe(res => this.admin = res);
    userService.user$.subscribe(res => this.user = res);

    // Current value
    this.loggedIn = userService.getLoggedIn();
    this.admin = userService.isAdmin();
    this.user = userService.getUser();
    this._Activatedroute.paramMap.subscribe(params => {
      this.boardId= parseInt(params.get('boardId')!);
  });

  }


  ngOnInit(): void {
    this.setPostList()

    this.subscription = this.data.currentMessage.subscribe(message => this.filterarg = message)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkUserStatus(): void {
    // Get user data from local storage
    const userToken = localStorage.getItem('userToken');

    // Set boolean whether a user is logged in or not
    this.userService.setLoggedIn(!!userToken);
  }

  public createPost(title: string, content: string, semester:string,category:string, boardId: number, file: File | undefined): boolean{
    var postToAdd: Post;
    if(file) {
      postToAdd = new Post(0, title, content, 0, new Date().toLocaleDateString(), boardId, 2, semester, category, file.name)  //creator id needs to be crrected (default value 2)
    } else {
      postToAdd = new Post(0, title, content, 0, new Date().toLocaleDateString(), boardId, 2, semester, category, undefined)
    }

    if(this.isValid(postToAdd)) {
        this.createPostInBackend(postToAdd, file);
        this.postFeedback = "";

        this.posts.push(postToAdd);
        return true;
    } else {
        return false;
    }
  }

  createPostInBackend(post: Post, image:File | undefined): void {
    this.httpClient.post(environment.endpointURL + "board/" + this.boardId + "post/createPost",{
      postId: post.postId,
      title: post.title,
      content: post.content,
      likes:post.likes,
      date:post.date,
      boardId:post.boardId,
      creatorId:post.creatorId,
      semester: post.semester,
      category:post.category,
      postImage: post.postImage
    }).subscribe((response: any) => {
      this.addImage(image, response.postId);
    },
      (err: any) => {
        console.log(err);
        this.postFeedback = err;
      }
    );
  }

    addImage(file:File | undefined, postId : number): void {
        if(file === undefined) {
            return;
        } else {
            const fd = new FormData();
            fd.append('image', file);
            this.httpClient.post(environment.endpointURL + "board/" + this.boardId + 'post/' + postId + '/image', fd);
        }
    }

    setPostList() {
        if (this.mode==="board") {
            console.log("post list id: "+this.boardId);

            this.httpClient.get(environment.endpointURL + "board/" + this.boardId + "/post/getPostsOfBoard/" + this.boardId
        ).subscribe((res: any) => {
                    this.posts = res;
                },
                err => console.log(err)
            );
        } else if (this.mode === "user") {
            this.httpClient.get(environment.endpointURL + "board/1/post/getPostsByUser" + this.user?.userId)
            .subscribe((res: any) => {
                    this.posts = res;
                },
                err => console.log(err)
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
        if (this.user) {
            return !this.admin;
        } else {
            return false;
        }
    }

}
