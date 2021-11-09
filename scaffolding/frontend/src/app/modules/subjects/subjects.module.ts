import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { SubjectsGridComponent } from './components/subjects-grid/subjects-grid.component';
import { BoardListComponent } from './pages/board-list/board-list.component';
import { BoardComponent } from '../board/pages/board/board.component';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import { PostListComponent } from '../board/components/post-list/post-list.component';
import { BrowserModule } from '@angular/platform-browser';




const routes: Routes = [
    {
        path: '',
        component: SubjectsComponent
    },
    {
      path: 'boardList/:subjectId',
      component: BoardListComponent 
  },
  {
    path: 'board/:boardId',
    component: BoardComponent 
}
];

export const routing = RouterModule.forChild(routes);

@NgModule({
    declarations: [
        SubjectsComponent,
        SubjectsGridComponent,
        BoardListComponent,
    ],
    exports: [
        BoardListComponent
    ],
    imports: [
        CommonModule,
        routing,
    ]
})
export class SubjectsModule { }
