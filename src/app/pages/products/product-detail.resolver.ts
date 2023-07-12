import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { pick } from "lodash";
import { Observable, catchError, of } from "rxjs";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/interfaces/product";



@Injectable({ providedIn: 'root' })
export class ProductDetailResolver implements Resolve<Product> {
  constructor(private productSrv: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    const id = route.params['id'];
    return this.productSrv.singleProduct(id);
  }

  
}