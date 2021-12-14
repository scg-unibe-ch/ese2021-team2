import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserService } from './core/http/user.service';
import { User } from './models/user.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'frontend';

    loggedIn: boolean;
    user: User | null;
    isExpanded: boolean = true;

    constructor(
        public httpClient: HttpClient,
        public userService: UserService,
        private router: Router
    ) {
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

    test() {
        console.log(this.user);
    }

    receiveIsExpanded($event:boolean) {
        this.isExpanded = $event;
      }

    isRoute(){
        return this.router.url.match(/\/shop\S*/) && this.router.url.length == 5 || this.router.url.match(/\/board\S*/) && this.router.url.length == 8;
    }

}
