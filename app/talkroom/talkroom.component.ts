import { Component, OnInit, NgZone } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { RoomService } from '../service/room.service'
import { UserService } from '../service/user.service'
import { HistoryService } from '../service/history.service'

import { UserStruct } from '../data/userstruct'
import { RoomStruct } from '../data/roomstruct'
import { MessageStruct } from '../data/messagestruct'

import { $WebSocket } from 'angular2-websocket/angular2-websocket'
import { webSocket } from 'rxjs/webSocket';
import { getLocaleDateTimeFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http'

import { ROUTES } from '../config/route'
import { WS_HOST_URL, WS_CHAT } from '../config/api'

import { ElMessageService } from 'element-angular'

@Component({
  selector: 'app-talkroom',
  templateUrl: './talkroom.component.html',
  styleUrls: ['./talkroom.component.css']
})
export class TalkRoomComponent implements OnInit {
  History:any
    NewRoom:string
    Options:any
    RoomList = []
    Index:number = 0
    User:any
    MessageData = []
    ws: WebSocket;//定义websocket
    UserName:string
    RoomName:string
    MessageContent:string
    NowMember = []
    isDataLoaded = false
    newmsgsave:any
    constructor(
        private router:Router,
        private activatedroute:ActivatedRoute,
        private httpclient:HttpClient,
        private roomservice:RoomService,
        private message: ElMessageService,
        private userservice:UserService,
        private historyservice:HistoryService,
    ) {}
    ngOnInit() {
      this.User = this.userservice.get(this.userservice.key.loginInfo);
      if (this.User == null){
        this.router.navigate([ROUTES.login.route])
      } else {
        this.UserName = this.User.nickname
        this.GetUseRoomList()
        this.connectWs()
      }
      console.log(this.User)
      console.log(this.Options)
      /*this.activatedroute.queryParams.subscribe(params => {
            this.Token = params['Token'];
        })*/

        //this.sendMsg()
    }
    GetHistory(roomname) {
        this.historyservice.GetHistoryList(roomname).subscribe(
          fb=>{
            console.log(fb)
            //this.Token = fb['Token']
            //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
            if (fb['code'] == 200) {
              this.History = fb['data']
              console.log(this.History)
              if(this.History != null) {
                for (var i = this.History.length-1; i >= 0; i--) {
                  var newmsg = {
                  fontcolor: this.History[i].fontcolor,
                  fonttype: this.History[i].fonttype,
                  label: this.History[i].label,
                  message: this.History[i].chat,
                  name: this.History[i].username,
                  roomname: this.History[i].roomname,
                  time: this.History[i].time,
                  type: "message",
                }
                  this.MessageData.push(newmsg)
                }
              }
              this.PushMsg(this.newmsgsave)
              console.log(this.History, this.MessageData)
              this.message['success']('获取历史消息成功')
            } else {
              this.message['error']('获取历史消息失败，服务错误')
            }
          },
          err=>{
              console.log(err)
              this.message['error']('获取历史消息失败，未知错误')
          }
        )
    }czxzcx
    
    connectWs() {
        if (this.ws != null) { this.ws.close() };
        this.ws = new WebSocket(WS_HOST_URL+WS_CHAT,[this.User.token]);
        let that  = this;
        this.ws.onopen = function (event) {
                //socket 开启后执行，可以向后端传递信息
                
                console.log(event)
                console.log("连接成功")
                //that.ws.send('sonmething');
                
        }
        this.ws.onmessage = function (event) {
                //socket 获取后端传递到前端的信息
                console.log(event)
                let newmsg = new MessageStruct
                newmsg = JSON.parse(event.data)
                console.log(newmsg)
                that.newmsgsave = newmsg
                that.NowMember = newmsg.nowmember
                /*if (newmsg.nowmember != null) {
                  for (var i = 0; i < newmsg.nowmember.length; i++) {
                    var member = {name:newmsg.nowmember[i]}
                    that.NowMember.push(member)
                  }
                }*/

                if(newmsg.type=='join') {
                  that.RoomName = newmsg.roomname
                  console.log(that.MessageData, that.MessageData.length == 0)
                  if (that.MessageData.length == 0) {
                    that.History = []
                    that.GetHistory(that.RoomName)
                  } else {
                    that.PushMsg(that.newmsgsave)
                  }
                } else {
                  that.PushMsg(that.newmsgsave)
                }
                console.log(that.User.token, that.MessageData, that.NowMember)
                //that.ws.send('sonmething');
                
                
        }
        this.ws.onerror = function (event) {
            
            console.log(event)
                //socket error信息
                
                
        }
        this.ws.onclose = function (event) {
            
            console.log(event)
                //socket 关闭后执行
               
        }
    }
    PushMsg(newmsg) {
      this.MessageData.push(newmsg)
    }
    Send(data) {
      if(this.MessageContent=="") {
        this.message['warning']('请勿发送空消息')
        return
      }
        let newmsg = new MessageStruct
        newmsg.type = 'message'
        newmsg.name = this.UserName
        newmsg.message = data
        console.log(JSON.stringify(newmsg))
        this.ws.send(JSON.stringify(newmsg))
        this.MessageContent = ""
    }
    sendMsg() {
        //新建连接
         var ws = new $WebSocket("ws://127.0.0.1:8080/ws/chat");
        //打开连接
         ws.onOpen(function () {
           console.log('连接成功')
             ws.send('发送的消息内容').subscribe(
               (msg) => {
               //连接成功此处打印成功的提示
                 console.log("next", msg.data);
               },
               (msg) => {
                //连接失败则打印此信息
                 console.log("error", msg);
               },
               () => {
                 //不管有没有连接成功必须执行到此处
                 console.log("complete");
                 // 可在此处关闭连接，由你websocket实现的具体功能决定
                 // ws.close(false);    // close
                 // ws.close(true);    // close immediately
               }
             );
         });
        //接收服务器返回的信息就另外写个
         ws.onMessage(
           (msg: MessageEvent) => {
             console.log('recriveMsg',msg)
             let newmsg = new MessageStruct
             newmsg = JSON.parse(msg.data)
             console.log(newmsg)
             this.MessageData.push(newmsg)
             this.Index++
             console.log(this.User.token, this.MessageData)
           },
           //{ autoApply: false }
         );
       }
       ChangeRoom(data) {
          var NewRoom = data[0]
          let newmsg = new MessageStruct
          newmsg.type = 'change'
          newmsg.name = this.UserName
          newmsg.message = NewRoom
          console.log(JSON.stringify(newmsg))
          this.MessageData = []
          this.ws.send(JSON.stringify(newmsg))
       }
       GetUseRoomList() {
        this.roomservice.GetUseRoomList().subscribe(
          fb=>{
            console.log(fb)
            //this.Token = fb['Token']
            //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
            if (fb['code'] == 200) {
              this.Options = []
              this.RoomList = fb['data']
              console.log(this.RoomList)
              for (var i = 0; i < this.RoomList.length; i++) {
                var temp = {
                  value:this.RoomList[i].roomname,
                  label:this.RoomList[i].roomname,
                }
                this.Options.push(temp)
              }
              console.log(this.Options)
              this.isDataLoaded = true
              this.message['success']('获取房间信息成功')
            } else {
              this.message['error']('获取房间信息失败')
            }
          },
          err=>{
              console.log(err)
              this.message['error']('获取房间信息失败')
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
            this.ws.close()
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
      this.ws.close()
    }
    ToUserInfo() {
      this.router.navigate([ROUTES.user.route])
      this.ws.close()
    }
    ToFriend() {
      this.router.navigate([ROUTES.friend.route])
      this.ws.close()
    }
}
