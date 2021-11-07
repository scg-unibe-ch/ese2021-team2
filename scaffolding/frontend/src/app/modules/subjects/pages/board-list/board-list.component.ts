import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

     static subjectId: number = 0;
     boardList=[{boardName:'placeholder'}];

  constructor(public httpClient: HttpClient) { }

  ngOnInit(): void {}

  public  setSubjectId(subjectId: number): void{
      BoardListComponent.subjectId = subjectId;
      console.log(BoardListComponent.subjectId)
      this.setBoardList()
  }

   setBoardList(): void{
      console.log('board-list comment')
      this.httpClient.post(environment.endpointURL + "board/getBoardsBySubjectId", {subjectId: BoardListComponent.subjectId})
          .subscribe((res: any) => {
                  this.boardList = res;
                  console.log(this.boardList);
              } ,
              err => {
                  console.log(err);
              }
          );
  }
}
