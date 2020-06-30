import { Component,OnInit,ViewChild,OnChanges } from '@angular/core';
// import { element } from 'protractor';
import { Location } from '@angular/common';
import { Router,ActivatedRoute,Params,ActivatedRouteSnapshot } from '@angular/router'
import { Title } from '@angular/platform-browser';

import { trigger,state,style,animate,transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}

//ng build --prod --deploy-url /static