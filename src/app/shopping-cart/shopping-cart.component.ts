import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../ShoppingCartService';
import { Item } from '../ShoppingCartService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  itemsChangedSub: Subscription;
  changedItems: Item[];

  constructor(private ShoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.itemsChangedSub = this.ShoppingCartService.addedItemsChanged.subscribe(
      (data) => {
        if (data.length > 0) {
          this.changedItems = data;
          console.log('this is the data' + this.changedItems[0].name);
        }
      }
    );
  }
}
