import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

export const routing = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    routing
  ]
})

export class HomeModule { }
