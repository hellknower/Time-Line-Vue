const mongoose = require("mongoose");

let Schema = mongoose.Schema;   //创建约束

let userOwnArticleSchema = new Schema({
    userId:{            //用户id
        type:String,
        required:true,
        unique:true
    },
    userArticles:{//用户拥有的文章
        type:Array,
    }
});

let userModel = mongoose.model('UserOwnArticle',userOwnArticleSchema);//创建模型对象

module.exports = userModel;