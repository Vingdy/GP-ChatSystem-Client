import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { HttpClient } from '@angular/common/http'

import { LoginStruct } from '../data/userstruct'

import { SITE_HOST_URL,GET_ROOM_LIST, GET_USE_ROOM_LIST, BAN_ROOM, CANCEL_BAN_ROOM, CREATE_ROOM } from '../config/api';

@Injectable()
export class RoomService {
    constructor(
        private http: Http,
        private httpclient:HttpClient
    ) { }
    GetUseRoomList(){
        //console.log(data)
        return this.httpclient.get(SITE_HOST_URL+GET_USE_ROOM_LIST);
    }
    GetRoomList(){
        //console.log(data)
        return this.httpclient.get(SITE_HOST_URL+GET_ROOM_LIST);
    }
    BanRoom(data){
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+BAN_ROOM,JSON.stringify(data));
    }
    CancelBanRoom(data){
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+CANCEL_BAN_ROOM,JSON.stringify(data));
    }
    CreateRoom(data) {
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+CREATE_ROOM,JSON.stringify(data));  
    }
}