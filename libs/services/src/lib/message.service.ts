/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public message:string[] = [];
  constructor() { }
  add(message:string){
    this.message.push(message);
  }
  clear(){
    this.message = [];
  }
}
