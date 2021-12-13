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
                } ,
                err => {
                    console.log(err);
                }
            );
    }


    colorHash(s: Subject){
        let col = s.subjectId
        let v = 73
        let rgb= []
        for(var i = 0; i<3; i++){
            v=(col*19+v)%255
            rgb.push(v)
        }
        return "rgb("+(rgb[0]/4)+","+(rgb[2]/2)+","+(rgb[1]/2+50)+","+0.9+")"
    }

}
