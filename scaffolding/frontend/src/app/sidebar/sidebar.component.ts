import { Component } from '@angular/core';
import { UserService } from '../core/http/user.service';
import { User } from '../models/user.model';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

    loggedIn: boolean;
    user: User | null;

    constructor(public userService: UserService) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.user = userService.getUser();
    }

}
