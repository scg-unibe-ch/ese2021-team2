import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostComponent} from "./components/post/post.component";
import {ConfirmationDialogComponent} from "./components/confirmation-dialog/confirmation-dialog.component";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
      PostComponent,
      ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
      MatCardModule
  ],
    exports: [
        PostComponent,
        ConfirmationDialogComponent,
    ]
})
export class SharedModule { }
