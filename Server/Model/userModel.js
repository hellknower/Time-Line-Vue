const mongoose = require("mongoose");

let Schema = mongoose.Schema;   //创建约束

let userSchema = new Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    userPassword:{
        type:String,
        required:true
    },
    UserCreateDate:{
        type:Date,
        required:true
    }
    });

    let userModel = mongoose.model('User',userSchema);//创建模型对象

    module.exports = userModel;