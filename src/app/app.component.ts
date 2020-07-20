import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ShoppingCartService } from './ShoppingCartService';
import { Subscription } from 'rxjs';
import { Item } from './ShoppingCartService';
import { slider } from './app-animations';
import { RouterOutlet } from '@angular/router';
import {DataStorageService} from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slider],
})
export class AppComponent implements OnInit {
  title = 'AngulartShopCart';
  main;

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  scrollToShop (): void {
    this.main.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }


  constructor(private shoppingCartService: ShoppingCartService, private DataStoreService: DataStorageService) {}

  ngOnInit() {
    this.shoppingCartService.getProducts();
    this.main = document.getElementById('shop');
  }
}
