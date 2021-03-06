/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Injectable} from '@angular/core';
import {Action,Selector,State,StateContext} from '@ngxs/store';
import {Hero} from '@tour-of-heroes/data';
import {HeroService} from '../../../services/src/lib/hero.service';
import {tap} from 'rxjs/operators';
import * as HeroActions from './hero.action';
import {Observable} from 'rxjs';

export interface HeroStateModel{
  selectedHero:Hero;
  heroes:Hero[];
}

@Injectable({
  providedIn: 'root'
})
export class HeroState {
  constructor(private heroService: HeroService){}
  @Selector()
  static heroes(state: HeroStateModel){
    return state.heroes;
  }

  @Selector()
  static selectedHero(state: HeroStateModel){
    return state.selectedHero;
  }
  @Action(HeroActions.GetHero)
  getHero(ctx: StateContext<HeroStateModel>, action: HeroActions.GetHero) {
    return this.heroService.getHero(action.payload).pipe(
      tap((resData: Hero) => {
        ctx.patchState({ selectedHero: resData });
      })
    );
  }
  @Action(HeroActions.AddHero)
  addHero(ctx: StateContext<HeroStateModel>, action: HeroActions.AddHero) {
    return this.heroService.addHero(action.payload).pipe(
      tap((resData: Hero) => {
        const state = ctx.getState();
        ctx.patchState({ heroes: [...state.heroes, resData] });
      })
    );
  }
  @Action(HeroActions.GetHeroes)
  getHeroes(ctx: StateContext<HeroStateModel>) {
    return this.heroService.getHeroes().pipe(
      tap((resData: Hero[]) => {
        ctx.patchState({ heroes: resData });
      })
    );
  }
  @Action(HeroActions.UpdateHero)
  updateHero(ctx: StateContext<HeroStateModel>, action: HeroActions.UpdateHero) {
    const heroForUpdate = action.payload;
    return this.heroService.updateHero(heroForUpdate).pipe(
      tap((resData: Hero) => {
        const state = ctx.getState();
        const updatedHeroes = state.heroes.map(hero => {
          if (hero.id === heroForUpdate.id) {
            return heroForUpdate;
          } else { return hero; }
        });
        ctx.patchState({ heroes: updatedHeroes });
      })
    );
  }
  @Action(HeroActions.DeleteHero)
  deleteHero(ctx: StateContext<HeroStateModel>, action: HeroActions.DeleteHero) {
    return this.heroService.deleteHero(action.payload).pipe(
      tap(() => {
        const state = ctx.getState();
        const updatedHeroes = state.heroes.filter(hero => hero.id !== action.payload);
        ctx.patchState({ heroes: updatedHeroes });
      })
    );
  }
}
