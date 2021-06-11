const { Router } = require('express');

let router = new Router();

let userModel = require('../Model/userLoginModel');
let articleModel = require('../Model/articleModel');
let userOwnArticleModel = require('../Model/userOwnArticleModel');
let articleType = require('../Model/articleTypeModel');


//文章 --- 根据文章类型查找文章
router.post('/article/findArticleWithType',async(req,res)=>{
    const { typeValue } = req.body;

    try{
        let articles = await articleModel.find({articleType:typeValue});

        // //根据获取到的文章ID，类型查找对应的用户名以及类型名，并返回给前端
        for(item of articles){                
            const type = (await articleType.find({typeValue:item.articleType}))[0];
            item.articleType = type.typeName;                
        }
        
        res.send({
            success:true,
            message:'文章查找成功',
            articles
        })        
    }catch(err){
        console.log('错误为',err);
        res.json({
            success:false,
            message:'文章查找失败'
        })
    }
    
});

//文章 --- 根据文章ID查找文章
router.post('/article/findArticleWithID',async(req,res)=>{
    const { articleId } = req.body;

    try{
        let articles = await articleModel.find({articleId});

        // //根据获取到的文章ID，类型查找对应的用户名以及类型名，并返回给前端
        for(item of articles){                
            const type = (await articleType.find({typeValue:item.articleType}))[0];
            item.articleType = type.typeName;                
        }
        
        res.send({
            success:true,
            message:'文章查找成功',
            articles
        })        
    }catch(err){
        console.log('错误为',err);
        res.json({
            success:false,
            message:'文章查找失败'
        })
    }
    
});

//文章 --- 添加文章
router.post('/article/addArticle',async(req,res)=>{
    const { userId,articleTitle,articleContent,articleType,articleCreateDate } = req.body;

    let articleId = userId + articleCreateDate;//用户ID+时间戳
    
    try{
        const user = await userModel.findOne({userId});
        await articleModel.create({userId,articleId,articleTitle,articleContent,articleType,ownUserName:user.userName});

        let userOwnArticles = await userOwnArticleModel.findOne({userId});//用户拥有的文章id值

        if(userOwnArticles){            //发布过文章
            let userArticles = userOwnArticles.userArticles;

            userArticles.push(articleId);
            await userOwnArticleModel.updateOne({userId},{userArticles});
        }else{                          //没有发布过文章
            let userArticles = [];

            userArticles.push(articleId);
            await userOwnArticleModel.create({userId,userArticles});
        }
        res.json({
            success:true,
            message:'文章发布成功'
        })

        
    }catch(err){
        console.log('错误为',err);
        res.json({
            success:false,
            message:'文章发布失败'
        })
    }
    
});

//文章 --- 获取文章类型
router.get('/findArticleType',async(req,res)=>{
    let returnType = [];
    let articleTypes = await articleType.find();
    
    if(articleTypes){
        articleTypes.forEach((val)=>{
            let {typeName,typeValue} = val;
            returnType.push({typeName,typeValue});
        });        
        res.json({
            success:true,
            message:'文章类型寻找成功',
            returnType
        });
    }else{     
        res.json({
            success:false,
            message:'没有找到文章类型'
        });
    }

});

//文章 --- 发送评论
router.post('/article/sendComment',async(req,res)=>{
    const { articleId,userId,userName,articleCommentContent } = req.body;

    try{
        let commentPerson = (await articleModel.findOne({articleId})).articleCommentPerson;
        
        commentPerson.push({userId,userName,articleCommentContent,articleCommentDate:Date.now()});

        
        await articleModel.updateOne({articleId},{articleCommentPerson:commentPerson},async(err,doc)=>{
            if(err){
                console.log(`评论失败，错误为${err}`);
            }else{
                await articleModel.updateOne({articleId},{articleCommentCount:commentPerson.length});
            }
        });

        const articles = await articleModel.findOne({articleId});

        res.json({
            message:'评论成功',
            success:true,
            articles
        });
    }catch(err){
        console.log('错误为',err);
        res.json({
            success:false,
            message:'文章发布失败'
        })

    }
});

//文章 --- 编辑文章
router.post('/article/editArticle',async(req,res)=>{
    const { articleId,articleTitle,articleContent,articleType } = req.body;

    try{        
        await articleModel.updateOne({articleId},{articleTitle,articleContent,articleType},(err)=>{
            if(!err){
                res.json({
                    message:'修改成功',
                    success:true
                });
            }else{
                console.log('错误为',err);
                res.json({
                    success:false,
                    message:'修改失败'
                })
            }
        });

    }catch(err){
        console.log('错误为',err);
        res.json({
            success:false,
            message:'修改失败'
        })
    }
});

//文章 --- 删除文章
router.post('/article/deleteArticle',async(req,res)=>{
    const { userId,articleId } = req.body;

    try{        
       
        await articleModel.deleteOne({articleId},async(err)=>{
            if(!err){
                let userArticles = (await userOwnArticleModel.findOne({userId})).userArticles;
                userArticles.remove(articleId);
                await userOwnArticleModel.updateOne({userId},{userArticles},async(err)=>{
                    if(!err){
                        res.json({
                            message:'删除成功',
                            success:true,
                            userArticles
                        });
                    }else{
                        console.log('错误为',err);
                        res.json({
                            success:false,
                            message:'删除失败'
                        })
                    }
    
                });
            }else{
                console.log('错误为',err);
                res.json({
                    success:false,
                    message:'删除失败'
                })
            }
        });

    }catch(err){
        console.log('错误为',err);
        res.json({
            success:false,
            message:'删除失败'
        })
    }
});
//文章 --- 删除评论
router.post('/article/deleteComment',async(req,res)=>{
    const { commentId,articleId } = req.body;

    try{
        let article = await articleModel.findOne({articleId});
        let comment = article.articleCommentPerson;
        let commentCount = article.articleCommentCount;
        for(item of comment){
            if(commentId == item._id){
                let index = comment.indexOf(item);
                comment.splice(index,1);
                commentCount-=1;
            }
        }
        await articleModel.updateOne({articleId},{articleCommentPerson:comment,articleCommentCount:commentCount},(err)=>{
            if(!err){
                res.json({
                    message:'删除成功',
                    success:true
                });
            }else{
                console.log('错误为',err);
                res.json({
                    success:false,
                    message:'删除失败'
                })
            }
        });
    }catch(err){
        console.log('错误为',err);
        res.json({
            success:false,
            message:'删除失败'
        })
    }
});

//文章 --- 点赞
router.post('/article/likeArticle',async(req,res)=>{
    const {articleId,userId} = req.body;

    try{
        let userLikes = (await userModel.findOne({userId})).userLikes;
        let articleLike = await articleModel.findOne({articleId});
        let articleLikeCount = articleLike.articleLikeCount;
        let articleLikePerson = articleLike.articleLikePerson;

        articleLikePerson.push(userId);
        userLikes.push(articleId);

        await userModel.updateOne({userId},{userLikes});
        await articleModel.updateOne({articleId},{articleLikePerson},async(err)=>{
            if(!err){
                articleLikeCount +=1;
                await articleModel.updateOne({articleId},{articleLikeCount},(err)=>{
                    if(!err){
                        res.json({
                            success:true,
                            message:'点赞成功'
                        })
                    }else{                        
                        res.json({
                            success:false,
                            message:'点赞失败'
                        })
                    }
                });
            }else{
                res.json({
                    success:false,
                    message:'点赞失败'
                })
            }
        });
    }catch(err){
        console.log('错误为',err);
        res.json({
            success:false,
            message:'点赞失败'
        })
    }
});

//文章 --- 取消点赞
router.post('/article/dislikeArticle',async(req,res)=>{
    const {articleId,userId} = req.body;

    try{
        let userLikes = (await userModel.findOne({userId})).userLikes;
        let articleLike = await articleModel.findOne({articleId});
        let articleLikeCount = articleLike.articleLikeCount;
        let articleLikePerson = articleLike.articleLikePerson;

        for(let item of articleLikePerson){
            if(item === userId){
                let index = articleLikePerson.indexOf(userId);
                articleLikePerson.splice(index,1);
            }
        }
        for(let item of userLikes){
            if(item === articleId){
                let index = articleLikePerson.indexOf(articleId);
                userLikes.splice(index,1);
            }
        }

        await userModel.updateOne({userId},{userLikes});
        await articleModel.updateOne({articleId},{articleLikePerson},async(err)=>{
            if(!err){
                articleLikeCount -=1;
                await articleModel.updateOne({articleId},{articleLikeCount},(err)=>{
                    if(!err){
                        res.json({
                            success:true,
                            message:'点赞成功'
                        })
                    }else{                        
                        res.json({
                            success:false,
                            message:'点赞失败'
                        })
                    }
                });
            }else{
                res.json({
                    success:false,
                    message:'点赞失败'
                })
            }
        });
    }catch(err){
        console.log('错误为',err);
        res.json({
            success:false,
            message:'点赞失败'
        })
    }
});

module.exports = router;