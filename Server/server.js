let express = require('express');
let bodyParser = require('body-parser')

let app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.post('/user/login',(req,res)=>{
    console.log(req.body);
    
    res.json({a:10});
});

app.listen(8088,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('http://localhost:8088'+'success')
    }
})