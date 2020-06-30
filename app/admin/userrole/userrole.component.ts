import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../../service/user.service'

import { LoginStruct } from '../../data/userstruct'

import { ROUTES } from '../../config/route'

import * as Global from '../../data/global';

import { ElMessageService } from 'element-angular'

@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.css']
})
export class UserRoleComponent implements OnInit {
    User:any
    UserList = []
    UserName:string
    constructor(        
        private router:Router,
        private activatedroute:ActivatedRoute,
        private message: ElMessageService,
        private userservice:UserService,
    ) {}
    ngOnInit() {
        this.User = this.userservice.get(this.userservice.key.loginInfo);
        if (this.User == null){
            this.message['warning']('清先登录')
            this.router.navigate([ROUTES.login.route])
        } else {
            if (this.User.role != 'admin') {
                this.message['warning']('用户权限不足')
                this.userservice.remove(this.userservice.key.loginInfo);
                this.router.navigate([ROUTES.login.route])
                return
            }
            this.UserName = this.User.nickname
            this.GetUserList()
            console.log(this.UserList)
        }
    }
    GetUserList() {
        this.userservice.GetUserList().subscribe(
            fb=>{
                console.log(fb)
                //this.Token = fb['Token']
                //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
                if (fb['code'] == 200) {
                this.UserList = fb['data']
                if (this.UserList.length == 0) {
                    this.message['success']('获取用户信息成功')
                    return
                }
                for (var i = 0; i < this.UserList.length; i++) {
                    if(this.UserList[i].role == 'member') {
                        this.UserList[i].role = false
                    }
                    if(this.UserList[i].role == 'manager') {
                        this.UserList[i].role = true
                    }
                }
                this.message['success']('获取用户信息成功')
                } else {
                this.message['error']('获取用户列表失败，服务错误')
                }
            },
            err=>{
                console.log(err)
                this.message['error']('获取用户列表失败，未知错误')
            }
        )
    }
    RoleChange(i) {
        console.log(this.UserList[i])
        var ChangeUser = {id:this.UserList[i].id}
        if (!this.UserList[i].role) {
            this.userservice.UpUserRole(ChangeUser).subscribe(
                fb=>{
                    console.log(fb)
                    //this.Token = fb['Token']
                    //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
                    if (fb['code'] == 200) {
                        this.UserList[i].role = !this.UserList[i].role
                        this.message['success']('升级用户权限成功')
                    } else {
                        this.message['error']('升级用户权限失败，服务错误')
                    }
                },
                err=>{
                    console.log(err)
                    this.message['error']('升级用户权限失败，未知错误')
                }
            )
        } else {
            this.userservice.DownUserRole(ChangeUser).subscribe(
                fb=>{
                    console.log(fb)
                    //this.Token = fb['Token']
                    //this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
                    if (fb['code'] == 200) {
                        this.UserList[i].role = !this.UserList[i].role
                        this.message['success']('降低用户权限成功')
                    } else {
                        this.message['error']('降低用户权限失败，服务错误')
                    }
                },
                err=>{
                    console.log(err)
                    this.message['error']('降低用户权限失败，未知错误')
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
      ToUser() {
        this.router.navigate([ROUTES.userban.route])
      }
      ToRoom() {
        this.router.navigate([ROUTES.roomban.route])
      }
      ToUserRole() {
        this.router.navigate([ROUTES.userrole.route])
      }
}