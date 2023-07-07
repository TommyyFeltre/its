import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isNil, omitBy } from 'lodash';
import { Product } from 'src/interfaces/product';

export interface ProductFilters {
  name?: string | null,
  minPrice?: number | null,
  maxPrice?: number | null
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  list(filters: ProductFilters) {
    const q = omitBy(filters, isNil);
    return this.http.get<Product[]>('api/products', {params: q});
  }
}