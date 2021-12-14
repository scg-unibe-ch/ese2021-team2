import { UserService } from 'src/app/core/http/user.service';
import { User } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import {Board} from 'src/app/models/board.model'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Subject } from 'src/app/models/subject.model';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

    loggedIn: boolean;
    admin: boolean;
    user: User | null;
    creatingSubject = false
    addingBoard = false
    newBoards: any = []
    newSubject: string=""
    newBoardName=""
    newBoardDescription =""
    subjectAmount= 0
    subjects = [{name: "", subjectId : 0}]
    modingSubject = false
    moddedSubject: Subject = new Subject(0, "");
    subChosen  = false;
    altName =""
    deleting = false

    constructor(public userService: UserService, public httpClient: HttpClient) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.admin$.subscribe(res => this.admin = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.admin = userService.isAdmin();
        this.user = userService.getUser();

        this.httpClient.get(environment.endpointURL + "subject")
            .subscribe((res: any) => {
                this.subjects = res;
                this.subjectAmount = res.length;
               // console.log(res);
                
                } ,
                err => {
                    console.log(err);
                }
            );
    }

    ngOnInit(): void {
    }


  createSubject(){
    this.creatingSubject = true;
    this.deleting = false
    this.modingSubject = false
  }

  submitSubject(){
    this.httpClient.post(environment.endpointURL+"subject/create", {
      name: this.newSubject
    }).subscribe(res => {
      console.log("subject crated");
      this.creatingSubject=false

      for(let i = 0; i<this.newBoards.length; i++){
        this.httpClient.post(environment.endpointURL+"board/create",{
          subjectId: this.subjectAmount+1,
          boardName: this.newBoards[i].boardName,
          description: this.newBoards[i].description
        }).subscribe(res => {
          console.log("board created")
        },
        err=>{
          console.log(err);
          
        })
      }
    })
  }

  addBoard(){
    this.addingBoard =true;
  }

  addNewBoard(){
    new Board(0, 4, this.newBoardName, this.newBoardDescription, this.user?.userId!)
    this.newBoards.push(new Board(0, this.subjectAmount+1, this.newBoardName, this.newBoardDescription, this.user?.userId!))
    console.log(this.newBoards);
    this.addingBoard=false
  }

  modSubject(sub: Subject){
    this.moddedSubject=sub;
    this.subChosen=true;
  }

  submitChange(){
    this.httpClient.put(environment.endpointURL+"subject/"+this.moddedSubject.subjectId+"/modify", {
      name: this.moddedSubject.name,
      subjectId: this.moddedSubject.subjectId
    }).subscribe(res=>{
      console.log(res);
      
    }, err => {
      console.log(err);
      
    })
    this.modingSubject = false
  }

  moddifySubject(){
    this.modingSubject = true
    this.creatingSubject = false
    this.deleting = false
  }


  deleteSubject(sub: Subject){
    this.httpClient.delete(environment.endpointURL+"subject/"+sub.subjectId+"/delete").subscribe(res=>{
      console.log(res);
    }, err => {
      console.log(err);
      
    })
    this.deleting = false
  }

  delSubject(){
    this.deleting = true
    this.modingSubject = false
    this.creatingSubject = false
    
  }
}
