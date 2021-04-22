import request from './request';

//文章 --- 获取文章类型
export function findArticleType(){
    return request({
        url:'/findArticleType',
        method:'get'
    });
}