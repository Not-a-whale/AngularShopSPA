import { Component, OnInit } from '@angular/core';
import {Item, ShoppingCartService} from '../ShoppingCartService';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Item[];

  constructor(private ShoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.products = this.ShoppingCartService.getAllProducts();
  }
}
