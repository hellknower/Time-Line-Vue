let express = require('express');
let bodyParser = require('body-parser')

const Connection = require('./Connect');

let app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Connection.then(()=>{
    console.log('数据库连接成功');
    app.post('/user/login',(req,res)=>{
        const { username,password } = req.body;
        console.log(username,password);
        
        res.json({
            success:true,
        });
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