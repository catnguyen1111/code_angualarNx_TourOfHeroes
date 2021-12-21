import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
// import {HeroState} from '../../../../libs/store/src/lib/hero.state'
// import {InmemorydataService} from '../../../../libs/services/src/lib/inmemorydata.service'
// import { NgxsModule } from '@ngxs/store';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { PopupComponent } from './popup/popup.component';
import { ValueAccessorComponent } from './value-accessor/value-accessor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule],
  declarations: [
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    DashboardComponent,
    LoginComponent,
    MessagesComponent,
    PopupComponent,
    ValueAccessorComponent
  ],
  exports: [
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    DashboardComponent,
    LoginComponent,
    HttpClientModule,
    MessagesComponent,
    PopupComponent,
    ValueAccessorComponent,
    FormsModule,
    ReactiveFormsModule,


  ],
})
export class ComponentModule {}
