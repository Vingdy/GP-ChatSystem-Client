import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TalkRoomComponent } from './talkroom/talkroom.component'
import { RegisterComponent } from './register/register.component'
import { UserComponent } from './user/user.component'
import { UpdateUserComponent } from './updateuser/updateuser.component'
import { CreateRoomComponent } from './createroom/createroom.component'
import { UpdatePwdComponent } from './updatepwd/updatepwd.component'

import { FriendComponent } from './friend/friend.component'
import { FindFriendComponent } from './findfriend/findfriend.component'
import { PassFriendComponent } from './passfriend/passfriend.component'

import { UserRoleComponent } from './admin/userrole/userrole.component'
import { UserBanComponent } from './admin/userban/userban.component'
import { RoomBanComponent } from './admin/roomban/roomban.component'
// import { UpdateBlogEssayComponent } from './blogessay/updateblogessay/updateblogessay.component'

//import { RouteguardService } from './service/routeguard.service' 

export const AppRoute: Routes = [

    {
        path: '',  // 初始路由重定向[写在第一个]
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'talkroom',
        component: TalkRoomComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'user',
        component: UserComponent,
    },
    {
        path: 'updateuser',
        component: UpdateUserComponent,
    },
    {
        path: 'userrole',
        component: UserRoleComponent,
    },
    {
        path: 'userban',
        component: UserBanComponent,
    },
    {
        path: 'roomban',
        component: RoomBanComponent,
    },
    {
        path: 'createroom',
        component: CreateRoomComponent,
    },
    {
        path: 'friend',
        component: FriendComponent,
    },
    {
        path: 'findfriend',
        component: FindFriendComponent,
    },
    {
        path: 'passfriend',
        component: PassFriendComponent,
    },
    {
        path: 'updatepwd',
        component: UpdatePwdComponent,
    },
    {
        path: '**',// 错误路由重定向[写在最后一个]
        redirectTo: 'blogessay',
        pathMatch: 'full',
    },
];
@NgModule({
    imports: [
        RouterModule.forRoot(AppRoute),
    ],
    exports: [
        RouterModule
    ],
})
export class AppRouteModule { }
