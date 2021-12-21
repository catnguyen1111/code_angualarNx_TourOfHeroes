/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {ComponentModule} from '../../../../libs/component/src/lib/component.module'




@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {}


