import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './products/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router, Event, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductComponent,
    ProductsComponent,
    ShoppingCartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(router: Router, viewportScroller: ViewportScroller) {
    router.events
      .pipe(filter((e: Event): e is Scroll => e instanceof Scroll))
      .subscribe((e) => {
        if (e.position) {
          // backward navigation
          viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
          // anchor navigation
          viewportScroller.scrollToAnchor(e.anchor);
        } else {
          // forward navigation
          viewportScroller.scrollToPosition([0, 0]);
        }
      });
  }
}
