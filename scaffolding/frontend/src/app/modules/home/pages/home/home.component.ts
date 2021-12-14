import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/http/user.service';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn: boolean;
  user: User | null;
  home = "home";
  posts = [{postId: 0, title:"", content:"", likes:0, date:"",boardId:0,creatorId:0,semester:"",category:"",postImage:""}]




  constructor(public userService: UserService, private httpClient: HttpClient) {

    userService.loggedIn$.subscribe(res => this.loggedIn = res);
    userService.user$.subscribe(res => this.user = res);

    this.loggedIn = userService.getLoggedIn();
    this.user = userService.getUser();

    if (this.user) {
        this.httpClient.post(environment.endpointURL + "board/getSubscribedPostsByUserId", {
            userId: this.userService.getUser()!.userId
          }).subscribe((res: any) => {
              this.posts = res;
              this.posts.sort(this.compare)
          },
          err => {
              console.log(err);
          });
    } else {
        this.posts = [];
    }
  }



  ngOnInit(): void {

  }

  compare(a: Post, b:Post) {
    let dateA = a.date.split("/")
    let dateB = b.date.split("/")

    let score1 = parseInt(dateA[2])*12+parseInt(dateA[1])+0.03*parseInt(dateA[0])
    let score2 = parseInt(dateB[2])*12+parseInt(dateB[1])+0.03*parseInt(dateB[0])

    if(score1>score2){
      return -1
    }else{
      return 1
    }

  }



}
