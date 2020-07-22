import { Component, OnInit } from '@angular/core';
import { Item, ShoppingCartService } from '../ShoppingCartService';
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
    this.products = this.ShoppingCartService.getAllProducts();
    this.prodSub = this.ShoppingCartService.productsFetched.subscribe(
      (data) => {
        this.products = data;
      }
    );
  }
}
