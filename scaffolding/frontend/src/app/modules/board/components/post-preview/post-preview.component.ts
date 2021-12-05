import { Component, OnInit, Input } from '@angular/core';
import {Post} from 'src/app/models/post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/core/http/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent implements OnInit {
  @Input() post: Post = new Post(0, "", "", 0, "", 0, 0, "","", "");
  likes: any  = [];
  loggedIn = false;
  user: User | null;
  voted = false;
  userCanVote= true;

  constructor(public userService: UserService,public httpClient: HttpClient) { 
    userService.loggedIn$.subscribe(res => this.loggedIn = res);
    userService.user$.subscribe(res => this.user = res);
  }

  ngOnInit(): void {
    this.httpClient.post(environment.endpointURL + "post/getLikesByPostId", {
      postId: this.post.postId
  }).subscribe((res) => {

      console.log(res);
     
      
      this.likes = res;
      this.post.likes = this.likes.length;
      this.canUserVote()
  }, (err: any) => {
      console.log(err);
  });
  }

  canUserVote(){  
    this.user=this.userService.getUser();
    if(this.user!=null){
      this.loggedIn=true;
    }
    for(var i=0; i<this.post.likes; i++){  
        if(this.likes[i].userId==this.user?.userId){
            this.voted=true;
        }
    }
  }

  like(){
   
    
    if(!this.voted && this.loggedIn){
    this.post.likes++;
    this.voted=true;

    this.httpClient.post(environment.endpointURL + "user/likePost", {
      userId: this.user?.userId,
      postId: this.post.postId
    }).subscribe((res) => {
      console.log(res);
    },(err: any) => {
      console.log(err);
    });
    }
  }

  unlike(){
    
      if(this.voted && this.loggedIn){
          this.post.likes--;
          this.voted=false;

          this.httpClient.post(environment.endpointURL+"post/unlike", {
              userId: this.user?.userId,
              postId: this.post.postId
          }).subscribe((res) => {
            console.log(res);
          },(err: any) => {
            console.log(err);
          });
      }
  }

}
