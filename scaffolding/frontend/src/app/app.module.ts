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
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { UserComponent } from './user/user.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SidebarComponent } from './sidebar/sidebar.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { HeaderComponent } from './header/header.component';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import { LoginComponent } from './login/login.component';

import {MatDialogModule} from '@angular/material/dialog';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { CommentsListComponent } from './shared/components/post/comments-list/comments-list.component';
import { PostCommentComponent } from './shared/components/post/comments-list/post-comment/post-comment.component';

@NgModule({
    declarations: [
        AppComponent,
        TodoListComponent,
        TodoItemComponent,
        UserComponent,
        PostComponent,
        SidebarComponent,
        HeaderComponent,
        LoginComponent,
        DashboardComponent,
        CommentsListComponent,
        PostCommentComponent,
    ],

    imports: [
        CommonModule,
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

    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    exports: [
        PostComponent
    ],
    entryComponents: [LoginComponent]
})
export class AppModule { }
