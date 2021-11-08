import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import { routing } from '../subjects/subjects.module';
import { BoardComponent } from './pages/board/board.component';
import { AppModule } from 'src/app/app.module';

@NgModule({
  declarations: [
    PostListComponent,
    BoardComponent,
  ],
  imports: [
    CommonModule,
    routing,
  ]
})
export class BoardModule { }
