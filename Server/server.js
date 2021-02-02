let express = require('express');

let app = express()

app.get('/',(req,res)=>{
    res.set('Access-Control-Allow-Origin','http://localhost:8080');
    res.json({
        id:'1',
        forumTitle:'aaaaaa',
        forumContent:'ccccccccc',
    })
})

app.listen(8088,(err)=>{
    if(err){
        console.log(err)
    }else{
        
    }console.log('http://localhost:8088   '+'success')
})