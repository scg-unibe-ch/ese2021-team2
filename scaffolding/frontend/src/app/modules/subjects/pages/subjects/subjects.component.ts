import { UserService } from 'src/app/core/http/user.service';
import { User } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

    loggedIn: boolean;
    admin: boolean;
    user: User | null;

    constructor(public userService: UserService) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.admin$.subscribe(res => this.admin = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.admin = userService.isAdmin();
        this.user = userService.getUser();
    }

    ngOnInit(): void {
    }

}
