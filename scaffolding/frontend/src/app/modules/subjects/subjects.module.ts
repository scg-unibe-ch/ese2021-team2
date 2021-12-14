import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { SubjectsGridComponent } from './components/subjects-grid/subjects-grid.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import { PostListComponent } from '../board/components/post-list/post-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { BoardsComponent } from './pages/boards/boards.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
    {
        path: '',
        component: SubjectsComponent
    },
    {
        path: ':subjectId/boards',
        component: BoardsComponent
    }
];

export const routing = RouterModule.forChild(routes);

@NgModule({
    declarations: [
        SubjectsComponent,
        SubjectsGridComponent,
        BoardListComponent,
        BoardsComponent,
        
    ],
    exports: [
        BoardListComponent
    ],
    imports: [
        MatButtonModule,
        CommonModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatCardModule,
        MatIconModule,
    ]
})
export class SubjectsModule { }
