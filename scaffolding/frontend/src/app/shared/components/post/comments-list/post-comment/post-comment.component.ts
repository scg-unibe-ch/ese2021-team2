import {Component, Input, OnInit} from '@angular/core';
import {PostCommentModel} from "../../../../../models/postComment.model";
import {UserService} from "../../../../../core/http/user.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../../../models/user.model";

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {

    @Input()
    postComment: PostCommentModel = new PostCommentModel(0,0,'',0, '');
    loggedIn: boolean;
    user: User | null;

    constructor(public userService: UserService, public httpClient: HttpClient) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.user = userService.getUser();
    }

  ngOnInit(): void {
  }



}
