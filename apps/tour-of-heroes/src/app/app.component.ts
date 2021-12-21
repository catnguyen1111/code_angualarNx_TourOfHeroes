/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router,Event } from '@angular/router';
import {AuthService} from '../../../../libs/services/src/lib/auth.service'

@Component({
  selector: 'tour-of-heroes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tour-of-heroes';
  loading: boolean = false;
  check :boolean = false;
  timeout: any;
  constructor(private authService: AuthService,  private router: Router,){
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

         }, 1);
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

  }
  logout(){
    localStorage.clear();
    this.authService.logout();
    this.authService.logoutUser();
    console.log("Logout successfully")
  }

}
