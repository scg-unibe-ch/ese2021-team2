import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/core/http/user/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Post} from "../../../models/post.model";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    @Input()
    post: Post = new Post(0, "", "", 0, "", 0, 0, "", [], "");

    voted = false;

  userCanVote= true;

  loggedIn: boolean | undefined;

  user: User|undefined;

  imageURL: string = "";

  constructor(public userService: UserService, public httpClient: HttpClient) {
    // Listen for changes
    userService.loggedIn$.subscribe(res => this.loggedIn = res);
    userService.user$.subscribe(res => this.user = res);

    // Current value
    this.loggedIn = userService.getLoggedIn();
    this.user = userService.getUser();
  }

  ngOnInit(): void {
    this.imageURL = environment.endpointURL + "post/" + this.post.postId + "/image";
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
