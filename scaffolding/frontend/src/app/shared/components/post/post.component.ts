import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/core/http/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {ConfirmationDialogModel} from "../../../models/confirmation-dialog.model";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Post} from "../../../models/post.model";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post = new Post(0, "", "", 0, "", 0, 0, "", [], "");
  changedPost: Post = new Post(0, "", "", 0, "", 0, 0, "", [], "");
  voted = false;
  userCanVote= true;
  editMode: boolean = false;

  likes: any  = []



  loggedIn: boolean;


  user: User | null;

  imageURL: string = "";

  constructor(public userService: UserService, public httpClient: HttpClient, private dialog: MatDialog) {
    // Listen for changes
    userService.loggedIn$.subscribe(res => this.loggedIn = res);
    userService.user$.subscribe(res => this.user = res);

    // Current value
    this.loggedIn = userService.getLoggedIn();
    this.user = userService.getUser();


  }

  ngOnInit(): void {
      this.imageURL = environment.endpointURL + "post/" + this.post.postId + "/image";
      this.changedPost = this.post;


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

  upvote(){
    this.post.likes++;
    this.voted=true;


    this.httpClient.post(environment.endpointURL + "user/likePost", {
      userId: 3,
      postId: this.post.postId
    }).subscribe((res) => {
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
          const dialogData = new ConfirmationDialogModel("Logout", "Are you sure you want to remove bookmark?");
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
          return (this.user.admin || (this.user.userId - this.post.creatorId === 0));
      } else {
          return false;
      }
  }

  edit(){
      console.log('edit view');
      this.editMode = true;
  }

  updatePost(){
      if( this.isUpdatedValid() ){
          this.httpClient.put(environment.endpointURL + "post/" + this.post.postId, {
              post: this.changedPost
          }).subscribe((res) => {
              console.log(res);
              this.post = this.changedPost;


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

  cancelEdit(): void {
      this.editMode = false;
  }

    }
