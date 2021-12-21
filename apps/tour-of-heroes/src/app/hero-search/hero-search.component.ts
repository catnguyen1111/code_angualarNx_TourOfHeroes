/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { Hero } from '@tour-of-heroes/data';
import { HeroService } from '../../../../../libs/services/src/lib/hero.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'tour-of-heroes-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {

  public heroes$ !: Observable<Hero[]>;
  loading: boolean = false;
  check:boolean = false;
  timeout:any;
  private searchTerms = new Subject<string>();
  constructor(private heroService: HeroService) {

   }

  search(term : string): void{
    this.searchTerms.next(term);
  }
  ngOnInit(): void {

    this.heroes$ = this.searchTerms.pipe(

      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );

  }

}
