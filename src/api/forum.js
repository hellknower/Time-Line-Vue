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

//文章 --- 根据文章ID查找文章
export function findArticleWithId(data){
    return request({
        url:'/article/findArticleWithID',
        method:'post',
        data
    });
}

//文章 --- 发送评论
export function sendComment(data){
    return request({
        url:'/article/sendComment',
        method:'post',
        data
    });
}

//文章 --- 编辑文章
export function editArticle(data){
    return request({
        url:'/article/editArticle',
        method:'post',
        data
    });
}

//文章 --- 删除文章
export function deleteArticle(data){
    return request({
        url:'/article/deleteArticle',
        method:'post',
        data
    });
}

//文章 --- 删除评论
export function deleteComment(data){
    return request({
        url:'/article/deleteComment',
        method:'post',
        data
    });
}

//文章 --- 点赞
export function likeArticle(data){
    return request({
        url:'/article/likeArticle',
        method:'post',
        data
    });
}

// 文章 --- 取消点赞
export function dislikeArticle(data){
    return request({
        url:'/article/dislikeArticle',
        method:'post',
        data
    });
}

//文章 --- 收藏
export function collectArticle(data){
    return request({
        url:'/article/collectArticle',
        method:'post',
        data
    });
}

// 文章 --- 取消收藏
export function discollectArticle(data){
    return request({
        url:'/article/discollectArticle',
        method:'post',
        data
    });
}

// 文章 --- 审核通过
export function reExamined(data){
    return request({
        url:'/article/reExamined',
        method:'post',
        data
    });
}

// 文章 --- 审核未通过
export function backToUser(data){
    return request({
        url:'/article/backToUser',
        method:'post',
        data
    });
}

