import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../shop/services/cart.service";
import {UserService} from "../../../core/http/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";
import {Post} from "../../../models/post.model";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

    userId: number;
    userName: string;
    imageURL: string;
    createdPosts: Post[] | null;
    exists: boolean = false;

    constructor(public httpClient: HttpClient, private _Activatedroute:ActivatedRoute, public userService : UserService
    ) {
        // // Listen for changes
        // userService.user$.subscribe(res => this.user = res);
        // // Current value
        // this.user = userService.getUser();


    }

  ngOnInit(): void {
      this._Activatedroute.paramMap.subscribe(params => {
          this.userId= parseInt(params.get('userId')!);
          this.httpClient.get( environment.endpointURL + "user/user/" + this.userId)
              .subscribe((user: any) => {
                  this.userName = user.username;
                  this.exists = true;
                  //this.imageURL = environment.endpointURL + "user/" + this.userId + "/image";
              })
      });
      this.initializePostList();
  }

    private initializePostList(): void {
        this.httpClient.get<Post[]>(environment.endpointURL + 'board/1/post/getPostsByUser/' + this.userId)
            .subscribe((posts: any) => {
                this.createdPosts = posts;
            }, (err: any) => {

            });
    }
}
