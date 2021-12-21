/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {HeroState} from '../../../../libs/store/src/lib/hero.state'
import {InmemorydataService} from '../../../../libs/services/src/lib/inmemorydata.service'

import { NgxsModule } from '@ngxs/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { LoginComponent } from './login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MessagesComponent } from './messages/messages.component';
import { PopupComponent } from './popup/popup.component';

import { ValueAccessorModule } from './value-accessor/value-accessor.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ResolveGuard} from '../../../../libs/guard/src/lib/resolve.guard'
import {AuthService} from '../../../../libs/services/src/lib/auth.service'
import {AuthGuard} from '../../../../libs/guard/src/lib/auth.guard'
import {AuthAdminGuard} from '../../../../libs/guard/src/lib/auth-admin.guard'

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
const routes: Routes = [
  {path:'',redirectTo : '',pathMatch : 'full'},
  {path:'login',component:LoginComponent,canDeactivate:[AuthGuard]},
  {path:'heroes',component:HeroesComponent,canActivate :[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate :[AuthGuard]},
  {path:'detail/:id',component:HeroDetailComponent,canActivate :[AuthAdminGuard],
  resolve:{
    data:ResolveGuard,
  }}
];
@NgModule({
  declarations: [AppComponent,
    NxWelcomeComponent,
    LoginComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroSearchComponent,
    MessagesComponent,
    PopupComponent,
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ValueAccessorModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    HttpClientInMemoryWebApiModule.forRoot(
    InmemorydataService, { dataEncapsulation: false }),
    NgxsModule.forRoot([HeroState]),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,




  ],
  providers: [AuthService,ResolveGuard],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent],
})
export class AppModule {}


