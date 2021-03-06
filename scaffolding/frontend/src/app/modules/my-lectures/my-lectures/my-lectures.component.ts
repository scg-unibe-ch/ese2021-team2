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
      let res=response
      this.boardList = res
    },
      (err: any) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
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
