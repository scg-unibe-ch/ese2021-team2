import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../../../../../../backend/src/models/board.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

    @Input() subjectId: number | undefined;

   boards=[{name: ''}];
   subjId: number|undefined;
   subjectName: string|undefined;

  constructor(public httpClient: HttpClient) { }

  ngOnInit(): void {

    this.httpClient.post(environment.endpointURL + '/getBoardsBySubject', {
        subjectId: this.subjectId
    }).subscribe((res: any) => {
            this.boards = res;
        } ,
        err => {
            console.log(err);
        }
    );

    this.httpClient.post(environment.endpointURL + '/getSubjectById', {
        subjectId: this.subjectId
    }).subscribe((res: any) => {
            this.subjectName = res.subjectName;
        } ,
        err => {
            console.log(err);
        }
    );
    }




}
