import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostComponent} from "./components/post/post.component";
import {ConfirmationDialogComponent} from "./components/confirmation-dialog/confirmation-dialog.component";
import {MatCardModule} from "@angular/material/card";
import {CommentsListComponent} from "./components/post/comments-list/comments-list.component";
import {PostCommentComponent} from "./components/post/comments-list/post-comment/post-comment.component";



@NgModule({
  declarations: [
      PostComponent,
      ConfirmationDialogComponent,
      CommentsListComponent,
      PostCommentComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
    ],
    exports: [
        PostComponent,
        ConfirmationDialogComponent,
    ]
})
export class SharedModule { }