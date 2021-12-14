import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { UserComponent } from './user/user.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { HeaderComponent } from './header/header.component';
import { PostComponent } from 'src/app/shared/components/post/post.component';

import { CoreModule } from './core/core.module';

import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { DataService } from './modules/service/data.service';

import {SharedModule} from "./shared/shared.module";
import { CommentsListComponent } from './shared/components/post/comments-list/comments-list.component';
import { PostCommentComponent } from './shared/components/post/comments-list/post-comment/post-comment.component';
import {MatSelectModule} from "@angular/material/select";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatExpansionModule} from '@angular/material/expansion';
import {ModeratorService} from "./core/moderator/moderator.service";


@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        SidebarComponent,
        HeaderComponent,
        DashboardComponent,


    ],
    imports: [
        CoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        FormsModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatIconModule,
        MatDividerModule,
        AppRoutingModule,
        MatDialogModule,
        SharedModule,
        MatButtonToggleModule,
        MatExpansionModule,
    ],
    providers: [ DataService, ModeratorService],
    bootstrap: [AppComponent],
    exports: [
        UserComponent,
    ],
})
export class AppModule { }
