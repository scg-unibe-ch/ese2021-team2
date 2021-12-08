import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/http/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogModel } from 'src/app/models/confirmation-dialog.model';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { User } from '../../../../models/user.model';


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
    imageURL: string;

    constructor(public userService: UserService,
                private dialog: MatDialog,
                public httpClient: HttpClient,
                private snackBar: MatSnackBar) {
        // Listen for changes
        userService.loggedIn$.subscribe(res => {
            this.loggedIn = res;
            this.imageURL = this.userService.getProfileImageURL()
        });
        userService.user$.subscribe(res => {
            this.user = res
            this.initUser();
        });
        userService.imageURL$.subscribe(res => {
            this.imageURL = res
        });

        // Current value
        this.loggedIn = userService.getLoggedIn();
        this.user = userService.getUser();
        this.imageURL = userService.getProfileImageURL();

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

    processFile(imageInputEvent: any) {
        const f : File = imageInputEvent.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(f)
        reader.onload = event =>{
            this.userService.setProfileImageURL( <string> reader.result);
        }
        this.userService.addProfileImage(f);
    }

    handleDelete(){
        this.userService.deleteProfileImage();
    }

    isDefaultPicture(): boolean {
        return this.imageURL === '/assets/images/no_user.jpg';
    } 

    test(){
        console.log(this.user);
        console.log(this.changedUser);
    }

}

