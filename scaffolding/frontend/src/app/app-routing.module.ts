import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home/pages/home/home.component';
import { ProfileComponent } from './modules/profile/pages/profile/profile.component';
import { SubjectsComponent } from './modules/subjects/pages/subjects/subjects.component';
import { BoardModule } from './modules/board/board.module';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: 'subjects',
        loadChildren: () => import('./modules/subjects/subjects.module').then(m => m.SubjectsModule)
    },
    {
        path: 'boards',
        loadChildren: () => import('./modules/board/board.module').then(m => m.BoardModule)
    },
    {
        path: 'shop',
        loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)
    },
    {
        path: 'bookmarks',
        loadChildren: () => import('./modules/bookmarks/bookmarks.module').then(m => m.BookmarksModule)
    },
    {
        path: 'myLectures',
        loadChildren: () => import('src/app/modules/my-lectures/my-lectures.module').then(m => m.MyLecturesModule)
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})

export class AppRoutingModule { }
