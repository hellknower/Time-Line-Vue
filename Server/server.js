let express = require('express');
let bodyParser = require('body-parser');
let sha1 = require('sha1');

let userModel = require('./Model/userModel');

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
                await userModel.create({userId,userName:username,userPassword:password,UserCreateDate:userDate});
                
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
            let isExist = await userModel.findOne({userName:username,userPassword:password});

            if(!isExist){
                
                res.json({
                    success:false,
                    message:'用户不存在，请注册账号'
                });
            }else{
                res.json({
                    success:true,
                    message:'登陆成功'
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
}).catch(err=>{
    console.log('数据库连接失败',err);
});


app.listen(8088,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('http://localhost:8088'+'success')
    }
})