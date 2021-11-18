import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostComponent} from "./components/post/post.component";
import {ConfirmationDialogComponent} from "./components/confirmation-dialog/confirmation-dialog.component";
import {MatCardModule} from "@angular/material/card";
import {CommentsListComponent} from "./components/post/comments-list/comments-list.component";
import {PostCommentComponent} from "./components/post/comments-list/post-comment/post-comment.component";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
      PostComponent,
      ConfirmationDialogComponent,
      CommentsListComponent,
      PostCommentComponent
  ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        CommonModule,
        MatCardModule,
    ],
    exports: [
        PostComponent,
        ConfirmationDialogComponent,
    ]
})
export class SharedModule { }
