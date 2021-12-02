import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubjectsModule } from '../subjects/subjects.module';


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
        routing,
        SharedModule,
        SubjectsModule
    ],
    schemas: [ 
      CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class HomeModule { }
