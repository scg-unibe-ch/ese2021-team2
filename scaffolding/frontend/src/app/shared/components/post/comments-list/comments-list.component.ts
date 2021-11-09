import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

    postId: number = 0;
    postCommentList=[{postCommentId: 0, postId: 0, commentText: ''}]
    showComments: boolean = false;

  constructor(public httpClient: HttpClient) { }

  ngOnInit(): void {
        this.getComments()
  }

  getComments(): void{
      this.httpClient.post(environment.endpointURL+'comment/getCommentsByPostId', {postId: this.postId})
          .subscribe((res: any) => {
              this.postCommentList = res;
              console.log(this.postCommentList);
          } ,
          err => {
              console.log(err);
          }
      );
  }
    switchShowComments(): void{
        this.showComments=!this.showComments
    }
}
