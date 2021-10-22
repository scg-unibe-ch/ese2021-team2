import { Component, OnInit, ViewChild } from '@angular/core';
import { PostListComponent } from '../post-list/post-list.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChild(PostListComponent ) postList:PostListComponent;

  

  title="Title";
  
  id = 1;
 


  loggedIn: boolean | undefined;

  newTitle: string= "";
  newContent: string="";
  newSemester: string="";
  creatingPost: boolean = false;
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

  constructor(httpClient: HttpClient, public userService: UserService) { 
    this.postList = new PostListComponent(httpClient, userService)
    userService.loggedIn$.subscribe(res => this.loggedIn = res);
  }

  ngOnInit(): void {
    
    
  }

  createPost(){
    this.creatingPost = true;
  }

  submitPost(){
    this.postList.createPost(this.newTitle, this.newContent, this.newSemester, this.id);
    this.creatingPost=false;
    this.ngOnInit();
  }


}
