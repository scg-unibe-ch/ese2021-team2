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
import {Subject} from "../../../models/subject.model";
import {Board} from "../../../models/board.model";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

    loading: boolean;
    userId: number;
    userName: string;
    imageURL: string;
    createdPosts: Post[] | null;
    lectures: Board[] | null;
    exists: boolean = false;
    admin: boolean = false;

    constructor(public httpClient: HttpClient, private _Activatedroute:ActivatedRoute, public userService : UserService
    ) {
        this._Activatedroute.paramMap.subscribe(params => {
            this.userId= parseInt(params.get('userId')!);
            this.httpClient.get( environment.endpointURL + "user/user/" + this.userId)
                .subscribe((user: any) => {
                    this.userName = user.username;
                    this.exists = true;
                    this.imageURL = user.image ? (environment.endpointURL + 'user/'+ this.userId + '/image') : '/assets/images/no_user.jpg';
                    this.getAdminStatus();
                })
        });
        this.initializePostList();
        this.initializeSubscriptions();
    }

  ngOnInit(): void {
  }

    private initializePostList(): void {
        this.httpClient.get<Post[]>(environment.endpointURL + 'post/getPostsByUser/' + this.userId)
            .subscribe((posts: any) => {
                this.createdPosts = posts;
            }, (err: any) => {

            });
    }

    private initializeSubscriptions(): void {
        this.httpClient.post<Board[]>( environment.endpointURL + 'board/getMyLectures', {
            userId: this.userId
        })
            .subscribe((lectures: any) => {
                this.lectures = lectures;
            }

        )

    }

    private getAdminStatus() {
        this.httpClient.get<boolean>(environment.endpointURL + 'user/' + this.userId + '/admin')
            .subscribe(isAdmin => {
                this.admin = isAdmin;
            }, (err) => {

            })
    }
}
