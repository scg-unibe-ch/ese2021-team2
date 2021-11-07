import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {BoardListComponent} from "../../pages/board-list/board-list.component";


@Component({
  selector: 'app-subjects-grid',
  templateUrl: './subjects-grid.component.html',
  styleUrls: ['./subjects-grid.component.css']
})
export class SubjectsGridComponent implements OnInit {

  constructor(public httpClient: HttpClient) { }

    boardList: BoardListComponent = new BoardListComponent(this.httpClient);

  subjects = [{name: "test", subjectId:4}]

  ngOnInit(): void {

    this.httpClient.post(environment.endpointURL + "post/getAllSubjects", {}).subscribe((res: any) => {
        this.subjects = res;
        console.log(this.subjects);
      } ,
      err => {
        console.log(err);
      }
    );

  }

  transmitSubjectId (subjectId: number): void{
      this.boardList.setSubjectId(subjectId);
}
}
