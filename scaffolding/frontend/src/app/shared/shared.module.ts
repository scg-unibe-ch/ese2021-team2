import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostComponent} from "./components/post/post.component";
import {ConfirmationDialogComponent} from "./components/confirmation-dialog/confirmation-dialog.component";
import {MatCardModule} from "@angular/material/card";
import {CommentsListComponent} from "./components/post/comments-list/comments-list.component";
import {PostCommentComponent} from "./components/post/comments-list/post-comment/post-comment.component";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule} from "@angular/forms";
import { searchPipe } from './components/Pipes/search.pipe';
import { filterPipe } from './components/Pipes/filter.pipe';
import { RouterModule, Routes } from '@angular/router';
import {PostPreviewComponent} from "./components/post/post-preview/post-preview.component";
import {MatIconModule} from "@angular/material/icon";
import { SortPipe } from './components/Pipes/sort.pipe';

const routes: Routes = [
    {
      path: 'post/:postId',
      component: PostComponent,
    },
  ];

export const routing = RouterModule.forChild(routes);

@NgModule({
  declarations: [
        PostComponent,
        ConfirmationDialogComponent,
        CommentsListComponent,
        PostCommentComponent,
        searchPipe,
        filterPipe,
        PostPreviewComponent,
        SortPipe,
  ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        CommonModule,
        MatCardModule,
        FormsModule,
        routing,
        MatIconModule,
    ],
    exports: [
        PostComponent,
        ConfirmationDialogComponent,
        searchPipe,
        filterPipe,
        PostPreviewComponent,
        SortPipe
    ]
})
export class SharedModule { }
