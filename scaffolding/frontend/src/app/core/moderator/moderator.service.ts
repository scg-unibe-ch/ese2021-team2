import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {
    private moderator: boolean;

    private isModSource = new Subject<boolean>();

    moderator$ = this.isModSource.asObservable();

  constructor(private httpClient: HttpClient) {
      this.moderator = false;

      this.moderator$.subscribe(res => this.moderator = res);
  }
}
