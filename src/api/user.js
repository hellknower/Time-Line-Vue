import request from './request';

//用户 --- 登录
export function login(data){
    return request({
        url:'/user/login',
        method:'post',
        data
    });
}

//用户 --- 注册
export function register(data){
    return request({
        url:'/user/register',
        method:'post',
        data
    });
}

//用户 --- 忘记密码
export function forgotten(data){
    return request({
        url:'/user/forget',
        method:'post',
        data
    });
}

//用户 --- 用户主页获取用户拥有的文章信息
export function personMain(data){
    return request({
        url:'/personMain',
        method:'post',
        data
    });
}
