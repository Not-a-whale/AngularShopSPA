import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../ShoppingCartService';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss'],
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() Item: Item;

  constructor() {}

  ngOnInit(): void {
    console.log(this.Item);
  }
}
