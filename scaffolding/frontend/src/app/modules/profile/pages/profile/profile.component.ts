import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogModel } from 'src/app/models/confirmation-dialog.model';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { environment } from 'src/environments/environment';
import { UserService } from '../../../../core/http/user/user.service';
import { User } from '../../../../models/user.model';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    loggedIn: boolean | undefined;
    user: User | undefined;
    changedUser = new User(0, '', '', '', '', '', '', 0, '', '', '', '', false, '', []);
    editMode: boolean = false;
    editTag: String = "Edit";

    constructor(public userService: UserService,
                 private dialog: MatDialog,
                 public httpClient: HttpClient,
                 private snackBar: MatSnackBar) {

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

    logoutUser(): void {
        localStorage.removeItem('userName');
        localStorage.removeItem('userToken');

        this.userService.setLoggedIn(false);
        this.userService.setUser(undefined);
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
                this.logoutUser();
            }
        })
    }

    deleteAccount() {
        this.httpClient.delete(environment.endpointURL + "user/delete").subscribe(()=>{
            this.snackBar.open("Account successfully deleted", "Dismiss", {                     //confirm deletion with snackbar
                duration: 5000
            });
            localStorage.removeItem('userName');
            localStorage.removeItem('userToken');
            this.userService.setLoggedIn(false);
            this.userService.setUser(undefined);
        })
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
        this.httpClient.put(environment.endpointURL + "user/update", {
            userName: this.changedUser.userName,
            fname: this.changedUser.fname,
            lname: this.changedUser.lname,
            email: this.changedUser.email,
            street: this.changedUser.street,
            housenr: this.changedUser.housenr,
            zipCode: this.changedUser.zipCode,
            city: this.changedUser.city,
            birthday: this.changedUser.birthday,
            phonenumber: this.changedUser.phonenumber
        }).subscribe((res:any) => {
            localStorage.setItem('userToken',res.token);
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
            this.setEditMode();
        })
    }

    test(){
        console.log(this.user);
        console.log(this.changedUser);
    }

}

