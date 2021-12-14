import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

    subject: any = {name: ""}
    subjectId: number = 0;
    boardList = [
        { boardName: '', boardId: 1 }
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

        this.httpClient.get(environment.endpointURL+"subject/"+this.subjectId)
        .subscribe(res =>{
            this.subject=res
        })
    }

    colorHash(){
        let col = this.subjectId
        let v = 73
        let rgb= []
        for(var i = 0; i<3; i++){
            v=(col*19+v)%255
            rgb.push(v)
        }
        return "rgb("+(rgb[0]/4)+","+(rgb[2]/2)+","+(rgb[1]/2+50)+","+0.9+")"
    }

    colorHashBoard(input: number){
        let v = 50
        let rgb= []
        for(var i = 0; i<3; i++){
            v=(input*199+v)%255
            rgb.push(v)
        }
        return "rgb("+rgb[0]+","+rgb[2]+","+rgb[1]+")"
      }


}
