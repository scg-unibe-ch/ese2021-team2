import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../core/http/user.service";
import {Post} from "../../../models/post.model";

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.css']
})
export class BookmarkListComponent implements OnInit {

    loggedIn: boolean;
    user: User | null;
    bookmarks: Post[] = [];

  constructor(public httpClient: HttpClient, public userService: UserService) {
      // Listen for changes
      userService.loggedIn$.subscribe(res => this.loggedIn = res);
      userService.user$.subscribe(res => this.user = res);

      // Current value
      this.loggedIn = userService.getLoggedIn();
      this.user = userService.getUser();
  }

  ngOnInit(): void {

  }

  refreshBookmarks(): Post[] {
      return this.userService.getBookmarkedPosts();
  }


}
