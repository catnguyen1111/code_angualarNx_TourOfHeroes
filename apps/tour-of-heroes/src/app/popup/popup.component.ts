/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../../../../../libs/services/src/lib/alert.service';

@Component({
  selector: 'tour-of-heroes-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() data:any;


  confirms:any;
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    if(this.data === true){
      this.run();
    }

  }
  run(){

    this.confirms = confirm('Bạn chưa lưu dữ liệu vui lòng lưu dữ liệu');
    if(this.confirms === true){
      this.alertService.close()

    }
  }
}
