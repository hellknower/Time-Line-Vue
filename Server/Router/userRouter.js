const { Router } = require('express');
let sha1 = require('sha1');

let userModel = require('../Model/userLoginModel');
let articleModel = require('../Model/articleModel');
let userOwnArticleModel = require('../Model/userOwnArticleModel');

let router = new Router();

//用户路由 --- 注册
router.post('/user/register',async(req,res)=>{
    const { username,password } = req.body;
    const userDate = Date.now();
    const userId = sha1(+username + userDate);

    try{
        let isExist = await userModel.findOne({userName:username});

        if(!isExist){
            await userModel.create({userId,userName:username,userPassword:password,userCreateDate:userDate});

            res.json({
                success:true,
                message:'用户创建成功'
            });
        }else{
            res.json({
                success:false,
                message:'用户名已存在，请重新输入'
            });
        }
    }catch(err){   
        console.log(err);
        res.json({
            success:false,
            message:'网络异常，请稍后。。。'
        });
    }
});

//用户路由 --- 登录
router.post('/user/login',async(req,res)=>{
    const { username,password } = req.body;
    
    try{
        let isUserExist = await userModel.findOne({userName:username});
        let isPasswordExist = await userModel.findOne({userName:username,userPassword:password});
        if(isUserExist){
            if(isPasswordExist){
                let {userId} = isUserExist;
                
                res.json({
                    success:true,
                    message:'登陆成功',
                    userId:userId
                });
            }else{
                res.json({
                    success:false,
                    message:'密码错误，请重新输入'
                });
            }
            
        }else{
            res.json({
                success:false,
                message:'用户不存在，请注册账号'
            });
        }
    }catch(err){   
        console.log(err);
        res.json({
            success:false,
            message:'网络异常，请稍后。。。'
        });
    }
});

//登录 --- 忘记密码
router.post('/user/forget',async(req,res)=>{
    const {username,oldPassword,password} = req.body;

    try{
        let isUserExist = await userModel.findOne({userName:username,userPassword:oldPassword});

        
        if(isUserExist){
            await userModel.updateOne({userPassword:oldPassword},{userPassword:password});
            res.json({
                success:true,
                message:'密码更换成功'
            });
            
        }else{
            res.json({
                success:false,
                message:'密码错误，请重新输入'
            });
        }


    }catch(err){
        console.log(err);
        res.json({
            success:false,
            message:'网络异常，请稍后。。。'
        });
    }

});

//用户 --- 用户主页获取用户拥有的文章信息
router.post('/personMain',async(req,res)=>{
    const {userId} = req.body;
    try{
        let userOwnArticleId = (await userOwnArticleModel.findOne({userId})).userArticles;
        let userOwnArticle = [];

        for(item of userOwnArticleId){
            let articleMessage = await articleModel.findOne({articleId:item});
            userOwnArticle.push(articleMessage);
        }

        res.json({
            success:true,
            message:'获取成功',
            userOwnArticle
        });
    }catch(err){
        res.json({
            success:false,
            message:`获取失败，错误为${err}`
        });
    }        
});

//用户 --- 根据用户名查找用户ID
router.post('/findUserIdWithUserName',async(req,res)=>{
    const {userName} = req.body;

    try{
        let a = await userModel.findOne({userName});
        let userId = (await userModel.findOne({userName})).userId;

        res.json({
            success:true,
            message:'查找成功',
            userId
        });
    }catch(err){
        res.json({
            success:false,
            message:`查找失败，错误为${err}`
        });
    }     
});

module.exports = router;