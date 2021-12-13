import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Post} from "../../models/post.model";

@Injectable({
    providedIn: 'root'
  })
export class UserService {
    private user: User | null;
    private loggedIn: boolean;
    private admin: boolean;
    private bookmarkedPosts: Post[] | undefined;
    private imageURL: string ;

    // Observable Sources
    private userSource = new Subject<User | null>();
    private loggedInSource = new Subject<boolean>();
    private isAdminSource = new Subject<boolean>();
    private imageURLSource = new Subject<string>();

    // Observable Streams
    user$ = this.userSource.asObservable();
    loggedIn$ = this.loggedInSource.asObservable();
    admin$ = this.isAdminSource.asObservable();
    imageURL$ = this.imageURLSource.asObservable();

    constructor(private httpClient: HttpClient) {
        this.user = null;
        this.loggedIn = false;
        this.admin = false;
        this.imageURL = '/assets/images/no_user.jpg';

        this.user$.subscribe(res => {
            this.user = res
            this.setLoggedInURL()
        });
        this.loggedIn$.subscribe(res => this.loggedIn = res);
        this.admin$.subscribe(res => this.admin = res);
        this.imageURL$.subscribe(res => this.imageURL = res);

        if (!this.isTokenExpired()) {
            this.refreshUser();
            this.loadBookmarkedPosts();
            this.setLoggedInURL();
        } else {
            this.logout();
        }
    }

    private setLoggedInURL() {
        if(this.user && this.user.profile_image) {
            this.imageURLSource.next(environment.endpointURL + 'user/' + this.user.userId + '/image')
        }
    }

    register(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.endpointURL + "user/register", user)
                .subscribe(() => {
                    resolve(user);
                },
                (err: any) => {
                    reject(err);
                });
        });
    }

    delete(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            this.httpClient.delete<any>(environment.endpointURL + "user/delete", {
                body: {
                    userId: user.userId,
                    tokenPayload: localStorage.getItem("userToken")
                }
            }).subscribe(() => {
                this.logout();
                resolve(user);
            },
            (err: any) => {
                reject(err);
            });
        });
    }

    update(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            this.httpClient.put<any>(environment.endpointURL + "user/update", user)
            .subscribe((res:any) => {
                localStorage.setItem("userToken", res.token);
                localStorage.setItem("expiresAt", res.expiresAt);

                const user: User = res.user;
                this.userSource.next(user);
                this.loggedInSource.next(true);
                resolve(user)
            }, (err: any) => {
                reject(err);
            })
        })
    }

    login(userName: string, email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.httpClient.post(environment.endpointURL + "user/login", {
                userName: userName,
                email: email,
                password: password,
            }).subscribe((res: any) => {
                localStorage.setItem("userToken", res.token);
                localStorage.setItem("expiresAt", res.expiresAt);

                const user: User = res.user;
                this.userSource.next(user);
                this.loggedInSource.next(true);
                this.loadBookmarkedPosts();
                this.setLoggedInURL();
                this.refreshAdmin();
                resolve(user);
            }, (err: any) => {
                reject(err);
            });
        });
    }

    logout() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('expiresAt');

        this.userSource.next(null);
        this.loggedInSource.next(false);
        this.imageURLSource.next('/assets/images/no_user.jpg');
        this.isAdminSource.next(false);
    }

    isAdmin() {
        return this.admin; //CHANGE BACK

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

        if (token && !isNaN(expirationDate)) {
            return expirationDate * 1000 < Date.now();
        } else {
            return true;
        }
    }

    refreshUser(): void {
        this.httpClient.get<User>(environment.endpointURL + "user")
            .subscribe((res) => {
                this.userSource.next(res);
                this.loggedInSource.next(true);
                this.loadBookmarkedPosts();
            }, () => {
                this.userSource.next(null);
                this.loggedInSource.next(false);
            });

        this.refreshAdmin();
    }

    refreshAdmin() : void{
        this.httpClient.get<boolean>(environment.endpointURL + "admin")
            .subscribe((res) => {
                this.isAdminSource.next(res);
            }, () => {
                this.isAdminSource.next(false);
            });
    }

    loadBookmarkedPosts(): void {
        this.httpClient.get<Post[]>(environment.endpointURL + 'post/bookmarks/all')
            .subscribe((res) => {
                    this.bookmarkedPosts = res;
                }, (err: any) => {
                    console.log(err + ' at initialization');

                }
            );
    }

    getBookmarkedPosts(): Post[] {
        if( this.bookmarkedPosts ) {
            return this.bookmarkedPosts;
        } else {
            return [];
        }
    }

    isPostBookmarked(postId: number): boolean{
        if( this.bookmarkedPosts ){
            for( const post of this.bookmarkedPosts){
                if( post && post.postId - postId === 0) {
                    return true;
                }
            }
            return false;

        } else {
            return false;
        }
    }

    addPostToBookmarks(post: Post): void {
        if( !this.isPostBookmarked(post.postId)){
            this.httpClient.post(environment.endpointURL + "post/" + post.postId + "/bookmark", {})
                .subscribe((res) => {
                    this.bookmarkedPosts?.push(post);
                }, (err: any) => {
                    console.log('Couldnt add post to bookmarks ' + err);
                })

        }
    }

    removePostFromBookmarks(post: Post): void {
        if( this.isPostBookmarked(post.postId)) {
            this.httpClient.delete(environment.endpointURL + "post/" + post.postId + "/bookmark/delete", {})
                .subscribe((res) => {
                    if( this.bookmarkedPosts ) {
                        for (let i = 0; i < this.bookmarkedPosts.length; i++) {
                            if (post.postId - this.bookmarkedPosts[i].postId === 0) {
                                this.bookmarkedPosts.splice(i, 1);
                                break;
                            }
                        }
                    }
                }, (err: any) => {
                    console.log('Couldnt delete post from bookmarks ' + err);
                })
        }
    }

    deletePost(post: Post): void {
        if ( post ) {
            this.httpClient.delete(environment.endpointURL + "post/" + post.postId + "/delete", {})
                .subscribe(res => {
                    this.removePostFromBookmarks(post);
                }, (err: any) => {
                    console.log(err);
                });
        }
    }

    setProfileImageURL(url : string){
        this.imageURLSource.next(url);
    }

    getProfileImageURL(): string {
        return this.imageURL;
    }

    deleteProfileImage(){
        this.httpClient.delete(environment.endpointURL + 'user/' + this.user?.userId + '/image')
            .subscribe((res) => {
                this.imageURLSource.next('/assets/images/no_user.jpg');
            },
            error => {

            });
    }

    addProfileImage(newPicture: File) {
        if (newPicture) {
            const fd = new FormData();
            fd.append('image', newPicture);
            this.httpClient.post(environment.endpointURL + 'user/' + this.user?.userId + '/image', fd)
                .subscribe((res: any) => {
                    if(this.user){
                        this.user.profile_image = res.profile_image;
                    }
                },
                error => {

                });
        }
    }
}
