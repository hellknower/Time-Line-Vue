let express = require('express');
let bodyParser = require('body-parser');

//引入路由
let userRouter = require('./Router/userRouter.js');
let articleRouter = require('./Router/articleRouter.js');

const Connection = require('./Connect');

let app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Connection.then(()=>{
    console.log('数据库连接成功');

    //使用用户路由器
    app.use(userRouter);
    app.use(articleRouter);

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