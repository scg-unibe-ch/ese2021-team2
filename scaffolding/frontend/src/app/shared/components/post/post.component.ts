import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/core/http/user/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post = new Post(0, "", "", 0, "", 0, 0, "", [], "");

  voted = false;

  userCanVote= true;

  likes: any  = []

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

  canUserVote(){
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

  }

  

}
