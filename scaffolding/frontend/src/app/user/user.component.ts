import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from '../core/http/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

    userNameEmpty: boolean = true;
    emailEmpty: boolean = true;
    falseLogin: boolean = false;
    loggedIn: boolean | undefined;
    user: User | undefined;

    userToRegister: User = new User(0, '', '', '', '', '', '', 0, '', '', '', '', false, '', []);
    userToLogin: User = new User(0, '', '', '', '', '', '', 0, '', '', '', '', false, '', []);

    invPwMsgRegistration: string | undefined;
    invalidPassword: boolean | undefined;
    endpointMsgUser: string = '';
    endpointMsgAdmin: string = '';
    registrationFeedback: string = '';
    loginFeedback: string | undefined;

    constructor(
        public httpClient: HttpClient,
        public userService: UserService
    ) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.user = userService.getUser();
    }

    ngOnInit(): void {
        if (this.user?.userName == undefined) {
            this.logoutUser();
        }
    }

    registerUser(): void {
        this.registrationFeedback = '';
        this.httpClient.post(environment.endpointURL + "user/register", {
            userName: this.userToRegister.userName,
            password: this.userToRegister.password,
            fname: this.userToRegister.fname,
            lname: this.userToRegister.lname,
            street: this.userToRegister.street,
            housenr: this.userToRegister.housenr,
            zipCode: this.userToRegister.zipCode,
            city: this.userToRegister.city,
            email: this.userToRegister.email,
            birthday: this.userToRegister.birthday,
            phonenumber: this.userToRegister.phonenumber
        })
        .subscribe(() => {
            this.userToLogin=this.userToRegister;
            this.loginUser();
            this.userToRegister.userName = this.userToRegister.password = '';
        },
        (err: any) => {
            this.registrationFeedback = err.error.message;
        });
    }

    loginUser(): void {
        this.httpClient.post(environment.endpointURL + "user/login", {
            userName: this.userToLogin.userName,
            email: this.userToLogin.email,
            password: this.userToLogin.password,
        })
        .subscribe((res: any) => {
            this.falseLogin = false;
            this.userToLogin.userName = this.userToLogin.password = '';

            localStorage.setItem('userName', res.user.userName);
            localStorage.setItem('userToken', res.token);

            this.userService.setLoggedIn(true);

            this.userService.setUser(new User(
                    res.user.userId,
                    res.user.userName,
                    res.user.password,
                    res.user.fname,
                    res.user.lname,
                    res.user.email,
                    res.user.street,
                    res.user.housenr,
                    res.user.zipCode,
                    res.user.city,
                    res.user.birthday,
                    res.user.phonenumber,
                    res.user.admin,
                    res.user.profile_image,
                    []
                ));
            },
            (err: any) => {
                console.log(err);
                this.loginFeedback = err.error.message.message;
                this.falseLogin = true;
            }
        );
    }

    logoutUser(): void {
        localStorage.removeItem('userName');
        localStorage.removeItem('userToken');

        this.userService.setLoggedIn(false);
        this.userService.setUser(undefined);
    }

    accessUserEndpoint(): void {
        this.httpClient.get(environment.endpointURL + "secured")
        .subscribe(() => {
                this.endpointMsgUser = "Access granted";
            },
            () => {
                this.endpointMsgUser = "Unauthorized";
            }
        );
    }

    accessAdminEndpoint(): void {
        this.httpClient.get(environment.endpointURL + "admin")
        .subscribe(() => {
                this.endpointMsgAdmin = "Access granted";
            },
            () => {
                this.endpointMsgAdmin = "Unauthorized";
            }
        );
    }

    checkUserPassword(): void {
        let invalidFormat = false;
        let msg = '';

        try {
            const pw: string = this.userToRegister.password;

            if (pw.length < 8) {
                invalidFormat = true;
                msg = 'Password too short';
            } else if (pw.search(/\d/) === -1) {
                invalidFormat = true;
                msg = 'Password must contain number';
            } else if (pw.search('[A-Z]') === -1) {
                invalidFormat = true;
                msg = 'Password must contain capital letter';
            } else if (pw.search('[a-z]') === -1) {
                invalidFormat = true;
                msg = 'Password must contain lowercase letter';
            } else if (!(/[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(pw))) {
                invalidFormat = true;
                msg = 'Password must contain a special character';
            }
            if (invalidFormat) {
                this.invPwMsgRegistration = msg;
            }
        } catch {
            this.invPwMsgRegistration = "Something unusual went wrong. Please try again."
        } finally {
            this.invalidPassword = invalidFormat;
        }
    }

    checkIfUsernameEmpty(){
        if (this.userToLogin.userName === "") {
            this.userNameEmpty = true;
        } else {
            this.userNameEmpty = false;
        }
    }

    checkIfEmailEmpty() {
        if (this.userToLogin.email === "") {
            this.emailEmpty = true;
        } else {
            this.emailEmpty = false;
        }
    }

}
