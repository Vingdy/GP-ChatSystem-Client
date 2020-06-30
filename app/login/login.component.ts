import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../service/user.service'

import { LoginStruct } from '../data/userstruct'

import { ROUTES } from '../config/route'

import * as Global from '../data/global';

import { ElMessageService } from 'element-angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    NewLogin:LoginStruct
    UserName:string
    PassWord:string
    constructor(
        private userservice:UserService,
        private activatedroute:ActivatedRoute,
        private router:Router,
        private message: ElMessageService,
        ) {}
    ngOnInit() {
      this.UserName=''
      this.PassWord=''
        this.activatedroute.queryParams.subscribe(params => {
            this.UserName = params['username'];
            this.PassWord = params['password'];
        })
    }
    Login(){
        this.NewLogin={username:this.UserName,password:this.PassWord}
        console.log(this.NewLogin)
        if(this.UserName==undefined) {
          this.message['error']('用户长度为空，请检查')
          return
        }
        if(this.PassWord==undefined) {
          this.message['error']('密码长度为空，请检查')
          return
        }
        this.userservice.Login(this.NewLogin).subscribe(
          fb=>{
            console.log(fb)
            if (fb['code'] == 200) {
              this.userservice.set(this.userservice.key.loginInfo,
                fb['data'],
                this.userservice.key.loginDateRange)
              this.message['success']('登录成功')
              if (fb['data']['role'] == 'admin') {
                this.router.navigate([ROUTES.userrole.route])
              } else {
                this.router.navigate([ROUTES.talkroom.route])
              }
            } else if (fb['code'] == 301){
              this.message['error']('登录失败，账号不存在')
            } else if (fb['code'] == 302){
              this.message['error']('登录失败，密码错误')
            } else if (fb['code'] == 303){
              this.message['error']('登录失败，账号已被封禁')
            } else {
              this.message['error']('登录失败，服务错误')
            }
            /*if(fb["code"]==1000){
              console.log(fb["code"])
              this.sessionservice.GetRole().subscribe(
                fb=>{
                  console.log(fb["code"])
                    if(fb["code"]!=1000){
                      this.Role=0
                    }else{
                        this.Role=fb["data"]
                        LoginStatus.isLogin=true;
                        window.location.reload();
                        this.toastrservice.success('登陆成功')
                    }
                },
                err=>{
                  console.log("test")
                    this.Role=0
                })
            }else{
              this.toastrservice.error('登陆失败')
            }*/
          },
          err=>{
              console.log(err)
              this.message['error']('登录失败')
            //this.toastrservice.error('登陆失败')
          }
        )
      }
    ToRegister() {
        this.router.navigate([ROUTES.register.route])
    }
}
