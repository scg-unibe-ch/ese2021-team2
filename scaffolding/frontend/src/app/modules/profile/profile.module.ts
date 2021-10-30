import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';

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
    CommonModule,
    routing
  ]
})
export class ProfileModule { }
