import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../service/user.service'
import { FriendService } from '../service/friend.service'

import { LoginStruct } from '../data/userstruct'

import { ROUTES } from '../config/route'

import * as Global from '../data/global';

import { ElMessageService } from 'element-angular'

@Component({
  selector: 'app-friend',
  templateUrl: './passfriend.component.html',
  styleUrls: ['./passfriend.component.css']
})
export class PassFriendComponent implements OnInit {
    User:any
    UserName:string
    UserList:any
    isDataLoaded = false
    findstring:string
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
        this.UserList = []
        this.GetCheckFriend()
        console.log(this.UserList)
    }
    NewFriend(username, nickname) {
        var Friend={username1:username, nickname1:nickname, id2:this.User.id, username2:this.User.username, nickname2:this.User.nickname, label2:this.User.label}
        this.friendservice.NewFriend(Friend).subscribe(
          fb=>{
            console.log(fb)
            if (fb['code'] == 200) {
                var a = fb['data']
                this.SecondPassFriend(a)
            }
          },
          err=>{
              console.log(err)
          }
        )
      }
      SecondPassFriend(id) {
        var check = {id:id}
        this.friendservice.PassFriend(check).subscribe(
            fb=>{
              console.log(fb)
              //this.Token = fb['Token']
              if (fb['code'] == 200) {
                this.GetCheckFriend2()
                this.message['success']('好友申请已同意')
              } else if(fb['code'] == 601) {
                this.message['error']('好友申请通过失败，列表不存在')
              } else {
                this.message['error']('好友申请通过失败，服务错误')
              }
            },
            err=>{
                console.log(err)
                this.message['error']('好友申请通过失败，未知错误')
            }
        ) 
    }
    FirstPassFriend(id, username, nickname) {
        var check = {id:id}
        console.log(username, nickname)
        this.friendservice.PassFriend(check).subscribe(
            fb=>{
              console.log(fb)
              //this.Token = fb['Token']
              if (fb['code'] == 200) {
                this.NewFriend(username, nickname)
              } else if(fb['code'] == 601) {
                this.message['error']('好友申请通过失败，列表不存在')
              } else {
                this.message['error']('好友申请通过失败，服务错误')
              }
            },
            err=>{
                console.log(err)
                this.message['error']('好友申请通过失败，未知错误')
            }
        ) 
    }
    UnPassFriend(id) {
        var check = {id:id}
        this.friendservice.PassFriend(check).subscribe(
            fb=>{
              console.log(fb)
              //this.Token = fb['Token']
              if (fb['code'] == 200) {
                  this.GetCheckFriend()
                this.message['success']('好友申请已拒绝')
              } else if(fb['code'] == 601) {
                this.message['error']('好友申请拒绝失败，列表不存在')
              } else {
                this.message['error']('好友申请拒绝失败，服务错误')
              }
            },
            err=>{
                console.log(err)
                this.message['error']('好友申请拒绝失败，未知错误')
            }
        ) 
    }
    GetCheckFriend2() {
        this.friendservice.GetCheckFriend(this.User.username).subscribe(
            fb=>{
              console.log(fb)
              //this.Token = fb['Token']
              if (fb['code'] == 200) {
                  this.UserList = fb['data']
                  console.log(this.UserList)
                  if(this.UserList == []) {
                      return
                  }
              }
            },
            err=>{
                console.log(err)
            }
        )
    }
    GetCheckFriend() {
        this.friendservice.GetCheckFriend(this.User.username).subscribe(
            fb=>{
              console.log(fb)
              //this.Token = fb['Token']
              if (fb['code'] == 200) {
                  this.UserList = fb['data']
                  console.log(this.UserList)
                  if(this.UserList == []) {
                    this.message['success']('验证好友查找成功')
                      return
                  }
                this.message['success']('验证好友查找成功')
              } else {
                this.message['error']('验证好友查找失败，服务错误')
              }
            },
            err=>{
                console.log(err)
                this.message['error']('用户查找失败，未知错误')
            }
        )
    }
    ToUser(i){
        this.router.navigate([ROUTES.user.route], {queryParams:{'userid':this.UserList[i].id}})
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
}