import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../service/user.service'
import { RoomService } from '../service/room.service'

import { LoginStruct } from '../data/userstruct'

import { ROUTES } from '../config/route'

import * as Global from '../data/global';

import { ElMessageService } from 'element-angular'

@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.component.html',
  styleUrls: ['./createroom.component.css']
})
export class CreateRoomComponent implements OnInit {
    User:any
    UserName:string
    NewRoomName:string
    isDataLoaded = false
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
            if (this.User.role == 'member') {
                this.message['warning']('房间权限不足')
                this.userservice.remove(this.userservice.key.loginInfo);
                this.router.navigate([ROUTES.login.route])
                return
            }
            this.UserName = this.User.nickname
        }
    }
    CreateRoom() {
        var NewRoom = {roomname:this.NewRoomName}
        this.roomservice.CreateRoom(NewRoom).subscribe(
            fb=>{
              console.log(fb)
              //this.Token = fb['Token']
              if (fb['code'] == 200) {
                this.message['success']('创建房间成功')
                if(this.User.role == 'admin') {
                    this.router.navigate([ROUTES.roomban.route])
                } else {
                    this.router.navigate([ROUTES.talkroom.route])
                }
              } else if (fb['code'] == 300) {
                this.message['error']('创建房间失败，房间已存在')
              } else {
                this.message['error']('创建房间失败，服务错误')
              }
            },
            err=>{
                console.log(err)
                this.message['error']('创建房间失败')
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
      ToUser() {
        this.router.navigate([ROUTES.userban.route])
      }
      ToRoom() {
        this.router.navigate([ROUTES.roomban.route])
      }
      ToUserRole() {
        this.router.navigate([ROUTES.userrole.route])
      }
      ToBackRoom() {
        if(this.User.role == 'admin') {
            this.router.navigate([ROUTES.roomban.route])
        } else {
            this.router.navigate([ROUTES.talkroom.route])
        }
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