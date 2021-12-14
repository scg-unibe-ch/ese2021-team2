import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {UserService} from "../../../../core/http/user.service";
import {User} from "../../../../models/user.model";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

    @Input() postId: number | null = null;
    postCommentList = [{postCommentId: 0, postId: 0, commentText: '', userId: 0, userName: ''}]
    showComments: boolean = false;
    loggedIn: boolean = false;
    user: User | null;
    creatingComment: boolean = false;
    newCommentText: string = '';

    constructor(public userService: UserService, public httpClient: HttpClient) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.user = userService.getUser();

    }

    ngOnInit(): void {
        this.getComments()
    }

    getComments(): void {
        this.httpClient.post(environment.endpointURL + 'comment/getCommentsByPostId', {postId: this.postId})
            .subscribe((res: any) => {
                    this.postCommentList = res;
                },
                err => {
                    console.log(err);
                }
            );
    }

    switchShowComments(): void {
        this.getComments()
        this.showComments = !this.showComments
    }

    createComment(): void {
     this.creatingComment = true;
 }
 cancelCreateComment(): void{
        this.creatingComment = false;
 }

 submitComment(): void{
    this.showComments=true
     this.httpClient.post(environment.endpointURL + "comment/createComment",{
         commentText: this.newCommentText,
         postId: this.postId,
         userId: this.user?.userId,
         userName: this.user?.userName

     }).subscribe((response: any) => {
         },
         (err: any) => {
         }
     );
     this.reset();
 }

 reset(): void{
     this.creatingComment = false;
     this.ngOnInit();
 }



}
