import { UserService } from '../core/http/user.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserComponent } from '../user/user.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

    loggedIn: boolean;
    user: User | null;
    isExpanded: boolean = false;
    @Output() messageEvent = new EventEmitter<boolean>();
    isLogin: boolean = false;

    constructor(public userService: UserService, private dialog: MatDialog) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.user$.subscribe(res => this.user = res);

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

}
