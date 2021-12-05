import { UserService } from '../core/http/user.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserComponent } from '../user/user.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

    loggedIn: boolean;
    user: User | null;
    isExpanded: boolean = true;
    @Output() messageEvent = new EventEmitter<boolean>();
    isLogin: boolean = false;
    imageURL : string;

    constructor(public userService: UserService, private dialog: MatDialog, private router: Router) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => {
            this.loggedIn = res
            this.imageURL = this.userService.getProfileImageURL()});
        userService.user$.subscribe(res => {
            this.user = res;
            this.imageURL = this.userService.getProfileImageURL();
        });

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.user = userService.getUser();
    }

    ngOnInit() {
        this.messageEvent.emit(this.isExpanded);
    }

    onLogin() {
        this.isLogin = true;
        const dialogConfig = new MatDialogConfig();
        //dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            loginDialog : this.isLogin,
        }
        this.dialog.open(UserComponent,dialogConfig);
    }

    onRegister() {
        this.isLogin = false;
        const dialogConfig = new MatDialogConfig();
        //dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            loginDialog : this.isLogin,
        }
        this.dialog.open(UserComponent,dialogConfig);
    }

    sendIsExpanded() {
        this.isExpanded = !this.isExpanded;
        this.messageEvent.emit(this.isExpanded);
    }

    isShopRoute() {
        return this.router.url.match(/\/shop\S*/)
    }


    isBoardRoute() {
        return this.router.url.match(/\/board\S*/)
    }

}
