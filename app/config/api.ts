// export var BUILD_TYPE = 'LOCAL';  
// export var BUILD_TYPE = 'DEV';  
export var BUILD_TYPE = 'DEV';  //部署模式

export var SITE_HOST_URL;
export var WS_HOST_URL;
if (BUILD_TYPE == 'LOCAL'){
    SITE_HOST_URL = 'http://localhost:9000';
    WS_HOST_URL = 'ws://127.0.0.1:9000';
}
if (BUILD_TYPE == 'DEV'){
    SITE_HOST_URL = 'http://47.96.233.119:9000';
    WS_HOST_URL = 'ws://47.96.233.119:9000';
}

export const WS_CHAT="/ws/chat"

export const REGISTER="/api/register"
export const LOGIN="/api/login"
export const LOGOUT="/api/logout"
export const UPLOAD_IMAGE="/api/uploadimage"

export const GET_ONE_USER="/api/getoneuser"
export const GET_USER_LIST="/api/getuserlist"
export const UPDATE_USER="/api/updateuser"
export const UPDATE_PWD="/api/updatepassword"
export const BAN_USER="/api/banuser"
export const CANCEL_BAN_USER="/api/cancelbanuser"
export const UP_USER_ROLE="/api/upuserrole"
export const DOWN_USER_ROLE="/api/downuserrole"
export const FIND_USER="/api/finduser"
export const GET_ONLINE="/api/getonline"

export const GET_USE_ROOM_LIST="/api/getuseroomlist"
export const GET_ROOM_LIST="/api/getroomlist"
export const BAN_ROOM="/api/banroom"
export const CANCEL_BAN_ROOM="/api/cancelbanroom"
export const CREATE_ROOM="/api/createroom"

export const GET_FRIEND_LIST="/api/getfriendlist"
export const NEW_FRIEND="/api/newfriend"
export const PASS_FRIEND="/api/passfriend"
export const UNPASS_FRIEND="/api/unpassfriend"
export const GET_CHECK_FRIEND="/api/getcheckfriend"

export const GET_COMMENT_LIST="/api/getcommentlist"
export const NEW_COMMENT="/api/newcomment"

export const GET_HISTORY_LIST="/api/gethistorylist"