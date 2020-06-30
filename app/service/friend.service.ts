import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { HttpClient } from '@angular/common/http'

import { LoginStruct } from '../data/userstruct'

import { SITE_HOST_URL, GET_FRIEND_LIST, NEW_FRIEND, PASS_FRIEND, UNPASS_FRIEND, GET_CHECK_FRIEND } from '../config/api';

@Injectable()
export class FriendService {
    constructor(
        private http: Http,
        private httpclient:HttpClient
    ) { }
    GetFriendList(username){
        //console.log(data)
        return this.httpclient.get(SITE_HOST_URL+GET_FRIEND_LIST+"?username="+username);
    }
    NewFriend(data){
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+NEW_FRIEND,JSON.stringify(data));
    }
    PassFriend(data){
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+PASS_FRIEND,JSON.stringify(data));
    }
    UnPassFriend(data){
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+UNPASS_FRIEND,JSON.stringify(data));
    }
    GetCheckFriend(username){
        console.log(username)
        return this.httpclient.get(SITE_HOST_URL+GET_CHECK_FRIEND+"?username="+username);
    }
}