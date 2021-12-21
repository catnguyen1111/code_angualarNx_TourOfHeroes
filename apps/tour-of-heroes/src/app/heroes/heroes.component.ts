/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router,Event } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Hero } from '@tour-of-heroes/data';
// import { MessageService } from 'libs/services/src/lib/message.service';
import * as HeroAction from '../../../../../libs/store/src/lib/hero.action'
import {HeroState} from '../../../../../libs/store/src/lib/hero.state';
import {HeroService} from '../../../../../libs/services/src/lib/hero.service';
import { Observable } from 'rxjs';
import { MessageService } from '../../../../../libs/services/src/lib/message.service';
import { AlertService } from '../../../../../libs/services/src/lib/alert.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'tour-of-heroes-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit,AfterViewInit,OnDestroy {

  @Select(HeroState.heroes) heroes$ !: Observable<Hero[]>;
  public selectedHero ?:Hero;
  public heroes:Hero[] = [];
  check:boolean = false;
  check_router:boolean = false;
  timeout:any;
  loading:boolean = false;
  public dulieu:string = '';


  @ViewChild('dynamicComponent',{
    read: ViewContainerRef,
    static: true
  })containerRef!: ViewContainerRef;

  componentRef!:ComponentRef<PopupComponent>

  constructor(private heroService: HeroService,
    private messageService: MessageService,
    private store:Store,
    private cfr: ComponentFactoryResolver,
    private alertService: AlertService,
    private router: Router,

    ) {
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
    console.log("heroes$",this.heroes$);
    this.alertService.close$.subscribe(
      () => {
        this.containerRef.clear()
        if(this.componentRef){
          this.componentRef.destroy();
        }
      }
    )
  }

  ngAfterViewInit(){
    this.addDynamicComponenetOne();
  }
  ngOnDestroy(){
    if(this.componentRef){
      this.componentRef.destroy();
    }
  }
  getHeroes(){
    this.store.dispatch(new HeroAction.GetHeroes())

  }
  add(name: string): void {
    name = name.trim();
    console.log('name',name);
    if (!name) {
      return;
    }
    this.store.dispatch(new HeroAction.AddHero({name} as Hero))
  }
  delete(hero: Hero): void {
    this.heroes  = this.heroes.filter(h => h!== hero);
    // this.heroService.deleteHero(hero.id).subscribe();
    this.store.dispatch(new HeroAction.DeleteHero(hero.id))

  }

  addDynamicComponenetOne(){
    const container =  this.containerRef;
    container.clear();
    const injector = container.injector;

    const componentFactory =  this.cfr.resolveComponentFactory(PopupComponent);
    const componentRef = this.containerRef.createComponent(componentFactory,0,injector);
    componentRef.instance.data = this.check;


  }
  blur() {

    this.check = true;
    this.addDynamicComponenetOne()
  }

}
