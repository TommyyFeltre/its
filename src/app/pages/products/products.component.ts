import { Component, OnDestroy, OnInit } from '@angular/core';
import { startWith, switchMap, debounceTime, catchError, of, Subject, takeUntil, map, filter } from 'rxjs';
import { ProductFilters, ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { omitBy, pick } from 'lodash';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{

  private applyFilters$ = new Subject<ProductFilters>();
  private destroyed$ = new Subject<void>();
  filters$ = this.activatedRoute.queryParams
              .pipe(
                map(params => pick(params, ['name', 'minPrice', 'maxPrice']))
              );

  products$ = this.filters$
              .pipe(
                startWith({}),
                switchMap(filters => { 
                  return this.productSrv.list(filters)
                    .pipe(
                      catchError(err => of([]))
                    )
                })
              );

  constructor(private productSrv: ProductService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void{
    this.applyFilters$
      .pipe(
        takeUntil(this.destroyed$),
        map(value => omitBy(value, val => val === '')),
        debounceTime(200)
      )
      .subscribe(filters => {
        this.router.navigate([], {queryParams: filters})
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onFiltersChange(value: ProductFilters){
    this.applyFilters$.next(value);
  }

}
