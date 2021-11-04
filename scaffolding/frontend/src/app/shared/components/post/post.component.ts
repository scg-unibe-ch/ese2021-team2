import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/core/http/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post = new Post(0, "", "", 0, "", 0, 0, "", []);

  voted = false;

  userCanVote= true;

  loggedIn: boolean;

  user: User | null;

  constructor(public userService: UserService, public httpClient: HttpClient) {
    // Listen for changes
    userService.loggedIn$.subscribe(res => this.loggedIn = res);
    userService.user$.subscribe(res => this.user = res);

    // Current value
    this.loggedIn = userService.getLoggedIn();
    this.user = userService.getUser();
  }

  ngOnInit(): void {
  }

  canUserVote(){
  }

  upvote(){
    this.post.likes++;
    this.voted=true;
    this.httpClient.post(environment.endpointURL + "user/likePost", {
      userId: this.user?.userId,
      postId: this.post.postId
    }).subscribe(() => {},(err: any) => {
      console.log(err);
    });

  }

  downvote(){
    this.post.likes--;
    this.voted=true;
  }

}
