import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../service/user.service'

import { UserStruct } from '../data/userstruct'

import { ROUTES } from '../config/route'

import { ElMessageService } from 'element-angular'

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateUserComponent implements OnInit {
    User:any
    UserInfo:UserStruct
    Id:string
    UserName:string
    NickName:string
    UserId:string
    Token:string
    CommentContent:string
    constructor(
      private userservice:UserService,
      private router:Router,
      private message: ElMessageService,
    ) {}
    ngOnInit() {
        this.User = this.userservice.get(this.userservice.key.loginInfo);
        if (this.User == null){
            this.message['warning']('清先登录')
            this.router.navigate([ROUTES.login.route])
        } else {
            this.UserName = this.User.nickname
        }
        this.UserInfo = new UserStruct
        if (this.UserId != null) {
          this.GetUser(this.UserId)
        } else {
          this.GetUser(this.User.id)
        }
    }
    GetUser(id){
        console.log(this.User)
        this.userservice.GetUser(id).subscribe(
          fb=>{
            console.log(fb)
            //this.Token = fb['Token']
            //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
            if (fb['code'] == 200) {
              this.UserInfo = fb['data']
              if (this.UserInfo.phone == '') {
                this.UserInfo.phone = '空'
              }
              if (this.UserInfo.label == '') {
                this.UserInfo.label = '空'
              }
              if (this.UserInfo.isban == '0') {
                this.UserInfo.isban = '正常'
              }else if (this.UserInfo.isban == '1') {
                this.UserInfo.isban = '已封禁'
              }
              this.message['success']('获取用户信息成功')
            } else {
              this.message['error']('获取用户信息失败')
            }
          },
          err=>{
              console.log(err)
              this.message['error']('获取用户信息失败')
          }
        )
    }
    ToTalkRoom() {
      this.router.navigate([ROUTES.talkroom.route])
    }
    UpdateUser() {
        var NewUserInfo = {id:this.UserInfo.id, nickname:this.UserInfo.nickname, phone:this.UserInfo.phone, label:this.UserInfo.label ,fonttype:this.UserInfo.fonttype ,fontcolor:this.UserInfo.fontcolor}
        this.userservice.UpdateUser(NewUserInfo).subscribe(
            fb=>{
                if (fb['code'] == 200) {
                    this.userservice.remove(this.userservice.key.loginInfo);
                    this.router.navigate([ROUTES.login.route])
                    this.message['success']('用户信息修改成功')
                  } else {
                    this.message['error']('用户信息修改失败，服务错误')
                  }
                },
                err=>{
                    console.log(err)
                    this.message['error']('用户信息修改失败，未知错误')
                }
              )
    }
    LogOut() {
        this.userservice.LogOut(this.User.token).subscribe(
          fb=>{
            console.log(fb)
            //this.Token = fb['Token']
            //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
            if (fb['code'] == 1001) {
              this.userservice.remove(this.userservice.key.loginInfo);
              this.router.navigate([ROUTES.login.route])
              this.message['warning']('用户过期，请重新登录')
              return
            }
            if (fb['code'] == 200) {
              this.userservice.remove(this.userservice.key.loginInfo);
              this.router.navigate([ROUTES.login.route])
              this.message['success']('退出用户成功')
            } else {
              this.message['error']('退出用户失败，未知错误')
            }
          },
          err=>{
              console.log(err)
              this.message['error']('退出用户失败，服务错误')
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
