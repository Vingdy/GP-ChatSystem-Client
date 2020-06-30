import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../../service/user.service'
import { RoomService } from '../../service/room.service'

import { LoginStruct } from '../../data/userstruct'

import { ROUTES } from '../../config/route'

import * as Global from '../../data/global';

import { ElMessageService } from 'element-angular'

@Component({
  selector: 'app-roomban',
  templateUrl: './roomban.component.html',
  styleUrls: ['./roomban.component.css']
})
export class RoomBanComponent implements OnInit {
    User:any
    RoomList = []
    UserName:string
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
            if (this.User.role != 'admin') {
                this.message['warning']('房间权限不足')
                this.userservice.remove(this.userservice.key.loginInfo);
                this.router.navigate([ROUTES.login.route])
                return
            }
            this.UserName = this.User.nickname
            this.GetRoomList()
            console.log(this.RoomList)
        }
    }
    GetRoomList() {
        this.roomservice.GetRoomList().subscribe(
            fb=>{
                console.log(fb)
                //this.Token = fb['Token']
                //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
                if (fb['code'] == 200) {
                this.RoomList = fb['data']
                if (this.RoomList.length == 0) {
                    this.message['success']('获取房间信息成功')
                    return
                }
                for (var i = 0; i < this.RoomList.length; i++) {
                    console.log(this.RoomList[i])
                    if(this.RoomList[i].isban == '1') {
                        this.RoomList[i].isban = false
                    } else {
                        this.RoomList[i].isban = true
                    }
                    console.log(this.RoomList[i])
                }
                this.message['success']('获取房间信息成功')
                } else {
                this.message['error']('获取房间列表失败，服务错误')
                }
            },
            err=>{
                console.log(err)
                this.message['error']('获取房间列表失败，未知错误')
            }
        )
    }
    BanChange(i) {
        console.log(this.RoomList[i])
        var ChangeRoom = {id:this.RoomList[i].id}
        if (this.RoomList[i].isban) {
            this.roomservice.BanRoom(ChangeRoom).subscribe(
                fb=>{
                    console.log(fb)
                    //this.Token = fb['Token']
                    //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.RoomName,'password':this.PassWord}})
                    if (fb['code'] == 200) {
                        this.RoomList[i].isban = !this.RoomList[i].isban
                        this.message['success']('封禁房间成功')
                    } else {
                        this.message['error']('封禁房间失败，服务错误')
                    }
                },
                err=>{
                    console.log(err)
                    this.message['error']('封禁房间失败，未知错误')
                }
            )
        } else {
            this.roomservice.CancelBanRoom(ChangeRoom).subscribe(
                fb=>{
                    console.log(fb)
                    //this.Token = fb['Token']
                    //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.RoomName,'password':this.PassWord}})
                    if (fb['code'] == 200) {
                        this.RoomList[i].isban = !this.RoomList[i].isban
                        this.message['success']('取消封禁房间成功')
                    } else {
                        this.message['error']('取消封禁房间失败，服务错误')
                    }
                },
                err=>{
                    console.log(err)
                    this.message['error']('取消封禁房间失败，未知错误')
                }
            )
        }
        return
    }
    LogOut() {
        this.userservice.LogOut(this.User.token).subscribe(
          fb=>{
            console.log(fb)
            //this.Token = fb['Token']
            //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
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
      ToCreateRoom() {
        this.router.navigate([ROUTES.createroom.route])
      }
}