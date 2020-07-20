import { Injectable } from '@angular/core';
import { Item } from '../ShoppingCartService';

export type Either = Item[] | [];
export type EitherAmount = { priceTotal: number; amountTotal: number } | 0;

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  saveProducts(products: Item[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }

  getProducts(): Either {
    return localStorage.getItem('products')
      ? JSON.parse(localStorage.getItem('products'))
      : [];
  }

  getProduct(id: Item): Item {
    const products = JSON.parse(localStorage.getItem('products'));
    return products.find((product) => product.id === id);
  }

  saveCart(cart: Item[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): Either {
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }

  saveAmounts(amounts: EitherAmount): void {
    localStorage.setItem('amounts', JSON.stringify(amounts));
  }

  getAmounts(): EitherAmount {
    return localStorage.getItem('amounts')
      ? JSON.parse(localStorage.getItem('amounts'))
      : 0;
  }
}
