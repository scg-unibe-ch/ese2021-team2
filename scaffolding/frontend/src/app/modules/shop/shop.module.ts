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
import { CartComponent } from './components/cart/cart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule} from '@angular/material/badge';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
      path: '',
      component: ShopComponent
  },
  {
    path: 'product/:productId',
    component: ProductPageComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];

export const routing = RouterModule.forChild(routes); 

@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    ShopComponent,
    ProductPageComponent,
    CartComponent,

  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    routing,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    MatDialogModule,
    MatBadgeModule,
    SharedModule,
  ],
  exports: []
})
export class ShopModule { }
