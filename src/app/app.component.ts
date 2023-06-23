import { Component } from '@angular/core';
import {
  getDiscountedPrice,
  getFinalPrice,
  getDiscountAmount,
} from 'src/utils/cart-utils';
import { CartSourceService } from './services/cart-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //providers: [CartSourceService]
})
export class AppComponent {
  items$ = this.cartService.items$;
  vat = 0.22;

  constructor(private cartService: CartSourceService) {
    this.cartService.items$.subscribe((value) => {
      console.log(value);
    });
  }

  updateQuantity(item: any, quantity: number) {
    this.cartService.setQuantity(item.id, item.quantity);
  }
  //metto _ perchè la funzione accetta due parametri ma l'index non mi serve
  trackById(_: number, item: any) {
    return item.id;
  }
}
