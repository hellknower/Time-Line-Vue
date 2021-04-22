const mongoose = require("mongoose");

let Schema = mongoose.Schema;   //创建约束

let articleTypeSchema = new Schema({
    typeValue:{
        type:String,
        required:true,
        unique:true
    },
    typeName:{
        type:String,
        required:true,
        unique:true
    }
});

let articleTypeModel = mongoose.model('ArticleType',articleTypeSchema);//创建模型对象

module.exports = articleTypeModel;