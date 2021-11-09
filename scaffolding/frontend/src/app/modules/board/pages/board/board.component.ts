import { Component, OnInit, ViewChild } from '@angular/core';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../../core/http/user/user.service';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChild(PostListComponent) postList: PostListComponent;
  title="Title";
  id = 1;
  loggedIn: boolean | undefined;
  newTitle: string = "";
  newContent: string = "";
  newSemester: string = "";
  creatingPost: boolean = false;
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  newFile: File | undefined;
  imageURL: any;

  constructor(private httpClient: HttpClient, public userService: UserService, private _Activatedroute:ActivatedRoute) {
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





    this.postList = new PostListComponent(httpClient, userService, _Activatedroute)
    userService.loggedIn$.subscribe(res => this.loggedIn = res);
  }

  ngOnInit(): void {
  }

  createPost(){
    this.creatingPost = true;
  }

  submitPost(){
    this.postList.createPost(this.newTitle, this.newContent, this.newSemester, this.id, this.newFile);
    this.reset();
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
    this.ngOnInit();
  }

}
