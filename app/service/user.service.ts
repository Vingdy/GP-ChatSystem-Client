import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { UserStruct } from '../data/userstruct'
import { BehaviorSubject, Observable } from 'rxjs';

import { SITE_HOST_URL, LOGIN, REGISTER, LOGOUT, GET_ONLINE, FIND_USER, UPDATE_PWD, GET_ONE_USER, UPDATE_USER, GET_USER_LIST, BAN_USER, CANCEL_BAN_USER, UP_USER_ROLE, DOWN_USER_ROLE } from '../config/api';

@Injectable()
export class UserService {
    key:any = {
        //辅助
        "expiredTime": "EXPIRED:TIME",
        "expiredStartTime": "EXPIRED:START:TIME",
     
        //全局使用
        //用户信息
        "loginInfo": "LOGIN_INFO",
        "userInfo": "USER_INFO",
        // 用户信息期限
        'loginDateRange':5*60*60*1000 // 登陆限制默认未5小时，转成毫秒 2小时 = 2*60*60*1000
      }
     
      /**
     * 设置缓存
     * @param key
     * @param value
     * @param expiredTimeMS  过期时间，单位ms
     */
      set(key:string, value:string, expiredTimeMS:any):void {
        // console.log("$cache set: key=" + key + " value = " + value + " expiredTimeMS = " + expiredTimeMS)
        if ((expiredTimeMS == 0) || (expiredTimeMS == null)) {
          localStorage.setItem(key, value);
        }
        else {
          localStorage.setItem(key, JSON.stringify(value));
          localStorage.setItem(key + this.key.expiredTime, expiredTimeMS);
          localStorage.setItem(key + this.key.expiredStartTime, Date.now().toString());
        }
      }
    /**
       *  获取键
       * @param key
       * @returns {*} key存在，返回对象；不存在，返回null
       */
      get(key:string):any{
        console.log(key)
        const expiredTimeMS = localStorage.getItem(key + this.key.expiredTime);
        const expiredStartTime = localStorage.getItem(key + this.key.expiredStartTime);
        const curTime = new Date().getTime();
     
        const sum = Number(expiredStartTime) + Number(expiredTimeMS);
     
        if ((sum) > curTime) {
          // console.log("$cache-缓存[" + key + "]存在！");
          return JSON.parse(localStorage.getItem(key));
        }
        else {
          // console.log("$cache-缓存[" + key + "]不存在！");
          this.remove(key);
          return null;
        }
      }
     
      /**
       *  移除键
       * @param key
       */
      remove(key:string):void{
        localStorage.removeItem(key);
        localStorage.removeItem(key + this.key.expiredTime);
        localStorage.removeItem(key + this.key.expiredStartTime);
      }
     
      /**
       * 对键重新更新过期时间
       * @param key
       * @param expiredTimeMS  过期时间ms
       */
      expired(key:string, expiredTimeMS:any):void{
        if (this.get(key) != null) {
          localStorage.setItem(key + this.key.expiredTime, expiredTimeMS);
        }
      }
      /**
       * 清除所有缓存
       */
      clear():void{
        localStorage.clear();
      }
    constructor(
        private http: Http,
        private httpclient:HttpClient
    ) { 
        
    }
    Login(data){
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+LOGIN,JSON.stringify(data));
    }
    LogOut(token) {
        const httpOptions = {
            headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'AccessToken': token
            })
        }
        return this.httpclient.get(SITE_HOST_URL+LOGOUT, httpOptions);
    }
    Register(data){
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+REGISTER,JSON.stringify(data));
    }
    GetOnline() {
        return this.httpclient.get(SITE_HOST_URL+GET_ONLINE);
    }
    GetUser(data){
        console.log(data)
        return this.httpclient.get(SITE_HOST_URL+GET_ONE_USER+"?id="+data);
    }
    FindUser(data){
        console.log(data)
        return this.httpclient.get(SITE_HOST_URL+FIND_USER+"?findstring="+data);
    }
    UpdateUser(data){
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+UPDATE_USER,JSON.stringify(data));
    }
    UpdatePwd(data){
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+UPDATE_PWD,JSON.stringify(data));
    }
    GetUserList() {
        return this.httpclient.get(SITE_HOST_URL+GET_USER_LIST);
    }
    BanUser(data){
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+BAN_USER,JSON.stringify(data));
    }
    CancelBanUser(data){
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+CANCEL_BAN_USER,JSON.stringify(data));
    }
    UpUserRole(data){
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+UP_USER_ROLE,JSON.stringify(data));
    }
    DownUserRole(data){
        console.log(data)
        return this.httpclient.post(SITE_HOST_URL+DOWN_USER_ROLE,JSON.stringify(data));
    }
}