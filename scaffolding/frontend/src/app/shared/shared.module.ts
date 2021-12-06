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
import { MatIconModule } from '@angular/material/icon';
import { PostPreviewComponent } from '../modules/board/components/post-preview/post-preview.component';
import { BoardModule } from '../modules/board/board.module';

const routes: Routes = [
    {
      path: 'post/:posttId',
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
        PostPreviewComponent
  ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        CommonModule,
        MatCardModule,
        FormsModule,
        routing,
        MatIconModule
    ],
    exports: [
        PostComponent,
        ConfirmationDialogComponent,
        searchPipe,
        filterPipe,
        PostPreviewComponent,
    ]
})
export class SharedModule { }
