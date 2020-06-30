import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../service/user.service'

import { RegisterStruct } from '../data/userstruct'

import { ROUTES } from '../config/route'

import { ElMessageService } from 'element-angular'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
    NewUser:RegisterStruct
    UserName:string
    NickName:string
    PassWord:string
    SecPassWord:string
    Token:string
    constructor(
      private userservice:UserService,
        private router:Router,
        private message: ElMessageService,
        ) {}
    ngOnInit() {
      this.UserName=''
      this.NickName=''
      this.PassWord=''
      this.SecPassWord=''
    }
    Register(){
        this.NewUser={username:this.UserName,nickname:this.NickName,password:this.PassWord}
        console.log(this.NewUser)
        if(this.PassWord != this.SecPassWord) {
          this.message['error']('两次密码输入不一致，请检查')
          return
        }
        if(this.UserName.length<4||this.UserName.length>10) {
          this.message['error']('用户长度不合理，请检查')
          return
        }
        if(this.NickName.length<1||this.NickName.length>15) {
          this.message['error']('昵称长度不合理，请检查')
          return
        }
        if(this.PassWord.length<4||this.PassWord.length>10) {
          this.message['error']('密码长度不合理，请检查')
          return
        }
        this.userservice.Register(this.NewUser).subscribe(
          fb=>{
            console.log(fb)
            //this.Token = fb['Token']
            if (fb['code'] == 200) {
              this.router.navigate([ROUTES.login.route], {queryParams:{'username':this.UserName,'password':this.PassWord}})
              this.message['success']('注册成功')
            } else if (fb['code'] == 300) {
              this.message['error']('注册失败，账户已存在')
            } else {
              this.message['error']('注册失败，服务错误')
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
              this.message['error']('注册失败')
            //this.toastrservice.error('登陆失败')
          }
        )
      }
      ToLogin() {
        this.router.navigate([ROUTES.login.route])
      }
}
