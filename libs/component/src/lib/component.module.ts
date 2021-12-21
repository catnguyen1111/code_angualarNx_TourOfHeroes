/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes/heroes.component';
// import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroDetailComponent } from '../../../component/src/lib/hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {HeroState} from '../../../store/src/lib/hero.state'
import {InmemorydataService} from '../../../../libs/services/src/lib/inmemorydata.service'
import { NgxsModule } from '@ngxs/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { PopupComponent } from './popup/popup.component';
import {ValueAccessorModule} from '../../../component/src/lib/value-accessor.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthGuard} from '../../../guard/src/lib/auth.guard'
import {AuthAdminGuard} from '../../../guard/src/lib/auth-admin.guard'
import {ResolveGuard} from '../../../guard/src/lib/resolve.guard'
import { CommonComponent } from './component.component';
import { AuthService } from '../../../services/src/lib/auth.service';
import { BrowserModule } from '@angular/platform-browser';
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
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    HttpClientInMemoryWebApiModule.forRoot(
    InmemorydataService, { dataEncapsulation: false }),
    NgxsModule.forRoot([HeroState]),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    ValueAccessorModule,
    CommonModule

  ],
  declarations: [
    CommonComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    DashboardComponent,
    LoginComponent,
    MessagesComponent,
    PopupComponent,
  ],
  exports: [
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    DashboardComponent,
    LoginComponent,
    MessagesComponent,
    PopupComponent,
    // ValueAccessorModule,
    CommonComponent

  ],
  providers: [AuthService,ResolveGuard],
  bootstrap: [CommonComponent],
  entryComponents: [PopupComponent],
})
export class ComponentModule {}
