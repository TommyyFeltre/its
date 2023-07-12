import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ProductFilterResolver } from './pages/products/product-filter.resolver';
import { ProductsResolver } from './pages/products/products.resolver';
import { ProductDetailResolver } from './pages/products/product-detail.resolver';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
    resolve: {
      filters: ProductFilterResolver,
      products: ProductsResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    resolve: {
      details: ProductDetailResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

 }
