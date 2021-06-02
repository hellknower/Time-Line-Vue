import request from './request';

//文章 --- 发布
export function addArticle(data){
    return request({
        url:'/article/addArticle',
        method:'post',
        data
    });
}

//文章 --- 根据文章类型查找文章
export function findArticleWithType(data){
    return request({
        url:'/article/findArticleWithType',
        method:'post',
        data
    });
}

//文章 --- 根据文章类型查找文章
export function findArticleWithId(data){
    return request({
        url:'/article/findArticleWithID',
        method:'post',
        data
    });
}

