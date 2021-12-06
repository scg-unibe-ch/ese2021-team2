import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {ConfirmationDialogComponent} from "../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {PostComponent} from "../../shared/components/post/post.component";
import { BoardModule } from '../board/board.module';

const routes: Routes = [
    {
        path: '',
        component: BookmarkListComponent
    }
];

export const routing = RouterModule.forChild(routes);

@NgModule({
    declarations: [
        BookmarkListComponent,
    ],
    imports: [
        CommonModule,
        BoardModule,
        routing,
        SharedModule
    ]
})
export class BookmarksModule { }
