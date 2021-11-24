import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import { BoardComponent } from './pages/board/board.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {SubjectsModule} from "../subjects/subjects.module";
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule} from '@angular/forms';



const routes: Routes = [
{
  path: 'board/:boardId',
  component: BoardComponent
}
];
export const routing = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    PostListComponent,
    BoardComponent,
    
  ],
    imports: [
        CommonModule,
        routing,
        FormsModule,
        SubjectsModule,
        SharedModule,
        ReactiveFormsModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BoardModule { }
