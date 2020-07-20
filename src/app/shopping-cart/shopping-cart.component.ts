import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ShoppingCartService } from '../ShoppingCartService';
import { Item } from '../ShoppingCartService';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  itemsChangedSub: Subscription;
  amountChangedSub: Subscription;
  changedItems: Item[];
  price: number;

  deleteAll(): void {
    this.ShoppingCartService.removeAll();
  }

  constructor(private ShoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.price = this.ShoppingCartService.getAmountsOfAllPricesAndItems().priceTotal;
    this.changedItems = this.ShoppingCartService.getAllCart();
    this.itemsChangedSub = this.ShoppingCartService.addedItemsChanged.subscribe(
      (data) => {
        this.changedItems = data;
      }
    );
    this.amountChangedSub = this.ShoppingCartService.allPriceChanged.subscribe(
      (num) => {
        this.price = num;
      }
    );
  }
}
