import request from './request';

//文章 --- 发布
export function addArticle(data){
    return request({
        url:'/article/addArticle',
        method:'post',
        data
    });
}
