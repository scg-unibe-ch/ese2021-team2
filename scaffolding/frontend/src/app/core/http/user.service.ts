import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    // TODO: Implement the expireAt value in the backend and pass it in the call.

    private loggedIn: boolean;
    private user: User | null;

    // Observable Sources
    private loggedInSource = new Subject<boolean>();
    private userSource = new Subject<User | null>();

    // Observable Streams
    loggedIn$ = this.loggedInSource.asObservable();
    user$ = this.userSource.asObservable();

    constructor(public httpClient: HttpClient) {
        this.user = null;
        this.loggedIn = false;

        this.loggedIn$.subscribe(res => this.loggedIn = res);
        this.user$.subscribe(res => this.user = res);

        if (!this.isTokenExpired()) {
            // TODO: Delete this log when prod ready
            console.log("Refreshing User...");
            this.refreshUser();
        } else {
            this.logout();
        }
    }
    // TODO: Test the expiresAt and the JSON.parse();
    login(userName: string, email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.endpointURL + "user/login", {
                userName: userName,
                email: email,
                password: password,
            }).subscribe((res: any) => {
                localStorage.setItem("userToken", res.token);
                localStorage.setItem("expiresAt", res.expiresAt);

                const user: User = JSON.parse(res.user);
                console.log(user);
                this.userSource.next(user);
                this.loggedInSource.next(true);
                resolve(user);
            }, (err: any) => {
                // TODO: Delete this log when prod ready
                console.log(err);
                reject(err);
            });
        })
    }

    logout() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('expiresAt');

        this.userSource.next(null);
        this.loggedInSource.next(false);
    }

    getLoggedIn(): boolean {
        return this.loggedIn;
    }

    getUser(): User | null {
        return this.user;
    }

    setLoggedIn(loggedIn: boolean): void {
        this.loggedInSource.next(loggedIn);
    }

    setUser(user: User | null): void {
        this.userSource.next(user);
    }

    isTokenExpired(): boolean {
        const token = localStorage.getItem("userToken");
        const expirationDate = Number(localStorage.getItem("expiresAt"));

        if (token && isNaN(expirationDate)) {
            return expirationDate < Date.now();
        } else {
            return true;
        }
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
}
