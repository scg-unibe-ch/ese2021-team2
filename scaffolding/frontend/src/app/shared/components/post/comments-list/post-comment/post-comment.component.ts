import {Component, Input, OnInit} from '@angular/core';
import {PostCommentModel} from "../../../../../models/postComment.model";
import {UserService} from "../../../../../core/http/user.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../../../models/user.model";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {

    @Input() postComment: PostCommentModel = new PostCommentModel(0,0,'',0, '');
    @Input() deletable: boolean;
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

    deletePost(): void {
        this.httpClient.delete(environment.endpointURL + `comment/${this.postComment.postCommentId}/delete`)
            .subscribe(() => {
                console.log("Deleted post successfully");
            }, (err: any) => {
                console.log(err);
            }
        );
    }
}
