/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import {HeroService} from '../../../../services/src/lib/hero.service'
@Component({
  selector: 'tour-of-heroes-value-accessor',
  templateUrl: './value-accessor.component.html',
  styleUrls: ['./value-accessor.component.scss'],
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=>ValueAccessorComponent),
    multi:true
  }]
})
export class ValueAccessorComponent implements OnInit,ControlValueAccessor {

  val = "" ;
  onChange:any = () =>{};
  onTouch:any = () =>{};

  constructor(
    private heroService: HeroService,
    private router:ActivatedRoute,
    private location: Location,
    private store: Store,

  ) { }
  ngOnInit(): void {

  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  writeValue(val: any): void {
    this.val = val;
    this.onChange(this.val);
    // this.onTouch(this.val)
    console.log("obj", this.val);
  }
  registerOnChange(fn: any): void {
   this.onChange = fn;
    console.log("registerOnChange",this.onChange);
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
    console.log("registerOnTouched",this.onTouch);
  }
  setDisabledState(isDisabled: boolean) {
  }

}
