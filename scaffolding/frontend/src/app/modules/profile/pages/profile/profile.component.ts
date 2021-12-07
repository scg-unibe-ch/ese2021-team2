import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/http/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogModel } from 'src/app/models/confirmation-dialog.model';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { User } from '../../../../models/user.model';
import {isNumeric} from "rxjs/internal-compatibility";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    loggedIn: boolean;
    user: User | null;
    changedUser = new User('', '', '', '', '', '', 0, '', '', '', '', '', 0);
    editMode: boolean = false;
    editTag: String = "Edit";
    invEditDataMsg = '';
    activeSaveButton = false;

    constructor(public userService: UserService, private dialog: MatDialog, public httpClient: HttpClient, private snackBar: MatSnackBar) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => this.loggedIn = res);
        userService.user$.subscribe(res => {
            this.user = res
            this.initUser();
        });
        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.user = userService.getUser();

        this.initUser();
        this.checkStatusButton();
    }

    ngOnInit() {
        this.checkUserStatus();
        this.initUser();
    }

    checkUserStatus(): void {
        // Get user data from local storage
        const userToken = localStorage.getItem('userToken');

        // Set boolean whether a user is logged in or not
        this.userService.setLoggedIn(!!userToken);
    }

    handleDeletingAccount() {
        const dialogData = new ConfirmationDialogModel("Delete Account", "Are you sure you want to delete your account?");
        const dialogRef =  this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '400px',
            closeOnNavigation : true,
            data: dialogData
        })

        dialogRef.afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                this.deleteAccount();
            }
        });
    }

    handleLogout() {
        const dialogData = new ConfirmationDialogModel("Logout", "Are you sure you want to logout?");
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '400px',
            closeOnNavigation : true,
            data: dialogData
        })

        dialogRef.afterClosed().subscribe(dialogResult => {
            if(dialogResult) {
                this.userService.logout();
            }
        })
    }

    deleteAccount() {
        if(this.user){
            this.userService.delete(this.user).then(res => {
                this.snackBar.open("Account successfully deleted", "Dismiss", {                     //confirm deletion with snackbar
                    duration: 5000
                });
            })
        }
    }

    setEditMode() {
        this.editMode = !this.editMode;
        if(this.editMode){
            this.editTag = "Cancel Edit";
        } else {
            this.editTag = "Edit";
            this.initUser();
        }
    }

    initUser() {
        if(this.user){
            this.changedUser = Object.assign(this.changedUser, this.user);
        }
    }

    updateUser() {
        this.userService.update(this.changedUser).then(() => this.setEditMode())
    }

    test(){
        console.log(this.user);
        console.log(this.changedUser);
    }

    checkStatusButton(){
        this.isValidNewUserInput();
    }

    isValidNewUserInput(){

        if(this.changedUser.street!=''&&!this.checkOnlyText(this.changedUser.street!)){
            this.invEditDataMsg = 'The street should only contain letters.'
            this.activeSaveButton = false;
        }else if(this.changedUser.city!=''&&!this.checkOnlyText(this.changedUser.city!)){
            this.invEditDataMsg = 'The city should only contain letters.'
            this.activeSaveButton = false;
        }else if(this.changedUser.phonenumber!=''&&!this.checkPhoneNumb(this.changedUser.phonenumber!)){
            this.invEditDataMsg = 'The phonenumber is invalid.'
            this.activeSaveButton = false;
        }else if(this.changedUser.zipCode!=''&&(!this.checkOnlyNum(this.changedUser.zipCode!)||this.changedUser.zipCode!.length!=4)){
            this.invEditDataMsg = 'The ZipCode may only contain 4 numbers.'
            this.activeSaveButton = false;
        }else if(this.changedUser.housenr!!=0&&(this.changedUser.housenr!<=0||!this.checkOnlyNum(this.changedUser.housenr!.toString()))){
            this.invEditDataMsg = 'The House Number should not contain letters.'
            this.activeSaveButton = false;
        }else {this.activeSaveButton = true;}

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

}

