import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CartSourceService } from 'src/app/services/cart-source.service';
import { VatService } from 'src/app/services/vat.service';
import { CartItem } from 'src/interfaces/cart-item';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy{
  items$ = this.cartService.items$;
  vat$ = this.vatService.vat$;

  private updateQuantity$ = new Subject<{id: string, quantity: number}>();
  private destroyed$ = new Subject<void>();

  constructor(private cartService: CartSourceService, 
              private vatService: VatService) {
    // setInterval(() => {
    //   coutry = coutry === 'IT' ? 'EN' : 'IT';
    //   this.vatService.setVat(coutry);
    // }, 2000) 
  }

  ngOnInit(): void {
    let coutry = 'IT';

    this.updateQuantity$
    .pipe(
      takeUntil(this.destroyed$),
      //se l'utente smette di cambiare la quantità
      debounceTime(200)
    )
    .subscribe(data => this.cartService.setQuantity(data.id, data.quantity))
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  updateQuantity(item: CartItem, quantity: number) {
    this.updateQuantity$.next({id: item.id, quantity});
  }
  //metto _ perchè la funzione accetta due parametri ma l'index non mi serve
  trackById(_: number, item: CartItem) {
    return item.id;
  }
}
