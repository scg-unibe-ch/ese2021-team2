import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import { BoardComponent } from './pages/board/board.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {AppModule} from "../../app.module";
import {SubjectsModule} from "../subjects/subjects.module";
import { searchPipe } from '../../shared/components/Pipes/search.pipe';



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
    searchPipe,
  ],
    imports: [
        CommonModule,
        routing,
        FormsModule,
        AppModule,
        SubjectsModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BoardModule { }
