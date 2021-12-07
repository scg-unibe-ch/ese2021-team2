import { fakeUsers } from './../core/mocks/fake-users';
import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from '../core/http/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {isNumeric} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

    userNameEmpty: boolean = true;
    emailEmpty: boolean = true;
    falseLogin: boolean = false;
    loggedIn: boolean | null;
    user: User | null;

    userToRegister: User = new User('', '', '', '', '', '', 0, '', '', '', '', '', 0);
    userToLogin: User = new User('', '', '', '', '', '', 0, '', '', '', '', '', 0);

    invPwMsgRegistration: string | undefined;
    invalidPassword: boolean | undefined;
    endpointMsgUser: string = '';
    endpointMsgAdmin: string = '';
    registrationFeedback: string = '';
    loginFeedback: string | undefined;
    activeRegButton: boolean = false;
    invRegDataMsg: string = '';

    isLogin: boolean = false;

    constructor(
        public httpClient: HttpClient,
        public userService: UserService,
        public dialogRef: MatDialogRef<UserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.user$.subscribe(res => this.user = res);

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.user = userService.getUser();

        this.isLogin = data.loginDialog;
        this.checkStatusButton();
    }

    ngOnInit(): void {

    }

    registerUser(): void {
        this.registrationFeedback = '';
        this.userService.register(this.userToRegister)
        .then((res) => {
            this.userToLogin = res;
            this.loginUser();})
        .catch((err) => {
            this.registrationFeedback = err;})
    }

    checkStatusButton(){
        this.isValidNewUserInput();
    }

    loginUser(): void {
        this.userService.login(this.userToLogin.userName, this.userToLogin.email, this.userToLogin.password)
        .then(() => {
            this.falseLogin = false;
            this.userToLogin.userName = this.userToLogin.email = this.userToLogin.password = '';
            this.dialogRef.close()})
        .catch((err) => {
            this.falseLogin = true;
            console.log(err);
            this.loginFeedback = err.message;
        })
    }

    isValidNewUserInput(){
        if(this.areMandatoryFieldsNull()){
           this.invRegDataMsg = 'The First 5 Fields with a (*) are mandatory to fill in for a Registration.'
            this.activeRegButton = false;
        }else if(this.userToRegister.street!=''&&!this.checkOnlyText(this.userToRegister.street!)){
            this.invRegDataMsg = 'The street should only contain letters.'
            this.activeRegButton = false;
        }else if(this.userToRegister.city!=''&&!this.checkOnlyText(this.userToRegister.city!)){
            this.invRegDataMsg = 'The city should only contain letters.'
            this.activeRegButton = false;
        }else if(this.userToRegister.phonenumber!=''&&!this.checkPhoneNumb(this.userToRegister.phonenumber!)){
            this.invRegDataMsg = 'The phonenumber is invalid.'
            this.activeRegButton = false;
        }else if(this.userToRegister.zipCode!=''&&(!this.checkOnlyNum(this.userToRegister.zipCode!)||this.userToRegister.zipCode!.length!=4)){
            this.invRegDataMsg = 'The ZipCode may only contain 4 numbers.'
            this.activeRegButton = false;
        }else if((this.userToRegister.housenr!)!=0&&0>=this.userToRegister.housenr!){
            this.invRegDataMsg = 'The House Number must be at least 1.'
            this.activeRegButton = false;
        }else {this.activeRegButton = true;}

    }

    areMandatoryFieldsNull(): boolean{
        return (this.userToRegister.userName==''||this.userToRegister.password==''||this.userToRegister.fname==''||this.userToRegister.lname==''||this.userToRegister.email=='')
    }

    checkOnlyText(toCheck: string): boolean{
        let isValid = true;
        if ((/[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~1234567890]/.test(toCheck))) {
            isValid = false;
        }
        return isValid
    }
    checkOnlyNum(toCheck: string): boolean{
        let isValid = false;
        if (isNumeric(toCheck)) {
            isValid = true;
        }
        return isValid
    }

    checkPhoneNumb(toCheck: string): boolean{
        let isValid = true;
        if ((/[0-9\+\-\ ]/.test(toCheck))) {
            isValid = true;
        }
        if ((/[`!@#$%^ç&*()_=\]{};':"\\|/,.<>?~a-z]/.test(toCheck))) {
            isValid = false;
        }
        if(toCheck.trim()==''){
            isValid=false;
        }
        return isValid
    }

    // I filled this with some pretty ugly pseudo tests, ignore this for now.
    // You can use and test it if you want though, it should work.
    // This registers, logins and then deletes a user to see if it all works.
    accessUserEndpoint(): void {
        const fakeUser = fakeUsers.fillOnlyNeededParameters;
        this.userService.register(fakeUsers.fillOnlyNeededParameters)
            .then(() =>
            this.userService.login(fakeUser.userName, fakeUser.email, fakeUser.password)
                    .then(res =>
                        this.userService.delete(res)
                            .then(() => console.log("It worked!"))
                            .catch(err => console.log("Something went wrong: " + err))
                    ).catch(err => console.log("Something went wrong: " + err))
            ).catch(err => console.log("Something went wrong: " + err));
        /*
        this.httpClient.get(environment.endpointURL + "secured")

        .subscribe(() => {
                this.endpointMsgUser = "Access granted";
            },
            () => {
                this.endpointMsgUser = "Unauthorized";
            }
        );
        */
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
