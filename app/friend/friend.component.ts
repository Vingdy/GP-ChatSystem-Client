import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../service/user.service'
import { RoomService } from '../service/room.service'
import { FriendService } from '../service/friend.service'

import { LoginStruct } from '../data/userstruct'

import { ROUTES } from '../config/route'

import * as Global from '../data/global';

import { ElMessageService } from 'element-angular'

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
    User:any
    UserName:string
    FriendList:any
    OnlineList:any
    Online = []
    Offline = []
    isDataLoaded = false
    constructor(        
        private router:Router,
        private activatedroute:ActivatedRoute,
        private message: ElMessageService,
        private userservice:UserService,
        private friendservice:FriendService,
    ) {}
    ngOnInit() {
        this.User = this.userservice.get(this.userservice.key.loginInfo);
        if (this.User == null){
            this.message['warning']('清先登录')
            this.router.navigate([ROUTES.login.route])
        } else {
            this.UserName = this.User.nickname
        }
        this.Online = []
        this.Offline = []
        this.GetFriendList()
    }
    Handle() {
        for(var i = 0; i < this.FriendList.length; i++) {
            var online = false
            if (this.OnlineList != null) {
                for(var j = 0; j < this.OnlineList.length; j++) {
                    if(this.FriendList[i].id == this.Online[j]) {
                        online = true
                        break
                    }
                }
            }
            if(online) {
                this.Online.push(this.FriendList[i])
            } else {
                this.Offline.push(this.FriendList[i])
            }
        }
        console.log(this.Online)
        console.log(this.Offline)
    }
    ToOnlineUser(i){
        this.router.navigate([ROUTES.user.route], {queryParams:{'userid':this.Online[i].friendid}})
    }
    ToOfflineUser(i){
        this.router.navigate([ROUTES.user.route], {queryParams:{'userid':this.Offline[i].friendid}})
    }
    GetOnline() {
        this.userservice.GetOnline().subscribe(
            fb=>{
              console.log(fb)
              //this.Token = fb['Token']
              //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
              if (fb['code'] == 200) {
                this.OnlineList = []
                this.OnlineList = fb['data']
                console.log(this.OnlineList)
                if(this.OnlineList == null) {
                    this.Handle()
                  this.message['success']('获取在线用户信息成功')
                  return
                }
                console.log(this.OnlineList)
                this.Handle()
                this.message['success']('获取在线用户信息成功')
              } else {
                this.message['error']('获取在线用户信息失败，服务错误')
              }
            },
            err=>{
                console.log(err)
                this.message['error']('获取在线用户信息失败，未知错误')
            }
          )
    }
    GetFriendList() {
        this.friendservice.GetFriendList(this.User.username).subscribe(
          fb=>{
            console.log(fb)
            //this.Token = fb['Token']
            //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
            if (fb['code'] == 200) {
              this.FriendList = []
              this.FriendList = fb['data']
              console.log(this.FriendList)
              if(this.FriendList == null) {
                this.message['success']('获取好友信息成功')
                return
              }
              this.GetOnline()
              console.log(this.FriendList)
              this.message['success']('获取好友信息成功')
            } else {
              this.message['error']('获取好友信息失败，服务错误')
            }
          },
          err=>{
              console.log(err)
              this.message['error']('获取好友信息失败，未知错误')
          }
        )
    }
    LogOut() {
        this.userservice.LogOut(this.User.token).subscribe(
          fb=>{
            console.log(fb)
            if (fb['code'] == 1001) {
                this.userservice.remove(this.userservice.key.loginInfo);
                this.router.navigate([ROUTES.login.route])
                this.message['warning']('用户过期，请重新登录')
                return
              }
            if (fb['code'] == 200) {
              this.userservice.remove(this.userservice.key.loginInfo);
              this.router.navigate([ROUTES.login.route])
              this.message['success']('退出房间成功')
            } else {
              this.message['error']('退出房间失败，未知错误')
            }
          },
          err=>{
              console.log(err)
              this.message['error']('退出房间失败，服务错误')
          }
        )
      }
      ToCreateRoom() {
        this.router.navigate([ROUTES.createroom.route])
      }
      ToUserInfo() {
        this.router.navigate([ROUTES.user.route])
      }
      ToFriend() {
        this.router.navigate([ROUTES.friend.route])
      }
      ToFindFriend() {
        this.router.navigate([ROUTES.findfriend.route])
      }
      ToPassFriend() {
        this.router.navigate([ROUTES.passfriend.route])
      }
}