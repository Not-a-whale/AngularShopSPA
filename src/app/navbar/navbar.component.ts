import { Component, OnInit, Input } from '@angular/core';
import {ShoppingCartService} from '../ShoppingCartService';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items: number;
  numberOfItemsSub: Subscription;

  constructor(private ShoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.items = this.ShoppingCartService.getAmountsOfAllPricesAndItems().amountTotal;
    this.numberOfItemsSub = this.ShoppingCartService.numberOfItemsChanged.subscribe(
      (data) => {
        this.items = data;
      }
    );
  }
}
