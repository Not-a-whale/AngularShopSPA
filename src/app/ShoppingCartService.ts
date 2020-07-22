import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { Subject, identity, Subscription, BehaviorSubject } from 'rxjs';
import {
  DataStorageService,
  EitherAmount,
} from './shared/data-storage.service';

const CONFIG = {
  space: 'msp0xh0f2n25',
  accessToken: 'jtoAoXj8tbL2e7qO-9LCyzXvE2qLB5rAup-fk_C9aLk',

  contentTypeIds: {
    product: '',
  },
};

export interface Item {
  id: string;
  name: string;
  label: string;
  price: number;
  image: string;
  amount?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  shoppingCart: Item[];
  inCart: Item[] = [];
  addedItemsChanged = new BehaviorSubject<Item[]>(this.inCart);
  productsFetched = new BehaviorSubject<Item[]>(this.shoppingCart);
  allPriceChanged = new Subject<number>();
  numberOfItemsChanged = new Subject<number>();

  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken,
  });

  constructor(private dataStoreService: DataStorageService) {}

  getProducts(query?: object) {
    return this.cdaClient
      .getEntries(
        Object.assign(
          {
            content_type: CONFIG.contentTypeIds,
          },
          query
        )
      )
      .then((res) => this.setItems(res.items));
  }

  setItems(items) {
    this.shoppingCart = items
      .map((item) => {
        const { id, label, price, name } = item.fields;
        const image = item.fields.image.fields.file.url;
        return { id, name, label, price, image, amount: 1 };
      })
      .reverse();
    this.dataStoreService.saveProducts(this.shoppingCart);
    this.inCart = this.getAllCart();
    this.shoppingCart = this.getAllProducts();
    this.productsFetched.next(this.shoppingCart);
    this.setCartValue();
  }

  addProduct(id) {
    const itemInCart = this.inCart.findIndex((item) => item.id === id);
    if (itemInCart !== -1) {
      this.inCart[itemInCart].amount = this.inCart[itemInCart].amount + 1;
      this.emitChangedData();
    } else {
      const addedItem = this.shoppingCart.find((item) => item.id === id);
      this.inCart.push(addedItem);
      this.emitChangedData();
    }
  }

  deleteProduct(id): void {
    const itemInCart = this.inCart.findIndex((item) => item.id === id);
    if (this.inCart[itemInCart]) {
      if (this.inCart[itemInCart].amount === 1) {
        this.removeGroup(id);
      } else {
        this.inCart[itemInCart].amount = this.inCart[itemInCart].amount - 1;
      }
      this.emitChangedData();
    }
  }

  removeGroup(id): void {
    const itemNumber = this.inCart.findIndex((item) => item.id === id);
    this.inCart.splice(itemNumber, 1);
    this.emitChangedData();
  }

  removeAll(): void {
    this.inCart.splice(0, this.inCart.length);
    this.emitChangedData();
  }

  getAllProducts(): Item[] {
    return this.dataStoreService.getProducts();
  }

  getAllCart(): Item[] {
    return this.dataStoreService.getCart();
  }

  setCartValue(): void {
    let amountTotal = 0;
    let priceTotal = 0;
    if (this.inCart.length > 0) {
      this.inCart.map((item) => {
        amountTotal += item.amount;
        priceTotal += item.price * item.amount;
      });
      this.allPriceChanged.next(priceTotal);
      this.numberOfItemsChanged.next(amountTotal);
      this.dataStoreService.saveAmounts({ priceTotal, amountTotal });
    } else {
      this.allPriceChanged.next(0);
      this.numberOfItemsChanged.next(amountTotal);
      this.dataStoreService.saveAmounts({ priceTotal: 0, amountTotal: 0 });
    }
  }

  emitChangedData(): void {
    this.addedItemsChanged.next(this.inCart.slice());
    this.dataStoreService.saveCart(this.inCart);
    this.setCartValue();
  }

  getAmountsOfAllPricesAndItems(): any {
    return this.dataStoreService.getAmounts();
  }
}
