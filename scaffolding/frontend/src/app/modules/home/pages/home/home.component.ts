import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/http/user.service';
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
    if(this.userService.getUser()!=null){
      this.loggedIn=true;
    }
    
    this.httpClient.post(environment.endpointURL + "board/getSubscribedPostsByUserId", {
      userId: this.userService.getUser()!.userId
    }).subscribe((res: any) => {
        this.posts = res;
      } ,
      err => {
        console.log(err);
      }
    );    
  }
    
  

  ngOnInit(): void {
    

  }

}
