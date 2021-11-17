import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NgModule} from '@angular/core';
import { ProductComponent } from 'src/app/modules/shop/components/product/product.component';
import { MatCardModule } from '@angular/material/card';
import { ShopComponent } from './pages/shop/shop.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';

const routes: Routes = [
  {
      path: '',
      component: ShopComponent
  }
];

export const routing = RouterModule.forChild(routes); 

@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    ShopComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    routing
  ]
})
export class ShopModule { }
