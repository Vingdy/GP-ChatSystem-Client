import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../service/user.service'
import { RoomService } from '../service/room.service'

import { LoginStruct } from '../data/userstruct'

import { ROUTES } from '../config/route'

import * as Global from '../data/global';

import { ElMessageService } from 'element-angular'

@Component({
  selector: 'app-findfriend',
  templateUrl: './findfriend.component.html',
  styleUrls: ['./findfriend.component.css']
})
export class FindFriendComponent implements OnInit {
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
        private roomservice:RoomService,
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
    }
    FindUser() {
        this.userservice.FindUser(this.findstring).subscribe(
            fb=>{
              console.log(fb)
              //this.Token = fb['Token']
              if (fb['code'] == 200) {
                  this.UserList = fb['data']
                  console.log(this.UserList)
                  if(this.UserList == []) {
                    this.message['success']('用户查找成功')
                      return
                  }
                  for(var i = 0; i < this.UserList.length; i++) {
                    if (this.UserList[i].isban == '0') {
                        this.UserList[i].isban = '正常'
                      }else if (this.UserList[i].isban == '1') {
                        this.UserList[i].isban = '已封禁'
                      }
                  }
                this.message['success']('用户查找成功')
              } else {
                this.message['error']('用户查找失败，服务错误')
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