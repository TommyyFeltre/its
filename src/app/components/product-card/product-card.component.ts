import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/interfaces/cart-item';
import { Product } from 'src/interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

@Input()
product?: Product;

@Output()
newCartItem = new EventEmitter<any>();

addCartItem(value: any){

}

}
