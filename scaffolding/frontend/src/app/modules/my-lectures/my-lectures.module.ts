import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLecturesComponent } from './my-lectures/my-lectures.component';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';




const routes: Routes = [
  {
      path: '',
      component: MyLecturesComponent
  }
];

export const routing = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    MyLecturesComponent
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    routing,
    SharedModule,
    FormsModule
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MyLecturesModule { }
