import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/http/user/user.service';
import { User } from '../../../../models/user.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    loggedIn: boolean | undefined;
    user: User | undefined;

    constructor(public userService: UserService) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.user = userService.getUser();
        console.log(this.loggedIn);
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

    logoutUser(): void {
        localStorage.removeItem('userName');
        localStorage.removeItem('userToken');

        this.userService.setLoggedIn(false);
        this.userService.setUser(undefined);
    }

    test(){
        console.log(this.user);
    }

}

