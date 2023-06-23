import { Inject, Injectable, InjectionToken } from '@angular/core';
import { right } from '@popperjs/core';
import { ReplaySubject } from 'rxjs';

export const DEFAULT_VAT = new InjectionToken<number>('DEFAULT_VAT');

@Injectable({
  providedIn: 'root',
})
export class VatService {
  private _vat$ = new ReplaySubject<number>();
  vat$ = this._vat$.asObservable();

  constructor(@Inject(DEFAULT_VAT)private defaultVat: number){
    this._vat$.next(this.defaultVat);
  }

  setVat(countryCode : string){
    const vat = countryCode === 'IT' ? 0.22 : this.defaultVat;
    this._vat$.next(vat);
  }
}
