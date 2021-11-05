import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    PostListComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    MatListModule
  ]
})
export class BoardModule { }
