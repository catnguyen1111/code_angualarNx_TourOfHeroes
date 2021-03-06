/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router,Event } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Hero } from '@tour-of-heroes/data';
import { Observable } from 'rxjs';
import {HeroState} from '../../../../store/src/lib/hero.state'
import {HeroService} from '../../../../services/src/lib/hero.service'
import {Location} from '@angular/common';
import * as HeroAction from '../../../../store/src/lib/hero.action'
@Component({
  selector: 'tour-of-heroes-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() dataHero?:Hero;
  @Select(HeroState.selectedHero) dataHero$ !: Observable<Hero>;
  public check:boolean = true;
  loading:boolean = false;
  check_router:boolean = false;
  data_update :any;
  timeout:any;
  data_test!:Hero
  form!:FormGroup;
  constructor(
    private heroService: HeroService,
    private router:ActivatedRoute,
    private location: Location,
    private store: Store,
    private router1:Router,
    private fb: FormBuilder
  ) {
    this.router1.events.subscribe((event:Event) => {
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
         }, 1000);
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
    this.getHero();
    this.dataHero$.subscribe(data =>{this.data_update = data})
    this.form = new FormGroup({
      id: new FormControl(this.data_update.id),
      name : new FormControl(this.data_update.name)
    })

  }
  getHero(){
    // const id = Number(this.router.snapshot.paramMap.get('id'));
    // // this.heroService.getHero(id).subscribe(hero => this.dataHero = hero);
    // this.store.dispatch(new HeroAction.GetHero(id))
    //s??? d???ng reslove router

    this.router.snapshot.data['data'];
    this.check = false;
    console.log("Nh???n ???????c d??? li???u")

  }
  goBack(){
    this.location.back();
  }
  // onSubmit(){
  //   console.log("submit",this.form)
  // }
  // save(dataHero:Hero){
  //   // if(this.dataHero){
  //   //   this.heroService.updateHero(this.dataHero).subscribe(() => this.goBack())
  //   // }

  //   console.log("dataHero",dataHero);
  //   // this.store.dispatch(new HeroAction.UpdateHero(dataHero)).subscribe(() => this.goBack())
  // }
  save(id:number,name: string){
    this.data_test = {id,name}
    this.store.dispatch(new HeroAction.UpdateHero(this.data_test)).subscribe(() => this.goBack())
  }


}
