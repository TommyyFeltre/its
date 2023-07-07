import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { CartItem } from 'src/interfaces/cart-item';

const CART: CartItem[] = [];

@Injectable({
  providedIn: 'root'
})
export class CartSourceService {

  private _items$ = new BehaviorSubject<any[]>(structuredClone(CART));
  items$ = this._items$.asObservable();

  // constructor(){
  //   this.items$.next(this.items);
  // }

  setQuantity(id: string, quantity: number){
    const index = this._items$.value.findIndex(i => i.id === id);
    const clone = structuredClone(this._items$.value);
    clone[index].quantity = quantity;
    //istruzione che dice che è cambiato il valore
    this._items$.next(clone);
  }
}
