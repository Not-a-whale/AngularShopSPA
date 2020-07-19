import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    component: ProductsComponent,
    data: { animation: 'isLeft' },
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    data: { animation: 'isRight' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
