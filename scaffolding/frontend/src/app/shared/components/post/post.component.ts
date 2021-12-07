import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/core/http/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {ConfirmationDialogModel} from "../../../models/confirmation-dialog.model";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Post} from "../../../models/post.model";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    @Input() post: Post = new Post(0, "", "", 0, "", 0, 0, "","", "");
    changedPost: Post = new Post(0, "", "", 0, "", 0, 0, "","", "");
    voted = false;
    userCanVote= true;
    editMode: boolean = false;
    likes: any  = [];
    deleted: boolean = false;
    postId: number = 0;

    loggedIn: boolean;
    admin: boolean;
    user: User | null;

    imageURL: string = "";

    constructor(public userService: UserService, public httpClient: HttpClient, private dialog: MatDialog,private _Activatedroute:ActivatedRoute) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.admin$.subscribe(res => this.admin = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.admin = userService.isAdmin();
        this.user = userService.getUser();

        this._Activatedroute.paramMap.subscribe(params => {
            this.postId= parseInt(params.get('postId')!);
            this.httpClient.get( environment.endpointURL + "post/" + this.postId)
            .subscribe((post: any) => {
                this.post = post;
                this.imageURL = environment.endpointURL + "post/" + this.post.postId + "/image";
            })
        });
    }

    ngOnInit(): void {
        this.imageURL = environment.endpointURL + "post/" + this.post.postId + "/image";

        this.httpClient.post(environment.endpointURL + "post/getLikesByPostId", {
            postId: this.post.postId
        }).subscribe((res) => {


            this.likes = res;
            this.post.likes = this.likes.length;
        }, (err: any) => {
            console.log(err);
        });

        for (let i = 0; i < this.likes.length; i++) {
            if (this.likes.get(i).userId == this.user?.userId) {
                this.userCanVote = false;
            }
        }
    }

    canUserVote(){
    }

    upvote() {
        this.post.likes++;
        this.voted = true;

        this.httpClient.post(environment.endpointURL + "user/likePost", {
            userId: this.user?.userId,
            postId: this.post.postId
        })
        .subscribe((res) => {
            //console.log(res);
        },(err: any) => {
            console.log(err);
        });
    }

    isBookmarked(): boolean {
        if( this.post ) {
            return this.userService.isPostBookmarked(this.post.postId);
        }
        else return false;
    }


    bookmark(): void {
        if( this.post) {
            this.userService.addPostToBookmarks(this.post);
        }
    }

    removeBookmark(): void {
        if( this.post ) {
            const dialogData = new ConfirmationDialogModel("Remove Bookmark", "Are you sure you want to remove bookmark?");
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                maxWidth: '400px',
                closeOnNavigation : true,
                data: dialogData
            })

            dialogRef.afterClosed().subscribe(dialogResult => {
                if (dialogResult) {
                    this.userService.removePostFromBookmarks(this.post);
                }
            })

        }
    }

    authorizedToEdit(): boolean {
        if( this.user && this.user.userId && this.post && this.post.creatorId ){
            return (this.admin || (this.user.userId - this.post.creatorId === 0));
        } else {
            return false;
        }
    }


    updatePost(){
        if (this.isUpdatedValid()) {
            this.httpClient.put(environment.endpointURL + "post/" + this.post.postId, {
                postId: this.changedPost.postId,
                title: this.changedPost.title,
                content: this.changedPost.content,
                likes: this.changedPost.likes,
                date: this.changedPost.date,
                boardId: this.changedPost.boardId,
                creatorId: this.changedPost.creatorId,
                semester: this.changedPost.semester,
                postImage: this.changedPost.postImage
            }).subscribe((res) => {
                console.log(res);
                this.post = this.changedPost;
                this.cancelEdit();


            },(err: any) => {
                console.log(err);
            });
        }
    }

    isUpdatedValid(): boolean {
        if( this.changedPost.title ){
            return !!this.changedPost.content || !!this.changedPost.postImage;
        }
        else {
            return false;
        }
    }

    deletePost(): void {
        if (this.post) {
            const dialogData = new ConfirmationDialogModel("Delete Post", "Are you sure you want to delete this post?");
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                maxWidth: '400px',
                closeOnNavigation: true,
                data: dialogData
            })
            dialogRef.afterClosed().subscribe(dialogResult => {
                if (dialogResult) {
                    if (this.post) {
                        this.userService.deletePost(this.post);
                        this.deleted = true;
                    }
                }
            })
        }
    }
    edit(): void{
        console.log('edit view');
        this.editMode = true;
        this.changedPost = this.post;
    }

    cancelEdit(): void {
        this.editMode = false;
    }

}
