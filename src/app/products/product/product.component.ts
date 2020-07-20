import { Component, OnInit, Input } from '@angular/core';
import { Item, ShoppingCartService } from '../../ShoppingCartService';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Item;

  addItem(id) {
    this.ShoppingCartService.addProduct(id);
  }

  constructor(private ShoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}
}
