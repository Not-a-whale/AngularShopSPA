import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { Subject, identity, Subscription, BehaviorSubject } from 'rxjs';

const CONFIG = {
  space: 'msp0xh0f2n25',
  accessToken: 'jtoAoXj8tbL2e7qO-9LCyzXvE2qLB5rAup-fk_C9aLk',

  contentTypeIds: {
    product: '',
  },
};

export interface Item {
  id: Number;
  name: String;
  label: String;
  price: Number;
  image: String;
  amount?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  shoppingCart: Item[];
  inCart: Item[] = [];
  addedItemsChanged = new BehaviorSubject<Item[]>(this.inCart);
  itemsChanged = new Subject<Item[]>();
  subscr: Subscription;

  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken,
  });

  constructor() {}

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
    this.itemsChanged.next(this.shoppingCart.slice());
  }

  addProduct(id) {
    const addedItem = this.shoppingCart.find((item) => item.id === id);
    this.inCart.push(addedItem);
    this.addedItemsChanged.next(this.inCart.slice());
  }
}
