import { VatService } from './services/vat.service';
import { Component } from '@angular/core';
import { CartSourceService } from './services/cart-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //providers: [CartSourceService]
})
export class AppComponent {
  items$ = this.cartService.items$;
  vat$ = this.vatService.vat$;

  constructor(private cartService: CartSourceService, 
              private vatService: VatService) {
    let coutry = 'IT';
    setInterval(() => {
      coutry = coutry === 'IT' ? 'EN' : 'IT';
      this.vatService.setVat(coutry);
    }, 2000) 
  }

  updateQuantity(item: any, quantity: number) {
    this.cartService.setQuantity(item.id, quantity);
  }
  //metto _ perchè la funzione accetta due parametri ma l'index non mi serve
  trackById(_: number, item: any) {
    return item.id;
  }
}
