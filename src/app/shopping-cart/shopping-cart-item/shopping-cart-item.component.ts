import { Component, OnInit, Input } from '@angular/core';
import { Item, ShoppingCartService } from '../../ShoppingCartService';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss'],
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() Item: Item;

  increaseQuantity(): void {
    this.ShoppingCartService.addProduct(this.Item.id);
  }

  decreaseQuantity(): void {
    this.ShoppingCartService.deleteProduct(this.Item.id);
  }

  removeGroupOfItems(): void {
    this.ShoppingCartService.removeGroup(this.Item.id);
  }

  constructor(private ShoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}
}
