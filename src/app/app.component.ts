import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './ShoppingCartService';
import { Subscription } from 'rxjs';
import { Item } from './ShoppingCartService';
import { slider } from './app-animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slider],
})
export class AppComponent implements OnInit {
  title = 'AngulartShopCart';

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.shoppingCartService.getProducts();
  }
}
