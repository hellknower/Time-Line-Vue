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

module.exports = router;