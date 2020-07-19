import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../ShoppingCartService';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Item;

  constructor() {}

  ngOnInit(): void {
    console.log(this.product);
  }
}
