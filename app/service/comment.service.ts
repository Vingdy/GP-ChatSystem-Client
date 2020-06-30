import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { HttpClient } from '@angular/common/http'

import { LoginStruct } from '../data/userstruct'

import { SITE_HOST_URL, GET_COMMENT_LIST, NEW_COMMENT } from '../config/api';

@Injectable()
export class CommentService {
    constructor(
        private http: Http,
        private httpclient:HttpClient
    ) { }
    GetCommentList(username){
        console.log(username)
        return this.httpclient.get(SITE_HOST_URL+GET_COMMENT_LIST+"?username="+username);
    }
    NewComment(data){
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+NEW_COMMENT,JSON.stringify(data));
    }
}