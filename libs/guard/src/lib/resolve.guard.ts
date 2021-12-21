/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
// import { NgxSpinnerService } from 'ngx-spinner';
import { of} from 'rxjs';
import { delay} from 'rxjs/operators';
import { HeroService } from '../../../services/src/lib/hero.service';
import * as HeroAction from '../../../store/src/lib/hero.action';

@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<any> {
  constructor(private hero: HeroService, private store: Store){}
  check:boolean = false;
  resolve(router:ActivatedRouteSnapshot){
    const id = Number(router.paramMap.get('id'));
    // return this.hero.getHero(id); dùng service ';'
    console.log("Đang call dữ liệu")
    this.check = true
    console.log("check",this.check)
    // this.spinner.show()
    return of(this.store.dispatch(new HeroAction.GetHero(id))).pipe(delay(1000))
  }
}
