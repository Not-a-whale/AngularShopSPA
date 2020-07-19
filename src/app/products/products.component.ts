import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../ShoppingCartService';
import { Item } from '../ShoppingCartService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Item[];
  prodSub: Subscription;

  constructor(private ShoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.prodSub = this.ShoppingCartService.itemsChanged.subscribe((data) => {
      this.products = data;
    });
  }
}
