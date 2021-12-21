/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Hero } from '@tour-of-heroes/data';
import { Observable } from 'rxjs';
import {HeroService} from '../../../../services/src/lib/hero.service'
import {HeroState} from '../../../../store/src/lib/hero.state'
import * as HeroAction from '../../../../store/src/lib/hero.action'
@Component({
  selector: 'tour-of-heroes-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Select(HeroState.heroes) heroes$!: Observable<Hero[]>;

  constructor(private heroService: HeroService,private store: Store) {

  }


  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(){
    // this.heroService.getHeroes().subscribe(hero => this.heroes = hero.slice(1,5))
    this.store.dispatch(new HeroAction.GetHeroes());
  }

}
