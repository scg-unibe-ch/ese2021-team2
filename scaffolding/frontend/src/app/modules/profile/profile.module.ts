import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms'
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent
    }
];

export const routing = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    routing,
    MatCardModule,
    MatMenuModule,
  ]
})
export class ProfileModule { }
