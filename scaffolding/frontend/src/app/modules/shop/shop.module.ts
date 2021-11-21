import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NgModule} from '@angular/core';
import { ProductComponent } from 'src/app/modules/shop/components/product/product.component';
import { MatCardModule } from '@angular/material/card';
import { ShopComponent } from './pages/shop/shop.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { ProductPageComponent } from 'src/app/modules/shop/components/product-page/product-page.component';
import { MatDividerModule } from '@angular/material/divider';
import { filterPipe } from '../../shared/components/Pipes/filter.pipe';
import { searchPipe } from '../../shared/components/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
      path: '',
      component: ShopComponent
  },
  {
    path: 'product/:productId',
    component: ProductPageComponent
  }
];

export const routing = RouterModule.forChild(routes); 

@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    ShopComponent,
    ProductPageComponent,
    filterPipe,
    searchPipe,

  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    routing,
    FormsModule
  ]
})
export class ShopModule { }
