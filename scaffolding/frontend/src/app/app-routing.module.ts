import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule],
})


export class AppRoutingModule { }
