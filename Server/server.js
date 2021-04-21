let express = require('express');
let bodyParser = require('body-parser');
let sha1 = require('sha1');

let userModel = require('./Model/userLoginModel');
let articleModel = require('./Model/articleModel');
let userOwnArticleModel = require('./Model/userOwnArticleModel');

const Connection = require('./Connect');

let app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Connection.then(()=>{
    console.log('数据库连接成功');
    //用户路由 --- 注册
    app.post('/user/register',async(req,res)=>{
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
    app.post('/user/login',async(req,res)=>{
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
    app.post('/user/forget',async(req,res)=>{
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

    //文章 --- 添加文章
    app.post('/article/addArticle',async(req,res)=>{
        const { userId,articleTitle,articleContent,articleType,articleCreateDate } = req.body;

        let articleId = userId + articleCreateDate;//用户ID+时间戳
        
        try{
            await articleModel.create({userId,articleId,articleTitle,articleContent,articleType});

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
        }
        
    });
}).catch(err=>{
    console.log('数据库连接失败',err);
});


app.listen(8088,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('http://localhost:8088')
    }
})