import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home/pages/home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './modules/profile/pages/profile/profile.component';
import { SubjectsComponent } from './modules/subjects/pages/subjects/subjects.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: 'subjects',
        loadChildren: () => import('./modules/subjects/subjects.module').then(m => m.SubjectsModule)
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})

export class AppRoutingModule { }
