let express = require('express');
let bodyParser = require('body-parser');
let sha1 = require('sha1');

let userModel = require('./Model/userLoginModel');
let articleModel = require('./Model/articleModel');
let userOwnArticleModel = require('./Model/userOwnArticleModel');

let articleType = require('./Model/articleTypeModel');

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

    //文章 --- 根据文章类型查找文章
    app.post('/article/findArticleWithType',async(req,res)=>{
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
    app.post('/article/findArticleWithID',async(req,res)=>{
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
    app.post('/article/addArticle',async(req,res)=>{
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
    app.get('/findArticleType',async(req,res)=>{
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
    app.post('/article/sendComment',async(req,res)=>{
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

    //用户 --- 用户主页获取用户拥有的文章信息
    app.post('/personMain',async(req,res)=>{
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
    app.post('/findUserIdWithUserName',async(req,res)=>{
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
}).catch(err=>{
    console.log('数据库连接失败',err);
});


app.listen(8088,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('http://localhost:8088');
    }
})