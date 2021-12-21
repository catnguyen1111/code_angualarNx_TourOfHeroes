/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private _close$ = new Subject();
  public close$ = this._close$.asObservable();
  constructor() {}
  close(reason?:any){
    this._close$.next(reason);
  }
}
