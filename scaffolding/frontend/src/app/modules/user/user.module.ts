import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UserPageComponent} from "./user-page/user-page.component";
import {SharedModule} from "../../shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from '@angular/material/divider';

const routes: Routes = [
    {
        path: ':userId',
        component: UserPageComponent,
    }
];

export const routing = RouterModule.forChild(routes);


@NgModule({
  declarations: [
      UserPageComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        routing,
        MatCardModule,
        MatDividerModule,
    ]
})
export class UserModule { }
