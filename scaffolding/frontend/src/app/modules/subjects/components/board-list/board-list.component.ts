import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

    subjectId: number = 0;
    boardList = [
        { boardName: 'placeholder', boardId: 1 }
    ];

    constructor(public httpClient: HttpClient, private _Activatedroute:ActivatedRoute) {
        this._Activatedroute.paramMap.subscribe(params => {
            this.subjectId= parseInt(params.get('subjectId')!);
        });

        this.setBoardList()
    }

    ngOnInit(): void {

    }

    public  setSubjectId(subjectId: number): void{
        this.subjectId = subjectId;
        console.log(this.subjectId)
        this.setBoardList()
    }

    setBoardList(): void{
        this.httpClient.post(environment.endpointURL + "board/getBoardsBySubjectId", {subjectId: this.subjectId})
            .subscribe((res: any) => {
                    this.boardList = res;
                } ,
                err => {
                    console.log(err);
                }
            );
    }

}
