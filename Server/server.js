let express = require('express');
let bodyParser = require('body-parser')

let app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.post('/user/login',(req,res)=>{
    const { username,password } = req.body;
    console.log(username,password);
    
    res.json({
        success:true,
    });
});

app.listen(8088,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('http://localhost:8088'+'success')
    }
})