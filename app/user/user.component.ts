import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../service/user.service'
import { FriendService } from '../service/friend.service'
import { CommentService } from '../service/comment.service'

import { UserStruct } from '../data/userstruct'

import { ROUTES } from '../config/route'

import { ElMessageService } from 'element-angular'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    User:any
    UserInfo:UserStruct
    Id:string
    UserName:string
    NickName:string
    UserId:string
    Token:string
    CommentContent:string
    isDataLoaded = false
    FriendList:any
    isFriend = false
    CommentList:any
    constructor(
      private userservice:UserService,
      private router:Router,
      private message: ElMessageService,
      private activatedroute:ActivatedRoute,
      private friendservice:FriendService,
      private commentservice:CommentService,
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
      this.activatedroute.queryParams.subscribe(params => {
        this.UserId = params['userid'];
      })
      if (this.UserId != null) {
        this.GetUser(this.UserId)
      } else {
        this.GetUser(this.User.id)
      }
    }
    NewComment() {
      var newcomment = {username:this.UserInfo.username, fromusername:this.User.username, fromnickname:this.User.nickname,comment:this.CommentContent,}
      this.commentservice.NewComment(newcomment).subscribe(
        fb=>{
          console.log(fb)
          //this.Token = fb['Token']
          //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
          if (fb['code'] == 200) {
            this.CommentList = fb['data']
            console.log(this.CommentList)
            this.GetCommentList()
            this.CommentContent = ""
            this.message['success']('添加评论成功')
          } else {
            this.message['error']('添加评论失败，服务错误')
          }
        },
        err=>{
            console.log(err)
            this.message['error']('添加评论失败，未知错误')
        }
      )
    }
    GetCommentList() {
      console.log(this.UserInfo)
        this.commentservice.GetCommentList(this.UserInfo.username).subscribe(
          fb=>{
            console.log(fb)
            //this.Token = fb['Token']
            //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
            if (fb['code'] == 200) {
              this.CommentList = fb['data']
              console.log(this.CommentList)
              this.message['success']('获取评论成功')
            } else {
              this.message['error']('获取评论失败，服务错误')
            }
          },
          err=>{
              console.log(err)
              this.message['error']('获取评论失败，未知错误')
          }
        )
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
              this.isDataLoaded = true
              this.GetFriendList()
              this.GetCommentList()
              this.message['success']('获取用户信息成功')
            } else {
              this.message['error']('获取用户信息失败，服务错误')
            }
          },
          err=>{
              console.log(err)
              this.message['error']('获取用户信息失败，未知错误')
          }
        )
    }
    GetFriendList() {
      console.log(this.UserInfo, this.UserInfo.username)
        this.friendservice.GetFriendList(this.UserInfo.username).subscribe(
          fb=>{
            console.log(fb)
            //this.Token = fb['Token']
            //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
            if (fb['code'] == 200) {
              this.FriendList = []
              this.FriendList = fb['data']
              if(this.FriendList == null) {
                this.message['success']('获取好友信息成功')
                return
              }
              for(var i = 0; i < this.FriendList.length; i++) {
                if((this.UserInfo.username == this.FriendList[i].username)||(this.UserInfo.username == this.FriendList[i].friendusername)) {
                  this.isFriend = true
                }
              }
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
    NewFriend() {
      var Friend={username1:this.UserInfo.username, nickname1:this.UserInfo.nickname, id2:this.User.id, username2:this.User.username, nickname2:this.User.nickname, label2:this.User.label}
      this.friendservice.NewFriend(Friend).subscribe(
        fb=>{
          console.log(fb)
          if (fb['code'] == 200) {
            this.message['success']('发送好友请求成功')
          } else if (fb['code'] == 600) {
            this.message['warning']('好友申请已存在')
          } else {
            this.message['error']('发送好友请求失败，服务错误')
          }
        },
        err=>{
            console.log(err)
            this.message['error']('发送好友请求失败，未知错误')
        }
      )
    }
    ToTalkRoom() {
      this.router.navigate([ROUTES.talkroom.route])
    }
    ToUpdatePwd() {
      this.router.navigate([ROUTES.updatepwd.route])
    }
    ToUpdateUser() {
      this.router.navigate([ROUTES.updateuser.route])
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
