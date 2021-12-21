/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Hero } from '@tour-of-heroes/data';
import { Observable } from 'rxjs';
import {HeroService} from '../../../../services/src/lib/hero.service'
import {HeroState} from '../../../../store/src/lib/hero.state'
import * as HeroAction from '../../../../store/src/lib/hero.action'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router,Event } from '@angular/router';
@Component({
  selector: 'tour-of-heroes-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading: boolean = false;
  timeout:any;
  check_router:boolean = false;
  @Select(HeroState.heroes) heroes$!: Observable<Hero[]>;

  constructor(private heroService: HeroService,private store: Store,private router: Router) {
    this.router.events.subscribe((event:Event) => {
      switch(true){
        case event instanceof NavigationStart:{
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:{
          this.timeout = setTimeout(() => {
            clearTimeout(this.timeout);
            this.loading = false;
            this.check_router = true;
         }, 500);
          break;
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationError:{
          this.loading = false;
          break;
        }
        default:{
          break;
        }

      }
    })
  }


  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(){
    // this.heroService.getHeroes().subscribe(hero => this.heroes = hero.slice(1,5))
    this.store.dispatch(new HeroAction.GetHeroes());
  }

}
