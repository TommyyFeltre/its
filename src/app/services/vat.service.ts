import { Injectable, InjectionToken } from '@angular/core';
import { right } from '@popperjs/core';
import { ReplaySubject } from 'rxjs';

export const DEFAULT_VAT = new InjectionToken<number>('DEFAULT_VAT');

@Injectable({
  providedIn: 'root',
})
export class VatService {
  private _vat$ = new ReplaySubject<number>();
  vat$ = this._vat$.asObservable();

  constructor(){
    this._vat$.next(0);
  }

  setVat(countryCode : string){
    const vat = countryCode === 'IT' ? 0.22 : 0;
    this._vat$.next(vat);
  }
}
