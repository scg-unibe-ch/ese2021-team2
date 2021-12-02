import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/http/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-lectures',
  templateUrl: './my-lectures.component.html',
  styleUrls: ['./my-lectures.component.css']
})
export class MyLecturesComponent implements OnInit {

  boardList=[{boardName:'placeholder', boardId:1}];

  constructor(public httpClient: HttpClient, public userService: UserService) { 
    let userId = userService.getUser()!.userId
    httpClient.post(environment.endpointURL + "board/getMyLectures",{
      userId: userId
    }).subscribe((response: any) => {
      console.log(response);
      let res=response
      for(let i = 0; i<res.length; i++){
        this.boardList.push(res[i])
      }
    },
      (err: any) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
  }

}
