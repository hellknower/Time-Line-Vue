const mongoose = require("mongoose");

let Schema = mongoose.Schema;   //创建约束

let articleSchema = new Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    articleContent:{
        type:String,
        required:true,
    }
});

let articleModel = mongoose.model('article',articleSchema);//创建模型对象

module.exports = articleModel;