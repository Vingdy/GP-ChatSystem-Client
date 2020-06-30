import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { HttpClient } from '@angular/common/http'

import { LoginStruct } from '../data/userstruct'

import { SITE_HOST_URL, GET_HISTORY_LIST } from '../config/api';

@Injectable()
export class HistoryService {
    constructor(
        private http: Http,
        private httpclient:HttpClient
    ) { }
    GetHistoryList(name){
        console.log(name)
        return this.httpclient.get(SITE_HOST_URL+GET_HISTORY_LIST+"?roomname="+name);
    }
}