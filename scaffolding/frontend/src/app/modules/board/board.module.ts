import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './components/post-list/post-list.component';
import { BoardComponent } from './pages/board/board.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {SubjectsModule} from "../subjects/subjects.module";
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule} from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
{
  path: 'board/:boardId',
  component: BoardComponent
},
];

export const routing = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    PostListComponent,
    BoardComponent,
    PostPreviewComponent,

  ],
    imports: [
        CommonModule,
        routing,
        FormsModule,
        SubjectsModule,
        SharedModule,
        ReactiveFormsModule,
        MatToolbarModule,

        MatCardModule,
        MatIconModule,

    ],
})
export class BoardModule { }
