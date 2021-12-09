import { Subject } from 'src/app/models/subject.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {BoardListComponent} from "../board-list/board-list.component";


@Component({
  selector: 'app-subjects-grid',
  templateUrl: './subjects-grid.component.html',
  styleUrls: ['./subjects-grid.component.css']
})
export class SubjectsGridComponent implements OnInit {

    subjects: Subject[]

    constructor(public httpClient: HttpClient) {
        this.subjects = [];
    }

    ngOnInit(): void {
        this.httpClient.get(environment.endpointURL + "subject")
            .subscribe((res: any) => {
                this.subjects = res;
                    console.log(this.subjects);
                } ,
                err => {
                    console.log(err);
                }
            );
    }

}
