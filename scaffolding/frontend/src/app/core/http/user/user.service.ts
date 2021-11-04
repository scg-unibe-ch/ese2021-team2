import { Injectable } from '@angular/core';
import { User } from '../../../models/user.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    // TODO: Add a new localstorage item that tracks the expiration date of the token
    // this means that we will also get the expiration date from the backend on a login call.
    // In the constructor you can then check for the expiration date and call refreshUser if it is expired.

    /*******************************************************************************************************************
     * VARIABLES
     ******************************************************************************************************************/

    private loggedIn: boolean;

    private user: User | null;


    /*******************************************************************************************************************
     * OBSERVABLE SOURCES & STREAMS
     ******************************************************************************************************************/

    // Observable Sources
    private loggedInSource = new Subject<boolean>();
    private userSource = new Subject<User | null>();

    // Observable Streams
    loggedIn$ = this.loggedInSource.asObservable();
    user$ = this.userSource.asObservable();


    /*******************************************************************************************************************
     * GETTERS
     ******************************************************************************************************************/

    getLoggedIn(): boolean {
        return this.loggedIn;
    }

    getUser(): User | null {
        return this.user;
    }


    /*******************************************************************************************************************
     * SETTERS
     ******************************************************************************************************************/

    setLoggedIn(loggedIn: boolean): void {
        this.loggedInSource.next(loggedIn);
    }

    setUser(user: User | null): void {
        this.userSource.next(user);
    }

    refreshUser(): void {
        this.httpClient.get<User>(environment.endpointURL + "user")
            .subscribe((res) => {
                this.userSource.next(res);
                this.loggedInSource.next(true);
            }, (err: any) => {
                this.userSource.next(null);
                this.loggedInSource.next(false);
                // TODO: Delete this log when prod ready
                console.log(err);
            });
    }

    /*******************************************************************************************************************
     * CONSTRUCTOR
     ******************************************************************************************************************/

    constructor(public httpClient: HttpClient) {
        this.user = null;
        this.loggedIn = false;

        this.loggedIn$.subscribe(res => this.loggedIn = res);
        this.user$.subscribe(res => this.user = res);

        this.refreshUser();
    }
}
