import { Injectable } from '@angular/core';
import { User } from '../../../models/user.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    /*******************************************************************************************************************
     * VARIABLES
     ******************************************************************************************************************/

    private loggedIn: boolean | undefined;

    private user: User | undefined;


    /*******************************************************************************************************************
     * OBSERVABLE SOURCES & STREAMS
     ******************************************************************************************************************/

    // Observable Sources
    private loggedInSource = new Subject<boolean>();
    private userSource = new Subject<User>();

    // Observable Streams
    loggedIn$ = this.loggedInSource.asObservable();
    user$ = this.userSource.asObservable();


    /*******************************************************************************************************************
     * GETTERS
     ******************************************************************************************************************/

    getLoggedIn(): boolean | undefined {
        return this.loggedIn;
    }

    getUser(): User | undefined {
        return this.user;
    }


    /*******************************************************************************************************************
     * SETTERS
     ******************************************************************************************************************/

    setLoggedIn(loggedIn: boolean | undefined): void {
        this.loggedInSource.next(loggedIn);
    }

    setUser(user: User | undefined): void {
        this.userSource.next(user);
    }

    refreshUser(): Observable<User> {
        return this.httpClient.get<User>(environment.endpointURL + "user");
    }

    /*******************************************************************************************************************
     * CONSTRUCTOR
     ******************************************************************************************************************/

    constructor(public httpClient: HttpClient) {
        // Observer
        this.loggedIn$.subscribe(res => this.loggedIn = res);
        this.user$.subscribe(res => this.user = res);

        // Default values
        this.setLoggedIn(false);
        this.refreshUser().subscribe(res => this.userSource.next(res));
    }
}
