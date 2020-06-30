import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRouteModule } from './app-routing.module'

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';

import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { TalkRoomComponent } from './talkroom/talkroom.component'
import { UserComponent } from './user/user.component'
import { UpdateUserComponent } from './updateuser/updateuser.component'
import { UpdatePwdComponent } from './updatepwd/updatepwd.component'
import { CreateRoomComponent } from './createroom/createroom.component'
import { FriendComponent } from './friend/friend.component'
import { FindFriendComponent } from './findfriend/findfriend.component'
import { PassFriendComponent } from './passfriend/passfriend.component'
import { UserRoleComponent } from './admin/userrole/userrole.component'
import { UserBanComponent } from './admin/userban/userban.component'
import { RoomBanComponent } from './admin/roomban/roomban.component'

import { UserService } from './service/user.service'
import { RoomService } from './service/room.service'
import { FriendService } from './service/friend.service'
import { CommentService } from './service/comment.service'
import { HistoryService } from './service/history.service'

// import module
import { ElModule } from 'element-angular'
import { CustomFormsModule } from 'ng2-validation';
// if you use webpack, import style
import 'element-angular/theme/index.css'



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TalkRoomComponent,
    RegisterComponent,
    UserComponent,
    UpdateUserComponent,
    UserRoleComponent,
    UserBanComponent,
    RoomBanComponent,
    CreateRoomComponent,
    FriendComponent,
    FindFriendComponent,
    PassFriendComponent,
    UpdatePwdComponent,
  ],
  imports: [
    CustomFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule,//要补上不然报没有注入错误
    HttpClientModule,
    BrowserAnimationsModule,
    AppRouteModule,
    ElModule.forRoot(),
    
    // NgZorroAntdModule
  ],
  providers: [
    UserService,
    RoomService,
    FriendService,
    CommentService,
    HistoryService,
    // BsModalRef,
    // BsModalService,
],
exports:[
  ],
  entryComponents: [
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
