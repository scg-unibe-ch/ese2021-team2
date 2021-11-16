import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/core/http/user.service';
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
    userCanVote = true;
    loggedIn: boolean ;
    likes: any  = []
    user: User | null;
    imageURL: string = "";


    constructor(public userService: UserService, public httpClient: HttpClient) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.user = userService.getUser();
    }


  }

  ngOnInit(): void {
    this.imageURL = environment.endpointURL + "post/" + this.post.postId + "/image";


    this.httpClient.post(environment.endpointURL + "post/getLikesByPostId", {
      postId: this.post.postId
    }).subscribe((res) => {
      
      
      this.likes = res;
      this.post.likes = this.likes.length;  
    },(err: any) => {
      console.log(err);
    });

    for(let i = 0; i<this.likes.length; i++){
      if(this.likes.get(i).userId == this.user?.userId){
        this.userCanVote=false;
      }
    }

  }

  upvote(){
    this.post.likes++;
    this.voted=true;

    
    this.httpClient.post(environment.endpointURL + "user/likePost", {
      userId: 3,
      postId: this.post.postId
    }).subscribe((res) => {
      //console.log(res);
      
      
    },(err: any) => {
      console.log(err);
    });

    upvote() {
        this.post.likes++;
        this.voted = true;
        this.httpClient.post(environment.endpointURL + "user/likePost", {
            userId: this.user?.userId,
            postId: this.post.postId
        }).subscribe(() => {
        }, (err: any) => {
            console.log(err);
        });


}
