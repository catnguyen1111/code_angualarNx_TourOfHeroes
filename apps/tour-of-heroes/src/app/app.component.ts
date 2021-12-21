/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tour-of-heroes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tour-of-heroes';

  constructor(){

  }
  ngOnInit(): void {

  }


}
