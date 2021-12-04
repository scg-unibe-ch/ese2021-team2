import { Component, OnInit, ViewChild } from '@angular/core';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../../core/http/user.service';
import { User } from '../../../../models/user.model';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from "../../../service/data.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChild(PostListComponent) postList: PostListComponent;
  title="Title";
  id = 1;
  user: User| null;
  loggedIn: boolean =false;
  unsubscribed: boolean = false;
  newTitle: string = "";
  newContent: string = "";
  newSemester: string = "";
  newCategory: string = "";
  creatingPost: boolean = false;
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  newFile: File | undefined;
  imageURL: any;
  searchWord:string="";
  SemesterAuswahl: any = ['1.Semester', '2.Semester', '3.Semester', '4.Semester', '5.Semester', '6.Semester'];
  KategorieAuswahl: any = ['technical', 'programming', 'theoretical', 'other'];
  
  constructor(private httpClient: HttpClient, public userService: UserService, private _Activatedroute:ActivatedRoute, private data: DataService) {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id= parseInt(params.get('boardId')!);
//this is where th http request to get the board goes
      this.httpClient.post(environment.endpointURL + "board/getBoardByBoardId", {
        boardId: this.id
      }).subscribe((res: any) => {
          let response = res[0];
          this.title = response.boardName;
          this.description = response.description;
        } ,
        err => {
          console.log(err);
        }
      );
  });

    this.postList = new PostListComponent(httpClient, userService, _Activatedroute, data)
      // Listen for changes
      userService.loggedIn$.subscribe(res => this.loggedIn = res);
      // Current value
      this.loggedIn = userService.getLoggedIn();
      if(this.loggedIn){
        this.user = userService.getUser();
      }

    if(this.loggedIn){
    httpClient.post(environment.endpointURL + "board/isUserNotSubscribed", {
      boardId: this.id,
      userId: userService.getUser()?.userId
    }).subscribe((res: any) => {
     this.unsubscribed=res
    })
    }
  }

  ngOnInit(): void {
  }

  createPost(){
    this.creatingPost = true;
  }

  submitPost(){
    if( this.postList.createPost(this.newTitle, this.newContent, this.newSemester, this.newCategory, this.id, this.newFile) ){
        this.reset();
    }
  }

  processFile(imageInputEvent: any) {
    const f : File = imageInputEvent.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = event => {
      this.imageURL = reader.result;
    }
    this.newFile = f;
  }

  reset() {
    this.creatingPost=false;
      this.newContent = '';
      this.newSemester = '';
      this.title = '';
  }

  subscribe(){
    this.unsubscribed=false;

    this.httpClient.post(environment.endpointURL + "board/subscribe", {
      boardId: this.id,
      userId: this.userService.getUser()!.userId
    }).subscribe((res: any) => {
        let response = res[0];
        this.title = response.boardName;
        this.description = response.description;

      
      } ,
      err => {
        console.log(err);
      }
    );
}

  unsubscribe(){
    console.log("unsubscribe");
    
  }

  cancelCreate(){
    this.creatingPost=false;
  }
}


