import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule} from '@angular/material/badge';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderComponent } from './components/order/order.component';
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ProductCreationComponent } from './components/product-creation/product-creation.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderPageComponent } from './components/order-list/order-page/order-page.component';
import { OrderSummaryComponent } from './components/order-list/order-summary/order-summary.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";

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
  },
    {
    path: 'cart/order',
    component: OrderComponent
    },
    {
    path:'orders',
    component: OrderListComponent
    },
    {
    path: 'orders/order/:id',
    component: OrderPageComponent
    },

];

export const routing = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    ShopComponent,
    ProductPageComponent,
    CartComponent,
    OrderComponent,
    ProductCreationComponent,
    OrderListComponent,
    OrderPageComponent,
    OrderSummaryComponent,

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
        MatSelectModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        ReactiveFormsModule,
    ],
  exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopModule { }
