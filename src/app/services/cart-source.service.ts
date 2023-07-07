import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { CartItem } from 'src/interfaces/cart-item';


@Injectable({
  providedIn: 'root'
})
export class CartSourceService {

  private _items$ = new BehaviorSubject<CartItem[]>([]);
  items$ = this._items$.asObservable();

  // constructor(){
  //   this.items$.next(this.items);
  // }

  constructor(private http: HttpClient){
    this.fetch();
  }

  setQuantity(id: string, quantity: number){
    const index = this._items$.value.findIndex(i => i.id === id);
    const clone = structuredClone(this._items$.value);
    clone[index].quantity = quantity;
    //istruzione che dice che è cambiato il valore
    this._items$.next(clone);
  }

  

  fetch(){
    this.http.get<CartItem[]>('/api/cart-items')
    .subscribe(items => this._items$.next(items))
  }
}
