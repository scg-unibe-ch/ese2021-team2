import { Component } from '@angular/core';
import { UserService } from '../core/http/user.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

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

    constructor(public userService: UserService, private dialog: MatDialog) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.user = userService.getUser();
    }

    ngOnInit() {
        this.checkUserStatus();
    }

    checkUserStatus(): void {
        // Get user data from local storage
        const userToken = localStorage.getItem('userToken');
        // Set boolean whether a user is logged in or not
        this.userService.setLoggedIn(!!userToken);
    }

    onLogin() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(LoginComponent,dialogConfig);
    }

    sendIsExpanded() {
        this.isExpanded = !this.isExpanded;
        this.messageEvent.emit(this.isExpanded);
      }

}
