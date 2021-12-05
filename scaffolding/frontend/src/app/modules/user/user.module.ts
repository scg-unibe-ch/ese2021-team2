import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UserPageComponent} from "./user-page/user-page.component";
import {BoardModule} from "../board/board.module";

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
      BoardModule,
      routing,
  ]
})
export class UserModule { }
